<template>
  <div
    class="my-5 flex h-[70px] flex-row justify-between rounded bg-white p-3 drop-shadow transition-all duration-300"
  >
    <span class="self-center" data-cy="cell-title"> Post {{ id }} </span>
    <div
      class="grid justify-end"
      :class="allowUp && allowDown ? 'grid-rows-2' : 'grid-rows-1'"
    >
      <button
        v-if="allowUp"
        class="flex rounded py-1 text-primary"
        @click="$emit('move', { direction: 'up' })"
        data-cy="up-button"
      >
        <i class="fa-solid fa-chevron-up self-center"></i>
      </button>
      <button
        v-if="allowDown"
        class="flex rounded py-1 text-primary"
        @click="$emit('move', { direction: 'down' })"
        data-cy="down-button"
      >
        <i class="fa-solid fa-chevron-down self-center"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  allowUp: boolean;
  allowDown: boolean;
}>();
defineEmits(["move"]);
</script>
