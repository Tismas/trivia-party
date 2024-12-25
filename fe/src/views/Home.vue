<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Input from "../ui/Input.vue";
import { router } from "../router";
import { socket } from "../io";

const name = ref(localStorage.getItem("name") || "");

// TODO handle reconnecting to existing game

const handleContinue = () => {
  if (name.value) {
    socket.emit("set-name", name.value);
    localStorage.setItem("name", name.value);

    // TODO move to event handler
    router.push("/menu");
  }
};
</script>

<template>
  <div class="wrapper">
    <Input placeholder="Your name" v-model="name" />
    <Button :disabled="name.length === 0" @click="handleContinue"
      >Continue</Button
    >
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
