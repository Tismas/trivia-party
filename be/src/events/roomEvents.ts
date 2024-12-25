import type { TypedServerSocket } from "./socket";

export interface ServerRoomEventHandlers {
  "create-room": () => void;
  "join-room": (roomId: string) => void;
  "leave-room": () => void;
  "start-game": () => void;
}

export const handleRoomEvents = (socket: TypedServerSocket) => {};
