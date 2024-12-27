import { addSeconds, differenceInMilliseconds, subSeconds } from "date-fns";

// import { getCategoriesPool } from "../api/categories";
import type { TypedRoomSocket } from "../events/socket";
import { findRoom, Room } from "./room";
import { pick } from "../../../common/utils/array";
import { Player } from "./player";
import { Votes } from "../../../common/dto";

// const categoriesPool = (await getCategoriesPool()).trivia_categories;
const categoriesPool: CategoryDto[] = [
  { id: 1, name: "test" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
  { id: 4, name: "test4" },
  { id: 5, name: "test5" },
];

const categoryVoteTime = 15;

export interface CategoryDto {
  id: number;
  name: string;
}

class Game {
  room: Room;
  categoriesVoteEnd: Date | null;
  categoryVotes: Votes | null;

  questionVoteEnd: Date | null;
  questionVotes: Votes | null;

  constructor(room: Room) {
    this.room = room;
    this.categoriesVoteEnd = null;
    this.questionVoteEnd = null;
    this.categoryVotes = null;
    this.questionVotes = null;
  }

  startCategoryVote(roomSocket: TypedRoomSocket) {
    roomSocket.emit("loading-categories");

    const categories = pick(categoriesPool, 4);
    this.categoriesVoteEnd = addSeconds(new Date(), categoryVoteTime);
    this.categoryVotes = {};

    roomSocket.emit(
      "category-vote-started",
      this.categoriesVoteEnd.toISOString(),
      categories
    );

    setTimeout(() => {
      this.categoriesVoteEnd = null;

      if (this.categoryVotes) {
        const winner = getWinner(this.categoryVotes);
        roomSocket.emit("category-vote-finished", this.categoryVotes, winner);
      }

      this.categoryVotes = null;
    }, categoryVoteTime * 1000);
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

  startQuestionVote(roomSocket: TypedRoomSocket) {
    roomSocket.emit("loading-questions");
  }
}

const games: Game[] = [];

export const startGame = (roomId: string) => {
  const room = findRoom(roomId);
  if (!room) return;

  const game = new Game(room);
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
