import { Server } from "socket.io";

import { handleGameEvents } from "./events/gameEvents";
import { handlePlayerEvents } from "./events/playerEvents";
import { handleRoomEvents } from "./events/roomEvents";
import type { InterServerEvents, SocketData } from "./events/socket";
import { config } from "./config";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/io";
import { getOrCreatePlayer } from "./domain/player";
import { allowedOrigins, server } from "./server";

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: allowedOrigins,
  },
  path: config.socketPath,
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.id as string;

  const player = getOrCreatePlayer(socket, userId);
  socket.data = { player };
  if (player.name) {
    socket.emit("name-changed", player.name);
  }
  if (player.room) {
    socket.emit("room-joined", player.room.toDto());
    socket.join(player.room.id);

    if (player.room.game) {
      const game = player.room.game;
      if (game.finished) {
        socket.emit(
          "game-finished",
          player.room.players.map((p) => p.toDto())
        );
      } else {
        socket.emit("game-started");
        game.currentVote.emitVoteStart(socket);
      }

      // const game = player.currentRoom.game;
      // if (game.categoriesVoteEnd) {
      //   socket.emit("question-vote-started", )
      // } else {
      //   socket.emit("category-vote-started", )
      // }
    }
  }

  handleGameEvents(socket);
  handlePlayerEvents(socket);
  handleRoomEvents(socket);

  socket.on("disconnect", () => {
    socket.data.player.disconnectedAt = new Date();
  });
});

io.engine.on("connect_error", (err) => {
  console.log(err);
});
