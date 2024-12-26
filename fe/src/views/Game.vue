<script setup lang="ts">
import { usePlayerStore } from "../store/playerStore";

const playerStore = usePlayerStore();
</script>

<template>
  <div class="title">
    Room code <span class="code">{{ playerStore.currentRoom?.id }}</span>
  </div>
  <div class="players">
    Currently in room
    <ul class="player-list">
      <li class="player" v-for="player in playerStore.currentRoom?.players">
        {{ player.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
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
}
.players {
  font-size: 1.2rem;
}
.player-list {
  list-style: none;
  margin-top: 8px;
}
.player {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
