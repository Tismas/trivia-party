import type { TypedServerSocket } from "./socket";

export const handleGameEvents = (socket: TypedServerSocket) => {
  socket.on("start-game", () => {
    const room = socket.data.player.room;
    if (!room) return;

    room.startGame();
  });

  socket.on("vote-category", (categoryId) => {
    const player = socket.data.player;
    const game = player.room?.game;
    if (!game) return;

    game.voteForCategory(player, categoryId);
  });

  socket.on("choose-answer", (answer) => {
    const player = socket.data.player;
    const game = player.room?.game;
    if (!game) return;

    game.voteForAnswer(player, answer);
  });
};
