<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../store/playerStore";
import Spinner from "../ui/Spinner.vue";

const playerStore = usePlayerStore();
const chosen = ref<number | null>(null);

const chooseAnswer = (choice: number) => {
  if (chosen.value) return;
  chosen.value = choice;
};
</script>

<template>
  <div v-if="!playerStore.currentVote || playerStore.gameLoading">
    <Spinner />
  </div>
  <div class="wrapper" v-else>
    <span class="question">
      {{ playerStore.currentVote.question }}
    </span>
    <ul class="answers" :class="{ chosen: !!chosen }">
      <li
        class="answer"
        :class="{ chosen: chosen === option.id }"
        v-for="option in playerStore.currentVote.options"
        @click="chooseAnswer(option.id)"
      >
        {{ option.name }}
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
</style>
