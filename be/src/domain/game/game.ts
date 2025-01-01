import { Room } from "../room";
import { pick, shuffle } from "../../../../common/utils/array";
import { Player } from "../player";
import {
  getCategoriesPool,
  getQuestionsPool,
  QuestionDto,
} from "../../api/categories";
import { Vote, Votes } from "./vote";
import { AnswerDto } from "../../../../common/dto";
import { config } from "../../config";

const categoriesPool = (await getCategoriesPool()).trivia_categories;

const amountOfQuestionsInCategory = 5;
const categoryVoteTime = config.mockQuestions ? 3 : 10;
const showCategoryWinnerTime = config.mockQuestions ? 1 : 3;

const questionVoteTime = config.mockQuestions ? 3 : 20;
const showCorrectAnswerTime = config.mockQuestions ? 1 : 5;

export class Game {
  room: Room;

  currentCategory: number | null;
  questions: QuestionDto[] | null;
  currentVote: Vote;
  finished: boolean;

  constructor(room: Room) {
    console.log(
      `Game for room ${room.id} created. ${room.players.length} players in the room.`
    );

    this.room = room;

    this.finished = false;
    this.currentCategory = null;
    this.questions = null;
    this.currentVote = new Vote({
      room: this.room,
      type: "category",
      question: "Vote for category!",
      options: this.getCategoryOptions(),
      voteTime: categoryVoteTime,
      category: null,
      index: 1,
      total: 1,
      onFinish: (votes) => this.handleCategoryVoteFinish(votes),
    });

    this.room.socket.emit("game-started");
  }

  terminate() {
    // TODO kill everything
  }

  getCategoryOptions() {
    this.room.socket.emit("loading-categories");
    return pick(categoriesPool, 4);
  }

  handleCategoryVoteFinish(votes: Votes) {
    this.currentCategory = votes.getMostVoted();
    this.room.socket.emit("vote-finished", votes.toDto(), this.currentCategory);

    setTimeout(async () => {
      if (this.room.players.length === 0) return;

      await this.fetchQuestions();
      this.nextQuestion();
    }, showCategoryWinnerTime * 1000);
  }

  voteForCategory(player: Player, categoryId: number) {
    this.currentVote.vote(player, categoryId);
  }

  async fetchQuestions() {
    if (!this.currentCategory) return;
    this.room.socket.emit("loading-questions");
    const response = await getQuestionsPool(
      this.currentCategory,
      amountOfQuestionsInCategory
    );
    if (response.response_code !== 0) {
      console.log(
        `Couldn't get questions - response code ${response.response_code}`
      );
      return;
    }
    this.questions = response.results;
  }

  nextQuestion(index = 1) {
    if (!this.questions || this.room.players.length === 0) return;
    const questionEntry = this.questions.pop();
    if (!questionEntry) {
      this.finishGame();
      return;
    }

    const { question, incorrect_answers, correct_answer, category } =
      questionEntry;

    const options = shuffle([correct_answer, ...incorrect_answers]).map(
      (name, i) => ({ id: i, name })
    );
    const correctOption = options.find(
      (option) => option.name === correct_answer
    )!;

    this.currentVote = new Vote({
      room: this.room,
      type: "question",
      question,
      options,
      voteTime: questionVoteTime,
      category,
      index,
      total: amountOfQuestionsInCategory,
      onFinish: (votes) => {
        this.handleQuestionVoteFinish(votes, correctOption, index + 1);
      },
    });
  }

  voteForAnswer(player: Player, answerId: number) {
    this.currentVote.vote(player, answerId);
  }

  handleQuestionVoteFinish(
    votes: Votes,
    correctOption: AnswerDto,
    nextIndex: number
  ) {
    const maxPoints = this.room.players.length * 100;

    votes
      .getVotesForId(correctOption.id)
      .sort(({ time: timeA }, { time: timeB }) => timeA - timeB)
      .forEach(({ playerId }, i) => {
        const player = this.room.players.find((p) => p.id === playerId);
        if (!player) return;
        player.currentPoints += maxPoints - i * 100;
      });

    this.room.socket.emit("vote-finished", votes.toDto(), correctOption.id);

    setTimeout(
      () => this.nextQuestion(nextIndex),
      showCorrectAnswerTime * 1000
    );
  }

  finishGame() {
    console.log(`Game finished room ${this.room.id}`);
    this.finished = true;
    this.room.socket.emit(
      "game-finished",
      this.room.players.map((p) => p.toDto())
    );
  }
}
