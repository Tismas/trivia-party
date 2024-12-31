<script setup lang="ts">
import { socket } from "../io";
import { usePlayerStore } from "../store/playerStore";
import Button from "../ui/Button.vue";
import CrownIcon from "../ui/icons/CrownIcon.vue";

const playerStore = usePlayerStore();

const handleGameRestart = () => {
  socket.emit("start-game");
};

const handleLeaveRoom = () => {
  socket.emit("leave-room");
};

const handleBackToLobby = () => {
  socket.emit("back-to-lobby");
};
</script>

<template>
  <div class="scores">
    <div class="score" v-for="(player, index) in playerStore.finalScores">
      <div
        v-if="index < 3"
        class="crown"
        :class="{ first: index === 0, second: index === 1, third: index === 2 }"
      >
        <CrownIcon />
      </div>
      <div class="player-name">{{ player.name }}</div>
      <div class="points">{{ player.points }}</div>
    </div>
    <div class="actions">
      <Button @click="handleBackToLobby()">Back to lobby</Button>
      <Button @click="handleLeaveRoom()">Leave room</Button>
      <Button @click="handleGameRestart()">Play again</Button>
    </div>
  </div>
</template>

<style scoped>
.score {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 32px;
}
.player-name {
  font-size: 1.4rem;
}
.crown.first {
  color: #facc15;
}
.crown.second {
  color: #9ca3af;
}
.crown.third {
  color: #78350f;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
