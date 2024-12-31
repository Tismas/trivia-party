<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../store/playerStore";
import Button from "../ui/Button.vue";
import CopyIcon from "../ui/icons/CopyIcon.vue";
import CheckIcon from "../ui/icons/CheckIcon.vue";
import { socket } from "../io";

const playerStore = usePlayerStore();
const copied = ref(false);

const handleRoomCopy = () => {
  if (!playerStore.currentRoom) return;

  window.navigator.clipboard.writeText(playerStore.currentRoom.id);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2500);
};

const handleGameStart = () => {
  socket.emit("start-game");
};

const handleLeaveRoom = () => {
  socket.emit("leave-room");
};
</script>

<template>
  <div v-if="!playerStore.currentRoom">Room not found.</div>
  <div v-else class="wrapper">
    <div class="title">
      Room code
      <span class="code" :class="{ copied }" @click="handleRoomCopy()">
        {{ playerStore.currentRoom.id }}
        <CopyIcon v-if="!copied" />
        <CheckIcon v-else />
      </span>
    </div>
    <div class="players">
      Currently in room
      <ul class="player-list">
        <li class="player" v-for="player in playerStore.currentRoom.players">
          {{ player.name }}
        </li>
      </ul>
    </div>
    <div class="actions">
      <Button @click="handleLeaveRoom()">Leave room</Button>
      <Button
        @click="handleGameStart()"
        :disabled="playerStore.currentRoom.players.length <= 1"
      >
        Start game
      </Button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 16px;
}
.code {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}
.code.copied {
  color: green;
}
.code.copied > svg {
  color: green;
}
.players {
  font-size: 1.2rem;
}
.player-list {
  list-style: none;
  margin-top: 8px;
  margin-bottom: 16px;
}
.player {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
