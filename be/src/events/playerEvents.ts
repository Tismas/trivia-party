import type { TypedServerSocket } from "./socket";

export interface ServerPlayerEventHandlers {
  "set-name": (name: string) => void;
}

export const handlePlayerEvents = (socket: TypedServerSocket) => {
  socket.on("set-name", () => {});
};
