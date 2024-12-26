import express from "express";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";

import { handleGameEvents } from "./events/gameEvents";
import { handlePlayerEvents } from "./events/playerEvents";
import { handleRoomEvents } from "./events/roomEvents";
import type { InterServerEvents, SocketData } from "./events/socket";
import { config } from "./config";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/io";
import { addPlayer, Player } from "./domain/player";
import { leaveRoom } from "./domain/room";

const app = express();
const server = http.createServer(app);
const allowedOrigins = ["http://localhost:5173", "https://tismas.github.io"];

app.use(cors({ origin: allowedOrigins }));
app.use(morgan("[:date[web]] :method :url :status"));

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
  socket.data = { player: new Player() };
  addPlayer(socket.data.player);

  handleGameEvents(socket);
  handlePlayerEvents(socket);
  handleRoomEvents(socket);

  socket.on("disconnect", () => {
    if (socket.data.player.currentRoom) {
      leaveRoom(socket.data.player);
    }
  });
});

io.engine.on("connect_error", (err) => {
  console.log(err);
});

app.get("/", (_, res) => {
  res.status(200).send("Trivia party - Ok!");
});
app.get("/status", (_, res) => {
  res.status(200).send("ok");
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
