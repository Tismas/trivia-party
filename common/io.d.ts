import { ClientEventHandlers } from "./clientEvents";
import { ServerEventHandlers } from "./serverEvents";

export type ClientToServerEvents = ServerEventHandlers;
export type ServerToClientEvents = ClientEventHandlers;
