import type { TypedServerSocket } from "./socket";

export const handleGameEvents = (socket: TypedServerSocket) => {
  socket.on("vote-category", () => {});
  socket.on("choose-answer", () => {});
};
