import { findGame } from "../domain/game";
import type { TypedServerSocket } from "./socket";
import { createGame } from "../domain/game";
import { io } from "../index";

export const handleGameEvents = (socket: TypedServerSocket) => {
  socket.on("start-game", () => {
    if (!socket.data.player.currentRoom) return;

    io.to(socket.data.player.currentRoom).emit("game-started");

    const game = createGame(
      socket.data.player.currentRoom,
      io.to(socket.data.player.currentRoom)
    );
    if (!game) {
      io.to(socket.data.player.currentRoom).emit("invalid-game");
      return;
    }
    game.start();
  });

  socket.on("vote-category", (categoryId) => {
    const player = socket.data.player;
    const game = findGame(player);
    if (!game) return;
    game.voteForCategory(player, categoryId);
  });

  socket.on("choose-answer", (answer) => {
    const player = socket.data.player;
    const game = findGame(player);
    if (!game) return;
    game.voteForAnswer(player, answer);
  });
};
