<script setup lang="ts">
import { usePlayerStore, type Vote } from "../../store/playerStore";
import Answer from "./Answer.vue";

const playerStore = usePlayerStore();
const props = defineProps<{ currentVote: Vote }>();
</script>

<template>
  <div class="question-wrapper">
    <span class="question" v-html="props.currentVote.question" />

    <ul class="answers" :class="{ chosen: !!playerStore.chosenAnswer }">
      <li
        class="answer"
        :class="{
          chosen: playerStore.chosenAnswer === option.id,
          winner: props.currentVote.results?.winner === option.id,
          looser:
            props.currentVote.results &&
            props.currentVote.results.winner !== option.id,
        }"
        v-for="option in props.currentVote.options"
        @mousedown="playerStore.chooseAnswer(option.id)"
      >
        <Answer :option="option" :currentVote="currentVote" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.question-wrapper {
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

  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
}
.answers.chosen {
  color: var(--fg-darker);
}
.answer {
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;
  min-height: 100px;
  padding: 8px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
</style>
