<script setup lang="ts">
import Spinner from "./Spinner.vue";

const props = defineProps<{ disabled?: boolean; loading?: boolean }>();
const emit = defineEmits(["click"]);
</script>

<template>
  <button :disabled="props.disabled" @click="emit('click')">
    <div class="spinner-wrapper" v-if="loading">
      <Spinner />
    </div>
    <slot />
  </button>
</template>

<style scoped>
button {
  background: var(--primary);
  cursor: pointer;
  padding: 16px 32px;
  outline: none;
  border: none;
  border-radius: 8px;
  position: relative;
  color: var(--fg);
}
button:hover {
  background: var(--primary-lighter);
}
button:disabled {
  background: var(--disabled);
  cursor: not-allowed;
}
.spinner-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
}
</style>
