import { BroadcastOperator, Socket } from "socket.io";

import { ClientToServerEvents, ServerToClientEvents } from "../../../common/io";
import { Player } from "../domain/player";

export type InterServerEvents = Record<string, never>;

export type SocketData = {
  player: Player;
};

export type TypedServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type TypedRoomSocket = BroadcastOperator<
  ServerToClientEvents,
  SocketData
>;
