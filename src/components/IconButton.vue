<template>
  <button :data-cy="`${name}-button`" :class="buttonClass">
    <i :class="`fa-solid fa-${icon} self-center`" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    icon: string;
    rounded: boolean;
  }>(),
  {
    rounded: true,
  }
);

const buttonClass = computed(() => {
  if (props.rounded) return "flex rounded py-1 text-center text-primary";
  return "w-11 rounded p-2 text-white";
});
</script>
