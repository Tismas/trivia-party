import { AnswerDto, Player, Room, Votes } from "./dto";

export type ClientRoomEventHandlers = {
  "room-joined": (room: Room) => void;
  "room-not-found": () => void;
  "player-joined": (player: Player) => void;
  "player-left": (player: Player) => void;
  "room-left": (roomId: string, playerId: string) => void;
  "game-started": () => void;
  "invalid-game": () => void;
  "game-finished": (players: Player[]) => void;
};

export type ClientPlayerEventHandlers = {
  "name-changed": (name: string) => void;
};

export type ClientGameEventHandlers = {
  "loading-categories": () => void;
  "category-vote-started": (endsAt: string, categories: AnswerDto[]) => void;
  "category-vote-finished": (votes: Votes, winner: number) => void;

  "loading-questions": () => void;
  "question-vote-started": (
    endsAt: string,
    question: string,
    answers: AnswerDto[]
  ) => void;
  "question-vote-finished": (votes: Votes, correctAnswer: number) => void;
};

export type ClientEventHandlers = ClientGameEventHandlers &
  ClientPlayerEventHandlers &
  ClientRoomEventHandlers;
