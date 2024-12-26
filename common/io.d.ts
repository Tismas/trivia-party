import type { ClientEventHandlers } from "./clientEvents";
import type { ServerEventHandlers } from "./serverEvents";

export type ClientToServerEvents = ServerEventHandlers;
export type ServerToClientEvents = ClientEventHandlers;
