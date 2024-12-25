<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
    <div class="ball"></div>
  </div>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.wrapper {
  position: relative;
  height: 20px;
  width: 20px;

  animation: rotate 1s forwards infinite;
}
.ball {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: var(--primary);
}

.ball:nth-child(1) {
  top: 0;
  left: calc(50% - 3px);
}
.ball:nth-child(2) {
  top: calc(50% - 3px);
  left: 0;
  opacity: 0.9;
}
.ball:nth-child(3) {
  bottom: 0;
  left: calc(50% - 3px);
  opacity: 0.8;
}
.ball:nth-child(4) {
  top: calc(50% - 3px);
  right: 0;
  opacity: 0.7;
}
</style>
