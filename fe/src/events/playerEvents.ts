import { router } from "../router";
import { usePlayerStore } from "../store/playerStore";
import type { TypedSocket } from "./socket";

export const handlePlayerEvents = (socket: TypedSocket) => {
  socket.on("name-changed", () => {
    const playerStore = usePlayerStore();
    router.push("/menu");
    playerStore.setNameChanged();
  });
};
