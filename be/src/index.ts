import express from "express";
import http from "http";
import { Server } from "socket.io";

import { handleGameEvents } from "./events/gameEvents";
import { handlePlayerEvents } from "./events/playerEvents";
import { handleRoomEvents } from "./events/roomEvents";
import { InterServerEvents, SocketData } from "./events/socket";

import { ClientToServerEvents, ServerToClientEvents } from "../../common/io";

const app = express();
app.use(express.static("./dist"));
const server = http.createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  handleGameEvents(socket);
  handlePlayerEvents(socket);
  handleRoomEvents(socket);
});

io.on("disconnect", () => {});

const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
