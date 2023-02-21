<template>
  <div
    class="bg-white drop-shadow-md p-3 flex flex-row content-center justify-between h-[60px]"
  >
    <span class="self-center mr-2" data-cy="timeline-cell-title">
      Moved Post {{ itemId }} from Index {{ prevIndex }} to Index
      {{ currIndex }}
    </span>
    <button
      class="rounded bg-secondary p-2 w-fit self-center"
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
