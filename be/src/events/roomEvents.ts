import { TypedServerSocket } from "./socket";

export interface ServerRoomEventHandlers {
  "create-room": () => void;
  "join-room": () => void;
  "leave-room": () => void;
  "start-game": () => void;
}

export const handleRoomEvents = (socket: TypedServerSocket) => {};
