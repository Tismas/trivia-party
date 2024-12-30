import { findRoom, Room } from "../domain/room";
import type { TypedServerSocket } from "./socket";

export const handleRoomEvents = (socket: TypedServerSocket) => {
  socket.on("create-room", () => {
    const room = new Room();
    socket.data.player.joinRoom(room);
  });

  socket.on("join-room", (roomId) => {
    const room = findRoom(roomId);
    if (!room) {
      socket.emit("room-not-found");
      return;
    }

    socket.data.player.joinRoom(room);
  });

  socket.on("leave-room", () => {
    socket.data.player.leaveRoom();
  });
};
