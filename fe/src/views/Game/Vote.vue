<script setup lang="ts">
import { computed } from "vue";
import type { AnswerDto } from "../../../../common/dto";
import { usePlayerStore, type Vote } from "../../store/playerStore";

const props = defineProps<{
  currentVote: Vote;
  option: AnswerDto;
  playerId: string;
  time: number;
}>();
const playerStore = usePlayerStore();

const player = computed(() => playerStore.getPlayerById(props.playerId));
</script>

<template>
  <div class="vote" v-if="player">
    <span v-if="props.currentVote.type === 'question'" class="vote-time"
      >{{ time.toFixed(1) }}s</span
    >
    <span class="vote-player-name">
      {{ player.name }}
    </span>
    <span
      v-if="
        props.currentVote.type === 'question' &&
        props.currentVote.results?.winner === option.id
      "
    >
      +{{ playerStore.getScore(playerId) }}
    </span>
  </div>
</template>

<style scoped>
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
