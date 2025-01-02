<script setup lang="ts">
import { socket } from "../io";
import { router } from "../router";
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
  router.push("/lobby");
};
</script>

<template>
  <div class="wrapper">
    <div class="scores">
      <div
        class="score"
        v-for="{ player, place } in playerStore.finalScores"
        :class="{ first: place === 0, second: place === 1, third: place === 2 }"
      >
        <div v-if="place < 3" class="crown">
          <CrownIcon />
        </div>
        <div v-else></div>
        <div class="player-name">{{ player.name }}</div>
        <div class="points">{{ player.points }}</div>
      </div>
    </div>
    <div class="actions">
      <Button @click="handleBackToLobby()">Back to lobby</Button>
      <Button @click="handleGameRestart()">Play again</Button>
      <Button @click="handleLeaveRoom()">Leave room</Button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
}
.scores {
  margin-bottom: 64px;
}
.score {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;
}
.score.first {
  margin-bottom: 16px;
}
.score.second {
  margin-bottom: 12px;
}
.score.third {
  margin-bottom: 8px;
}
.score.first > .crown {
  color: #facc15;
}
.score.first > .player-name {
  font-size: 2rem;
}
.score.first > .points {
  font-size: 2rem;
}

.score.second > .crown {
  color: #9ca3af;
}

.score.second > .player-name {
  font-size: 1.7rem;
}
.score.second > .points {
  font-size: 1.7rem;
}

.score.third > .crown {
  color: #78350f;
}
.score.third > .player-name {
  font-size: 1.3rem;
}
.score.third > .points {
  font-size: 1.3rem;
}

.player-name {
  font-size: 1rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
