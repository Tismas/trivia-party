import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../io";
import type { Room } from "../events/roomEvents";
import type { Player } from "../events/playerEvents";

export const usePlayerStore = defineStore("player", () => {
  const name = ref("");
  const joiningRoom = ref(false);
  const settingName = ref(false);
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

  return {
    name,
    setName,
    settingName,

    currentRoom,
    setRoom,
    createRoom,
    joinRoom,
    joiningRoom,
    addPlayerToCurrentRoom,
    removePlayerFromCurrentRoom,
    roomNotFound,
  };
});
