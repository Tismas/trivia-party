import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/io";
import { config } from "./config";
import { handleGameEvents } from "./events/gameEvents";
import { handlePlayerEvents } from "./events/playerEvents";
import { handleRoomEvents } from "./events/roomEvents";

const url = new URL(config.backendUrl);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  url.origin,
  { path: url.pathname + "socket.io", transports: ["websocket"] }
);

handleGameEvents(socket);
handlePlayerEvents(socket);
handleRoomEvents(socket);
