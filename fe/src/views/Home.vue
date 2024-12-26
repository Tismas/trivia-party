<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Input from "../ui/Input.vue";
import { usePlayerStore } from "../store/playerStore";

// TODO handle reconnecting to existing game
const playerStore = usePlayerStore();
const name = ref(localStorage.getItem("name") || "");
</script>

<template>
  <div class="wrapper">
    <Input placeholder="Your name..." v-model="name" />
    <Button
      :disabled="name.length === 0 || playerStore.settingName"
      :loading="playerStore.settingName"
      @click="playerStore.setName(name)"
    >
      Continue
    </Button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
