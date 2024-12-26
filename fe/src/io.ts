import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/io";
import { config } from "./config";

const url = new URL(config.backendUrl);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  url.host,
  { path: url.pathname }
);
