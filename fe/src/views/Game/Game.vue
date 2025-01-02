<script setup lang="ts">
import { usePlayerStore } from "../../store/playerStore";
import Spinner from "../../ui/Spinner.vue";
import Timer from "../../ui/Timer.vue";
import Header from "./Header.vue";
import Question from "./Question.vue";

const playerStore = usePlayerStore();
</script>

<template>
  <div v-if="!playerStore.currentVote || playerStore.gameLoading">
    <Spinner />
  </div>
  <div class="wrapper" v-else>
    <Header :currentVote="playerStore.currentVote" />
    <Timer
      :key="playerStore.currentVote.question"
      :startedAt="playerStore.currentVote.startedAt"
      :endsAt="playerStore.currentVote.endsAt"
      :stopped="Boolean(playerStore.currentVote.results)"
    />
    <Question :currentVote="playerStore.currentVote" />
    <div></div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
</style>
