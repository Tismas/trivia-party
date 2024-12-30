<script setup lang="ts">
import { differenceInMilliseconds } from "date-fns";
import { ref } from "vue";
const props = defineProps<{ until: Date; stopped?: boolean }>();

const getTimeLeft = () => {
  const left = differenceInMilliseconds(props.until, new Date());
  if (left < 0) return 0;
  return left;
};

const timeLeft = ref(getTimeLeft());

const updateTimer = () => {
  if (!props.stopped) {
    timeLeft.value = getTimeLeft();
  }

  if (timeLeft.value > 0) {
    setTimeout(updateTimer, 1000 / 20);
  }
};

updateTimer();
</script>

<template>
  {{ (timeLeft / 1000).toFixed(1) }}
</template>
