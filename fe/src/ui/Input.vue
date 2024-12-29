<script setup lang="ts">
const value = defineModel({ required: true });
const { error, ...rest } = defineProps<{ error?: string | null }>();
</script>

<template>
  <div class="input-wrapper">
    <input v-model="value" v-bind="rest" :class="{ error }" />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
input {
  background: transparent;
  border: 1px solid var(--fg);
  border-radius: 8px;
  padding: 8px 16px;
  outline: none;
  color: var(--fg);
}
.error-message {
  font-size: 0.8rem;
  color: red;
}
input.error {
  border-color: red;
}
input:focus {
  border-color: var(--primary);
}
</style>
