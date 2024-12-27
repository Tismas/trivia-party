import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../io";
import type { Player, Room, Votes } from "../../../common/dto";

interface VoteOption {
  id: number;
  name: string;
}

interface VoteAnswers {
  votes: Votes;
  winner: number;
}

interface Vote {
  question: string;
  endsAt: Date;
  options: VoteOption[];
  answers: VoteAnswers | null;
}

export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const joiningRoom = ref(false);
  const settingName = ref(false);
  const gameLoading = ref(false);
  const currentVote = ref<Vote | null>(null);
  const currentRoom = ref<Room | null>(null);

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

  const startCategoryVote = (endsAt: Date, categories: VoteOption[]) => {
    gameLoading.value = false;
    currentVote.value = {
      question: "Which category?",
      endsAt,
      options: categories,
      answers: null,
    };
  };

  const finishVote = (votes: Votes, winner: number) => {
    if (!currentVote.value) return;
    currentVote.value.answers = { votes, winner };
  };

  const getPlayerById = (playerId: string) => {
    if (!currentRoom.value) return null;
    return currentRoom.value.players.find((p) => p.id === playerId) || null;
  };

  return {
    name,
    setName,
    settingName,
    reset,

    currentRoom,
    setRoom,
    createRoom,
    joinRoom,
    joiningRoom,
    addPlayerToCurrentRoom,
    removePlayerFromCurrentRoom,
    roomNotFound,
    getPlayerById,

    setGameLoading,
    startCategoryVote,
    finishVote,
    gameLoading,
    currentVote,
  };
});
