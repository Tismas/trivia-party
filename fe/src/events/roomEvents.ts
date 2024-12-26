import { router } from "../router";
import { usePlayerStore } from "../store/playerStore";
import type { Player } from "./playerEvents";
import type { TypedSocket } from "./socket";

export interface Room {
  id: string;
  players: Player[];
}

export interface ClientRoomEventHandlers {
  "room-joined": (room: Room) => void;
  "room-not-found": () => void;
  "room-left": (roomId: string, playerId: string) => void;
  "game-started": () => void;
}

export const handleRoomEvents = (socket: TypedSocket) => {
  socket.on("room-joined", (room) => {
    router.push("/game");
    const player = usePlayerStore();
    player.setRoom(room);
  });

  socket.on("room-not-found", () => {
    const playerStore = usePlayerStore();
    playerStore.roomNotFound();
  });
};
