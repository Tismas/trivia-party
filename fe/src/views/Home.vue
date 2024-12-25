<script setup lang="ts">
import { ref } from "vue";
import Button from "../ui/Button.vue";
import Input from "../ui/Input.vue";
import { router } from "../router";

const name = ref(localStorage.getItem("name") || "");

const handleContinue = () => {
  if (name.value) {
    localStorage.setItem("name", name.value);
    router.push("/menu");
  }
};
</script>

<template>
  <div class="wrapper">
    <Input v-model="name" />
    <Button :disabled="name.length === 0" @click="handleContinue"
      >Continue</Button
    >
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
