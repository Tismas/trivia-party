import type { TypedServerSocket } from "./socket";
import { setPlayerName } from "../domain/player";

export const handlePlayerEvents = (socket: TypedServerSocket) => {
  socket.on("set-name", (name) => {
    setPlayerName(socket.data.player, name);
    socket.emit("name-changed", name);
  });
};
