import { getCategoriesPool } from "../api/categories";
import { TypedRoomSocket } from "../events/socket";
import { findRoom, Room } from "./room";
import { pick } from "../../../common/utils/array";
import { addSeconds } from "date-fns";

const categoriesPool = (await getCategoriesPool()).trivia_categories;

export interface CategoryDto {
  id: number;
  name: string;
}

class Game {
  room: Room;
  categoriesVoteEnd: Date | null;
  questionVoteEnd: Date | null;

  constructor(room: Room) {
    this.room = room;
    this.categoriesVoteEnd = null;
    this.questionVoteEnd = null;
  }

  startCategoryVote(roomSocket: TypedRoomSocket) {
    roomSocket.emit("loading-categories");
    const categories = pick(categoriesPool, 4);
    this.categoriesVoteEnd = addSeconds(new Date(), 30);
    roomSocket.emit(
      "category-vote-started",
      this.categoriesVoteEnd.toISOString(),
      categories
    );
  }

  startQuestionVote(roomSocket: TypedRoomSocket) {
    roomSocket.emit("loading-questions");
  }
}

const games = [];

export const startGame = (roomId: string) => {
  const room = findRoom(roomId);
  if (!room) return;

  const game = new Game(room);
  games.push(game);
  return game;
};
