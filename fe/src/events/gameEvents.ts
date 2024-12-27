import { usePlayerStore } from "../store/playerStore";
import type { TypedSocket } from "./socket";

export const handleGameEvents = (socket: TypedSocket) => {
  socket.on("loading-categories", () => {
    const playerStore = usePlayerStore();
    playerStore.setGameLoading();
  });
  socket.on("category-vote-started", (endsAt, categories) => {
    const playerStore = usePlayerStore();
    playerStore.startVote(
      new Date(endsAt),
      "category",
      "Which category?",
      categories
    );
  });
  socket.on("category-vote-finished", (votes, winner) => {
    const playerStore = usePlayerStore();
    playerStore.finishVote(votes, winner);
  });

  socket.on("loading-questions", () => {
    const playerStore = usePlayerStore();
    playerStore.setGameLoading();
  });
  socket.on("question-vote-started", (endsAt, question, answers) => {
    const playerStore = usePlayerStore();
    playerStore.startVote(new Date(endsAt), "question", question, answers);
  });
  socket.on("question-vote-finished", (votes, correctAnswer) => {
    const playerStore = usePlayerStore();
    playerStore.finishVote(votes, correctAnswer);
  });

  socket.on("game-finished", (players) => {
    const playerStore = usePlayerStore();
    playerStore.finishGame(players);
  });
};
