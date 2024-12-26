import { createRoom, joinRoom, leaveRoom, type Room } from "../domain/room";
import type { TypedServerSocket } from "./socket";
import { io } from "../index";

export const handleRoomEvents = (socket: TypedServerSocket) => {
  socket.on("create-room", () => {
    const room = createRoom();
    const joinedRoom = joinRoom(room.id, socket.data.player);

    if (joinedRoom) {
      joinSocketRoom(socket, joinedRoom);
    }
  });

  socket.on("join-room", (roomId) => {
    const joinedRoom = joinRoom(roomId, socket.data.player);

    if (joinedRoom) {
      joinSocketRoom(socket, joinedRoom);
    } else {
      socket.emit("room-not-found");
    }
  });

  socket.on("leave-room", () => {
    const leftRoom = leaveRoom(socket.data.player);

    if (leftRoom) {
      socket.leave(leftRoom.id);
      socket.emit("room-left", leftRoom.id, socket.data.player.id);
    }
  });

  socket.on("start-game", () => {
    if (!socket.data.player.currentRoom) return;

    io.to(socket.data.player.currentRoom).emit("game-started");
  });
};

const joinSocketRoom = (socket: TypedServerSocket, room: Room) => {
  socket.join(room.id);
  socket.emit("room-joined", room.toDto());
};
