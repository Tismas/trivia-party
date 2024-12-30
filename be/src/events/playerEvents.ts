import type { TypedServerSocket } from "./socket";

export const handlePlayerEvents = (socket: TypedServerSocket) => {
  socket.on("set-name", (name) => {
    socket.data.player.setName(name);
  });
};
