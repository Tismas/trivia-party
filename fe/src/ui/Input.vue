<script setup lang="ts">
const value = defineModel({ required: true });
</script>

<template>
  <input v-model="value" />
</template>

<style>
input {
  background: transparent;
  border: 1px solid var(--fg);
  border-radius: 8px;
  padding: 8px 16px;
  outline: none;
}
input:focus {
  border-color: var(--primary);
}
</style>
