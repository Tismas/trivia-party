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

  socket.on("back-to-lobby", () => {
    const room = socket.data.player.room;
    if (!room) return;

    room.socket.emit("back-to-lobby");
  });
};
