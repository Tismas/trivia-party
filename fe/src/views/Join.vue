<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Input from "../ui/Input.vue";
import { usePlayerStore } from "../store/playerStore";

const playerStore = usePlayerStore();
const name = ref("");
</script>

<template>
  <div class="wrapper">
    <Input placeholder="ROOM-CODE" v-model="name" />
    <Button
      :loading="playerStore.joiningRoom"
      :disabled="name.length === 0 || playerStore.joiningRoom"
      @click="playerStore.joinRoom(name)"
    >
      Join
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
