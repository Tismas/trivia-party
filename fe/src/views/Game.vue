<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../store/playerStore";
import Spinner from "../ui/Spinner.vue";
import { socket } from "../io";
import Timer from "../ui/Timer.vue";

const playerStore = usePlayerStore();
const chosen = ref<number | null>(null);

const chooseAnswer = (choice: number) => {
  if (chosen.value) return;
  chosen.value = choice;
  socket.emit("vote-category", chosen.value);
};
</script>

<template>
  <div v-if="!playerStore.currentVote || playerStore.gameLoading">
    <Spinner />
  </div>
  <div class="wrapper" v-else>
    <span class="timer" v-if="!playerStore.currentVote.answers">
      <Timer :until="playerStore.currentVote.endsAt" />
    </span>
    <span class="question">
      {{ playerStore.currentVote.question }}
    </span>
    <ul class="answers" :class="{ chosen: !!chosen }">
      <li
        class="answer"
        :class="{
          chosen: chosen === option.id,
          winner: playerStore.currentVote.answers?.winner === option.id,
          looser:
            playerStore.currentVote.answers &&
            playerStore.currentVote.answers.winner !== option.id,
        }"
        v-for="option in playerStore.currentVote.options"
        @click="chooseAnswer(option.id)"
      >
        {{ option.name }}

        <div class="votes" v-if="playerStore.currentVote.answers">
          <div
            class="vote"
            v-for="[playerId, time] in Object.entries(
              playerStore.currentVote.answers.votes[option.id] || {}
            )"
          >
            <span class="vote-time">{{ time.toFixed(1) }}s</span>
            <span class="vote-player-name">
              {{ playerStore.getPlayerById(playerId)?.name }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.question {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 64px;
}
.answers {
  font-size: 1.2rem;
  list-style: none;
  margin-top: 8px;
}
.answers.chosen {
  color: var(--fg-darker);
}
.answer {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 32px;
  cursor: pointer;
}
.answer.chosen {
  color: var(--primary);
}
.answer.winner {
  color: green;
}
.answer.looser {
  color: red;
}
.votes {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}
.vote {
  display: flex;
  flex-direction: column;
  color: var(--fg);
}
.vote-time {
  font-size: 0.6rem;
}
.vote-player-name {
  font-size: 0.8rem;
}
</style>
