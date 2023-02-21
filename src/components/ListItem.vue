<template>
  <div
    class="transition-all duration-300 rounded bg-white drop-shadow p-3 my-5 flex flex-row justify-between h-[70px]"
  >
    <span class="self-center" data-cy="cell-title"> Post {{ id }} </span>
    <div
      class="grid justify-end"
      :class="allowUp && allowDown ? 'grid-rows-2' : 'grid-rows-1'"
    >
      <button
        v-if="allowUp"
        class="rounded text-primary py-1 flex"
        @click="$emit('move', { direction: 'up' })"
        data-cy="up-button"
      >
        <i class="fa-solid fa-chevron-up self-center"></i>
      </button>
      <button
        v-if="allowDown"
        class="rounded text-primary py-1 flex"
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
