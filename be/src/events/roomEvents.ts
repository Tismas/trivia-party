import { createRoom, joinRoom, leaveRoom, type Room } from "../domain/room";
import type { TypedServerSocket } from "./socket";
import { io } from "../index";
import { startGame } from "../domain/game";

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
      io.to(joinedRoom.id).emit("player-joined", socket.data.player.toDto());
      joinSocketRoom(socket, joinedRoom);
    } else {
      socket.emit("room-not-found");
    }
  });

  socket.on("leave-room", () => {
    const leftRoom = leaveRoom(socket.data.player);

    if (leftRoom) {
      leaveSocketRoom(socket, leftRoom);
    }
  });

  socket.on("start-game", () => {
    if (!socket.data.player.currentRoom) return;

    io.to(socket.data.player.currentRoom).emit("game-started");

    const game = startGame(
      socket.data.player.currentRoom,
      io.to(socket.data.player.currentRoom)
    );
    if (!game) {
      io.to(socket.data.player.currentRoom).emit("invalid-game");
      return;
    }
    game.startCategoryVote();
  });
};

const joinSocketRoom = (socket: TypedServerSocket, room: Room) => {
  socket.join(room.id);
  socket.emit("room-joined", room.toDto());
};

export const leaveSocketRoom = (socket: TypedServerSocket, room: Room) => {
  socket.leave(room.id);
  socket.emit("room-left", room.id, socket.data.player.id);
  io.to(room.id).emit("player-left", socket.data.player.toDto());
};
