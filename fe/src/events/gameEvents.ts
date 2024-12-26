import type { TypedSocket } from "./socket";

export interface ClientGameEventHandlers {
  "category-voted": () => void;
  "question-answered": () => void;
}

export const handleGameEvents = (socket: TypedSocket) => {
  socket.on("category-voted", () => {});
  socket.on("question-answered", () => {});
};
