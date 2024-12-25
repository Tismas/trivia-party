<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Input from "../ui/Input.vue";
import { socket } from "../io";
import { router } from "../router";

const name = ref("");

const handleJoin = () => {
  socket.emit("join-room", name.value);

  // TODO move to event handler
  router.push("/game");
};
</script>

<template>
  <div class="wrapper">
    <Input placeholder="room-id" v-model="name" />
    <Button :disabled="name.length === 0" @click="handleJoin">Join</Button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
