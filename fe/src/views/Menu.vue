<script setup lang="ts">
import Button from "../ui/Button.vue";
</script>

<template>
  <div class="wrapper">
    <Button>Create room</Button>
    <Button>Join room</Button>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
