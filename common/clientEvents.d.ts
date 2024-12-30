import { AnswerDto, Player, Room, VotesDto, VoteType } from "./dto";

export type ClientRoomEventHandlers = {
  "room-joined": (room: Room) => void;
  "room-not-found": () => void;
  "player-joined": (player: Player) => void;
  "player-left": (player: Player) => void;
  "room-left": () => void;
  "game-started": () => void;
  "invalid-game": () => void;
  "game-finished": (players: Player[]) => void;
};

export type ClientPlayerEventHandlers = {
  "name-changed": (name: string) => void;
};

export type ClientGameEventHandlers = {
  "loading-categories": () => void;
  "vote-finished": (votes: VotesDto, winner: number) => void;
  "loading-questions": () => void;
  "vote-started": (
    endsAt: string,
    type: VoteType,
    question: string,
    answers: AnswerDto[],
    category: string | null,
    index: number,
    total: number
  ) => void;
};

export type ClientEventHandlers = ClientGameEventHandlers &
  ClientPlayerEventHandlers &
  ClientRoomEventHandlers;
