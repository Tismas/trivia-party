import type { TypedServerSocket } from "./socket";

export interface ServerGameEventHandlers {
  "vote-category": (categoryId: string) => void;
  "choose-answer": (answer: string) => void;
}

export const handleGameEvents = (socket: TypedServerSocket) => {};
