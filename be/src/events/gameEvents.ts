import type { TypedServerSocket } from "./socket";

export interface ServerGameEventHandlers {
  "vote-category": (categoryId: string) => void;
  "choose-answer": (answer: string) => void;
}

export const handleGameEvents = (socket: TypedServerSocket) => {
  socket.on("vote-category", () => {});
  socket.on("choose-answer", () => {});
};
