<script setup lang="ts">
import { router } from "../router";
import Button from "../ui/Button.vue";
import { usePlayerStore } from "../store/playerStore";

const playerStore = usePlayerStore();

const handleJoinRoom = () => {
  router.push("/join");
};
</script>

<template>
  <div class="wrapper">
    <Button
      :loading="playerStore.joiningRoom"
      :disabled="playerStore.joiningRoom"
      @click="playerStore.createRoom()"
    >
      Create room
    </Button>
    <Button @click="handleJoinRoom">Join room</Button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
