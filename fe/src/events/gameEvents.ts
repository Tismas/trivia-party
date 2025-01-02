import { usePlayerStore } from "../store/playerStore";
import type { TypedSocket } from "./socket";

export const handleGameEvents = (socket: TypedSocket) => {
  socket.on("loading-categories", () => {
    const playerStore = usePlayerStore();
    playerStore.setGameLoading();
  });
  socket.on(
    "vote-started",
    (startedAt, endsAt, type, question, answers, category, index, total) => {
      const playerStore = usePlayerStore();
      playerStore.startVote(
        new Date(startedAt),
        new Date(endsAt),
        type,
        question,
        answers,
        category,
        index,
        total
      );
    }
  );
  socket.on("vote-finished", (votes, winner) => {
    const playerStore = usePlayerStore();
    playerStore.finishVote(votes, winner);
  });

  socket.on("loading-questions", () => {
    const playerStore = usePlayerStore();
    playerStore.setGameLoading();
  });

  socket.on("game-finished", (players) => {
    const playerStore = usePlayerStore();
    playerStore.finishGame(players);
  });
};
