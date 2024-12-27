<script setup lang="ts">
import { usePlayerStore } from "../store/playerStore";
import Spinner from "../ui/Spinner.vue";
import Timer from "../ui/Timer.vue";

const playerStore = usePlayerStore();
</script>

<template>
  <div v-if="!playerStore.currentVote || playerStore.gameLoading">
    <Spinner />
  </div>
  <div class="wrapper" v-else>
    <span class="timer" v-if="!playerStore.currentVote.answers">
      <Timer :until="playerStore.currentVote.endsAt" />
    </span>
    <span class="question" v-html="playerStore.currentVote.question" />
    <ul class="answers" :class="{ chosen: !!playerStore.chosenAnswer }">
      <li
        class="answer"
        :class="{
          chosen: playerStore.chosenAnswer === option.id,
          winner: playerStore.currentVote.answers?.winner === option.id,
          looser:
            playerStore.currentVote.answers &&
            playerStore.currentVote.answers.winner !== option.id,
        }"
        v-for="option in playerStore.currentVote.options"
        @click="playerStore.chooseAnswer(option.id)"
      >
        {{ option.name }}

        <div class="votes" v-if="playerStore.currentVote.answers">
          <div
            v-for="[playerId, time] in Object.entries(
              playerStore.currentVote.answers.votes[option.id] || {}
            )"
          >
            <div class="vote" v-if="playerStore.getPlayerById(playerId)">
              <span class="vote-time">{{ time.toFixed(1) }}s</span>
              <span class="vote-player-name">
                {{ playerStore.getPlayerById(playerId)?.name }}
              </span>
            </div>
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
  text-align: center;
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
  justify-content: space-around;
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
