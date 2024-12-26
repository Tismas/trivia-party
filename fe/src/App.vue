<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
:root {
  --bg: #0f172a;
  --primary: #164e63;
  --primary-lighter: #0891b2;
  --fg: #e2e8f0;
  --disabled: #9ca3af;
}

html {
  font-size: 20px;
}

body {
  background: var(--bg);
  color: var(--fg);

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  transition-duration: 0.2s;
}
</style>
