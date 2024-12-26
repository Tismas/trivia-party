import { router } from "../router";
import { usePlayerStore } from "../store/playerStore";
import type { Player } from "./playerEvents";
import type { TypedSocket } from "./socket";

export interface Room {
  id: string;
  players: Player[];
}

export const handleRoomEvents = (socket: TypedSocket) => {
  socket.on("room-joined", (room) => {
    router.push("/lobby");
    const player = usePlayerStore();
    player.setRoom(room);
  });

  socket.on("room-not-found", () => {
    const playerStore = usePlayerStore();
    playerStore.roomNotFound();
  });

  socket.on("player-joined", (player: Player) => {
    const playerStore = usePlayerStore();
    playerStore.addPlayerToCurrentRoom(player);
  });

  socket.on("player-left", (player: Player) => {
    const playerStore = usePlayerStore();
    playerStore.removePlayerFromCurrentRoom(player);
  });

  socket.on("game-started", () => {
    router.push("/game");
  });

  socket.on("invalid-game", () => {
    router.push("/menu");
    const playerStore = usePlayerStore();
    playerStore.reset();
  });
};
