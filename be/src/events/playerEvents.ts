import type { TypedServerSocket } from "./socket";
import { setPlayerName } from "../domain/player";

export interface ServerPlayerEventHandlers {
  "set-name": (name: string) => void;
}

export const handlePlayerEvents = (socket: TypedServerSocket) => {
  socket.on("set-name", (name) => {
    setPlayerName(socket.data.player, name);
    socket.emit("name-changed", name);
  });
};
