<script setup lang="ts">
import { ref } from "vue";
import { socket } from "../io";
import { router } from "../router";
import Button from "../ui/Button.vue";

const creatingRoom = ref(false);

const handleCreateRoot = () => {
  socket.emit("create-room");
  creatingRoom.value = true;

  // TODO move to event handler
  setTimeout(() => {
    router.push("/game");
  }, 1000);
};

const handleJoinRoom = () => {
  router.push("/join");
};
</script>

<template>
  <div class="wrapper">
    <Button :loading="creatingRoom" @click="handleCreateRoot"
      >Create room</Button
    >
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
