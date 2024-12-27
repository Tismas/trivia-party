import { addSeconds, differenceInMilliseconds, subSeconds } from "date-fns";

// import { getCategoriesPool } from "../api/categories";
import type { TypedRoomSocket } from "../events/socket";
import { findRoom, Room } from "./room";
import { pick, shuffle } from "../../../common/utils/array";
import { Player } from "./player";
import { AnswerDto, Votes } from "../../../common/dto";
import { getCategoriesPool, getQuestionsPool } from "../api/categories";

const categoriesPool = (await getCategoriesPool()).trivia_categories;

interface CurrentQuestion {
  question: string;
  answers: AnswerDto[];
}

const categoryVoteTime = 15;
const showCategoryWinnerTime = 5;

const answerVoteTime = 30;
const showCorrectAnswerTime = 10;

class Game {
  room: Room;
  socket: TypedRoomSocket;

  categoriesVoteEnd: Date | null;
  categoryVotes: Votes | null;
  currentCategory: number | null;

  questionVoteEnd: Date | null;
  questionVotes: Votes | null;
  currentQuestion: CurrentQuestion | null;

  constructor(room: Room, socket: TypedRoomSocket) {
    this.room = room;
    this.socket = socket;

    this.categoriesVoteEnd = null;
    this.categoryVotes = null;
    this.currentCategory = null;

    this.questionVoteEnd = null;
    this.questionVotes = null;
    this.currentQuestion = null;
  }

  startCategoryVote() {
    this.socket.emit("loading-categories");

    const categories = pick(categoriesPool, 4);
    this.categoriesVoteEnd = addSeconds(new Date(), categoryVoteTime);
    this.categoryVotes = {};

    this.socket.emit(
      "category-vote-started",
      this.categoriesVoteEnd.toISOString(),
      categories
    );

    setTimeout(() => this.handleCategoryVoteFinish(), categoryVoteTime * 1000);
  }

  voteForCategory(player: Player, categoryId: number) {
    if (!this.categoryVotes || !this.categoriesVoteEnd) return;
    const time = differenceInMilliseconds(
      new Date(),
      subSeconds(this.categoriesVoteEnd, categoryVoteTime)
    );
    this.categoryVotes[categoryId] ||= {};
    this.categoryVotes[categoryId][player.id] = time / 1000;
  }

  handleCategoryVoteFinish() {
    this.categoriesVoteEnd = null;

    if (this.categoryVotes) {
      const winner = getWinner(this.categoryVotes);
      this.socket.emit("category-vote-finished", this.categoryVotes, winner);
      this.currentCategory = winner;
    }

    this.categoryVotes = null;

    setTimeout(() => this.startQuestionVote(), showCategoryWinnerTime * 1000);
  }

  async startQuestionVote() {
    if (!this.currentCategory) return;

    this.socket.emit("loading-questions");
    const questionEntries = (await getQuestionsPool(this.currentCategory))
      .results;

    for (const {
      question,
      incorrect_answers,
      correct_answer,
    } of questionEntries) {
      this.questionVoteEnd = addSeconds(new Date(), answerVoteTime);
      this.questionVotes = {};
      const answers = shuffle([correct_answer, ...incorrect_answers]).map(
        (answer, i) => ({ id: i, name: answer })
      );
      const correctAnswerId = answers.find(
        (a) => a.name === correct_answer
      )!.id;
      this.currentQuestion = { question, answers };

      this.socket.emit(
        "question-vote-started",
        this.questionVoteEnd.toISOString(),
        question,
        answers
      );

      await new Promise((resolve) =>
        setTimeout(resolve, answerVoteTime * 1000)
      );

      this.socket.emit(
        "question-vote-finished",
        this.questionVotes,
        correctAnswerId
      );
      this.questionVotes = null;
      this.questionVoteEnd = null;
      this.currentQuestion = null;

      await new Promise((resolve) =>
        setTimeout(resolve, showCorrectAnswerTime * 1000)
      );
    }
  }

  voteForAnswer(player: Player, answerId: number) {
    if (
      !this.questionVotes ||
      !this.questionVoteEnd ||
      !this.currentQuestion?.answers.map((a) => a.id).includes(answerId)
    ) {
      return;
    }
    const time = differenceInMilliseconds(
      new Date(),
      subSeconds(this.questionVoteEnd, answerVoteTime)
    );
    this.questionVotes[answerId] ||= {};
    this.questionVotes[answerId][player.id] = time / 1000;
  }
}

const games: Game[] = [];

export const startGame = (roomId: string, roomSocket: TypedRoomSocket) => {
  const room = findRoom(roomId);
  if (!room) return;

  const game = new Game(room, roomSocket);
  games.push(game);
  return game;
};

export const findGame = (player: Player) => {
  return games.find((game) => game.room.id === player.currentRoom);
};

const getWinner = (votes: Votes): number => {
  const groupedByVotes = Object.groupBy(Object.entries(votes), ([_, players]) =>
    Object.values(players).length.toString()
  );
  const mostVotes = Math.max(...Object.keys(groupedByVotes).map(Number));
  const withMostVotes = groupedByVotes[mostVotes.toString()];
  if (!withMostVotes)
    throw new Error("Something went wrong when choosing vote winner");
  const winner = pick(withMostVotes, 1)[0];

  return Number(winner[0]);
};
