import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/io";
import { config } from "./config";
import { handleGameEvents } from "./events/gameEvents";
import { handlePlayerEvents } from "./events/playerEvents";
import { handleRoomEvents } from "./events/roomEvents";

const generateUserId = () => {
  const id = crypto.randomUUID();
  localStorage.setItem("user-id", id);
  return id;
};

const url = new URL(config.backendUrl);
const id = localStorage.getItem("user-id") || generateUserId();

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  url.origin,
  {
    path: url.pathname + "socket.io",
    transports: ["websocket"],
    withCredentials: true,
    auth: { id },
  }
);

handleGameEvents(socket);
handlePlayerEvents(socket);
handleRoomEvents(socket);
