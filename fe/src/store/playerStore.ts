import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../io";
import type { AnswerDto, Player, Room, Votes } from "../../../common/dto";
import { router } from "../router";

interface VoteAnswers {
  votes: Votes;
  winner: number;
}

interface Vote {
  type: "question" | "category";
  question: string;
  endsAt: Date;
  options: AnswerDto[];
  results: VoteAnswers | null;
}

export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const joiningRoom = ref(false);
  const settingName = ref(false);
  const gameLoading = ref(false);
  const currentVote = ref<Vote | null>(null);
  const currentRoom = ref<Room | null>(null);
  const chosenAnswer = ref<number | null>(null);
  const finalScores = ref<Player[] | null>(null);

  const setName = (newName: string) => {
    if (!newName) return;

    name.value = newName;
    socket.emit("set-name", newName);
    localStorage.setItem("name", newName);
    settingName.value = true;
  };

  const createRoom = () => {
    socket.emit("create-room");
    joiningRoom.value = true;
  };

  const joinRoom = (roomId: string) => {
    if (!roomId) return;

    socket.emit("join-room", roomId);
    joiningRoom.value = true;
  };

  const removePlayerFromCurrentRoom = (player: Player) => {
    if (!currentRoom.value) return;
    currentRoom.value.players.splice(currentRoom.value.players.indexOf(player));
  };

  const addPlayerToCurrentRoom = (player: Player) => {
    if (!currentRoom.value) return;
    currentRoom.value.players.push(player);
  };

  const roomNotFound = () => {
    joiningRoom.value = false;
    currentRoom.value = null;
  };

  const setRoom = (room: Room) => {
    currentRoom.value = room;
  };

  const reset = () => {
    currentRoom.value = null;
    joiningRoom.value = false;
    settingName.value = false;
  };

  const setGameLoading = () => {
    gameLoading.value = true;
  };

  const startVote = (
    endsAt: Date,
    type: Vote["type"],
    question: string,
    answers: AnswerDto[]
  ) => {
    gameLoading.value = false;
    chosenAnswer.value = null;

    currentVote.value = {
      type,
      question,
      endsAt,
      options: answers,
      results: null,
    };
  };

  const chooseAnswer = (choice: number) => {
    if (chosenAnswer.value || !currentVote.value) return;
    chosenAnswer.value = choice;

    if (currentVote.value.type === "category") {
      socket.emit("vote-category", chosenAnswer.value);
    } else {
      socket.emit("choose-answer", chosenAnswer.value);
    }
  };

  const finishVote = (votes: Votes, winner: number) => {
    if (!currentVote.value) return;
    currentVote.value.results = { votes, winner };
  };

  const getPlayerById = (playerId: string) => {
    if (!currentRoom.value) return null;
    return currentRoom.value.players.find((p) => p.id === playerId) || null;
  };

  const finishGame = (players: Player[]) => {
    finalScores.value = players.sort((p1, p2) => p2.points - p1.points);
    router.push("/summary");
  };

  const getScore = (playerId: string): number => {
    if (!currentRoom.value || !currentVote.value?.results) return 0;

    const maxPoints = currentRoom.value.players.length * 100;
    const correctAnswers =
      currentVote.value.results.votes[currentVote.value.results.winner];
    const place = Object.entries(correctAnswers)
      .sort(([_, timeA], [__, timeB]) => timeA - timeB)
      .map(([playerId]) => playerId)
      .indexOf(playerId);
    if (place === -1) return 0;

    return maxPoints - place * 100;
  };

  return {
    name,
    setName,
    settingName,
    reset,
    finalScores,

    currentRoom,
    setRoom,
    createRoom,
    joinRoom,
    joiningRoom,
    addPlayerToCurrentRoom,
    removePlayerFromCurrentRoom,
    roomNotFound,
    getPlayerById,

    chosenAnswer,
    chooseAnswer,
    setGameLoading,
    startVote,
    finishVote,
    gameLoading,
    currentVote,
    finishGame,
    getScore,
  };
});