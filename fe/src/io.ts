import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/io";
import { config } from "./config";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  config.backendUrl
);
