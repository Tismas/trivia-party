import { CategoryDto } from "../be/src/domain/game";

export type ClientRoomEventHandlers = {
  "room-joined": (room: Room) => void;
  "room-not-found": () => void;
  "player-joined": (player: Player) => void;
  "player-left": (player: Player) => void;
  "room-left": (roomId: string, playerId: string) => void;
  "game-started": () => void;
  "invalid-game": () => void;
};

export type ClientPlayerEventHandlers = {
  "name-changed": (name: string) => void;
};

export type ClientGameEventHandlers = {
  "loading-categories": () => void;
  "category-vote-started": (endsAt: string, categories: CategoryDto[]) => void;
  "category-vote-finished": () => void;
  "loading-questions": () => void;
  "question-vote-started": () => void;
  "question-vote-finished": () => void;
};

export type ClientEventHandlers = ClientGameEventHandlers &
  ClientPlayerEventHandlers &
  ClientRoomEventHandlers;
