<script setup lang="ts">
import { differenceInMilliseconds } from "date-fns";
import { computed, ref } from "vue";
const props = defineProps<{ until: Date; stopped?: boolean }>();

const getTimeLeft = () => {
  const left = differenceInMilliseconds(props.until, new Date());
  if (left < 0) return 0;
  return left;
};

const timeLeft = ref(getTimeLeft());
const startedAt = new Date();
const totalDuration = Number(props.until) - Number(startedAt);

const percentage = computed(() =>
  Math.round((timeLeft.value / totalDuration) * 100)
);

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
  <div class="timer-wrapper">
    <div class="timer" :style="`height: ${percentage}%`"></div>
  </div>
</template>

<style scoped>
.timer-wrapper {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0px;
  pointer-events: none;
}
.timer {
  background: linear-gradient(
    to right,
    var(--primary-lighter),
    rgba(0, 0, 0, 0) 10px,
    rgba(0, 0, 0, 0) calc(100% - 10px),
    var(--primary-lighter)
  );
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
