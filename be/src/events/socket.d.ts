import { Socket } from "socket.io";

import { ClientToServerEvents, ServerToClientEvents } from "../../../common/io";

export type InterServerEvents = Record<string, never>;
export type SocketData = {
  player: {};
};

export type TypedServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
