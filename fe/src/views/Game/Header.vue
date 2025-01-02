<script setup lang="ts">
import type { Vote } from "../../store/playerStore";

const props = defineProps<{ currentVote: Vote }>();
</script>

<template>
  <div class="header-container">
    <span
      class="header-category"
      v-if="props.currentVote.category"
      v-html="props.currentVote.category"
    />
    <span class="header-question">
      <span v-if="props.currentVote.category">Question</span
      ><span v-else>Round</span> {{ props.currentVote.index }}/{{
        props.currentVote.total
      }}
    </span>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.header-category {
  font-size: 0.8rem;
  font-weight: bold;
}
.header-question {
  font-size: 0.7rem;
}
</style>
