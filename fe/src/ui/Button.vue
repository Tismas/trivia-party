<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>();
const emit = defineEmits(["click"]);
</script>

<template>
  <button :disabled="props.disabled" @click="emit('click')">
    <slot />
  </button>
</template>

<style>
button {
  background: var(--primary);
  cursor: pointer;
  padding: 16px 32px;
  outline: none;
  border: none;
  border-radius: 8px;
}
button:hover {
  background: var(--primary-lighter);
}
button:disabled {
  background: var(--disabled);
  cursor: not-allowed;
}
</style>
