import { TypedServerSocket } from "./socket";

export interface ServerGameEventHandlers {
  "vote-category": () => void;
  "choose-answer": () => void;
}

export const handleGameEvents = (socket: TypedServerSocket) => {};
