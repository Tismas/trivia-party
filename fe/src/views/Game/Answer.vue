<script setup lang="ts">
import type { AnswerDto } from "../../../../common/dto";
import type { Vote } from "../../store/playerStore";
import PlayerVote from "./Vote.vue";

const props = defineProps<{ currentVote: Vote; option: AnswerDto }>();
</script>

<template>
  <span v-html="option.name" data-testid="answer" />

  <div class="votes" v-if="props.currentVote.results">
    <div
      v-for="{ playerId, time } in Object.values(
        props.currentVote.results.votes[option.id] || {}
      )"
    >
      <PlayerVote
        :playerId="playerId"
        :currentVote="currentVote"
        :option="option"
        :time="time"
      />
    </div>
  </div>
</template>

<style scoped>
.votes {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 4px;
}
</style>
