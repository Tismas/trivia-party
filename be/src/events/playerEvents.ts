import { TypedServerSocket } from "./socket";

export interface ServerPlayerEventHandlers {
  "set-name": () => void;
}

export const handlePlayerEvents = (socket: TypedServerSocket) => {};
