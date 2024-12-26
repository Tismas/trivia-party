import type { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../common/io";

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
