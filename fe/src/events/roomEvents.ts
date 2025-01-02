import type { Player } from "../../../common/dto";
import { router } from "../router";
import { usePlayerStore } from "../store/playerStore";
import type { TypedSocket } from "./socket";

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

  socket.on("room-left", () => {
    router.push("/menu");
  });

  socket.on("game-started", () => {
    router.push("/game");
  });

  socket.on("invalid-game", () => {
    router.push("/menu");
    const playerStore = usePlayerStore();
    playerStore.reset();
  });

  socket.on("connection-reset", () => {
    router.push("/home");
  });
};
