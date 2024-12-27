import { findGame } from "../domain/game";
import type { TypedServerSocket } from "./socket";

export const handleGameEvents = (socket: TypedServerSocket) => {
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
