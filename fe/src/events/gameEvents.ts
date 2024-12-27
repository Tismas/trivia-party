import { usePlayerStore } from "../store/playerStore";
import type { TypedSocket } from "./socket";

export const handleGameEvents = (socket: TypedSocket) => {
  socket.on("loading-categories", () => {
    const playerStore = usePlayerStore();
    playerStore.setGameLoading();
  });
  socket.on("category-vote-started", (endsAt, categories) => {
    const playerStore = usePlayerStore();
    playerStore.startCategoryVote(new Date(endsAt), categories);
  });
  socket.on("category-vote-finished", (votes, winner) => {
    const playerStore = usePlayerStore();
    playerStore.finishVote(votes, winner);
  });
};
