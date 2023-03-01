<template>
  <li
    class="flex h-20 select-none flex-row justify-between rounded bg-white p-3 text-lg drop-shadow"
  >
    <span data-cy="cell-title" class="self-center"> Post {{ id }} </span>

    <!-- Action buttons -->
    <div class="flex flex-col justify-center">
      <button
        v-if="allowUp"
        data-cy="up-button"
        class="flex rounded py-1 text-primary"
        @click="$emit('move', { direction: 'up' })"
      >
        <i class="fa-solid fa-chevron-up self-center" />
      </button>
      <button
        v-if="allowDown"
        data-cy="down-button"
        class="flex rounded py-1 text-primary"
        @click="$emit('move', { direction: 'down' })"
      >
        <i class="fa-solid fa-chevron-down self-center" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  allowUp: boolean;
  allowDown: boolean;
}>();
</script>
