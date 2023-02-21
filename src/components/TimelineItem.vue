<template>
  <div
    class="flex h-[60px] flex-row content-center justify-between bg-white p-3 drop-shadow-md"
  >
    <span class="mr-2 self-center" data-cy="timeline-cell-title">
      Moved Post {{ itemId }} from Index {{ prevIndex }} to Index
      {{ currIndex }}
    </span>
    <button
      class="w-fit self-center rounded bg-secondary p-2"
      @click="$emit('travel')"
      data-cy="travel-button"
    >
      Time Travel
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  itemId: number;
  prevIndex: number;
  currIndex: number;
}>();
</script>
