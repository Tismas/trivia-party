<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <RouterView />
    <div class="footer">
      The game uses <a href="https://opentdb.com/">Open Trivia Database</a> api.
    </div>
  </div>
</template>

<style>
:root {
  --bg: #0f172a;
  --primary: #164e63;
  --primary-lighter: #0891b2;
  --fg: #e2e8f0;
  --fg-darker: #94a3b8;
  --disabled: #9ca3af;
}

html {
  font-size: 20px;
}

.container {
  background: var(--bg);
  color: var(--fg);

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 0.6rem;
  padding: 4px 0;
  color: var(--disabled);
}
.footer a {
  font-size: 0.6rem;
  color: var(--primary);
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  transition-duration: 0.2s;

  font-family: Inter var, ui-sans-serif, system-ui, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
</style>
