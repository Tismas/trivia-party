import type { TypedSocket } from "./socket";

export const handleGameEvents = (socket: TypedSocket) => {
  socket.on("category-voted", () => {});
  socket.on("question-answered", () => {});
};
