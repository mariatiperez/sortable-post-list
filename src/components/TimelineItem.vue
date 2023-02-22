<template>
  <div
    class="flex h-[60px] flex-row content-center justify-between bg-white p-3 drop-shadow-md"
  >
    <span class="mr-2 self-center" data-cy="timeline-cell-title">
      Moved Post {{ itemId }} from Index {{ prevIndex }} to Index
      {{ currIndex }}
    </span>
    <div v-if="displayConfirmationDialog" class="text-xs">
      <button
        @click="handleTravel"
        class="mr-2 w-10 min-w-fit self-center rounded bg-primary p-2 text-white"
        data-cy="confirm-button"
      >
        <i class="fa-solid fa-check"></i>
      </button>
      <button
        @click="changeConfirmationVisibility(false)"
        class="w-10 min-w-fit self-center rounded bg-red-400 p-2 text-white"
        data-cy="cancel-button"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <button
      v-else
      class="w-fit min-w-fit self-center rounded bg-secondary p-2"
      @click="changeConfirmationVisibility(true)"
      data-cy="travel-button"
    >
      Time Travel
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  itemId: number;
  prevIndex: number;
  currIndex: number;
}>();

const displayConfirmationDialog = ref(false);

const changeConfirmationVisibility = (display: boolean) => {
  displayConfirmationDialog.value = display;
};

const emit = defineEmits(["travel"]);
const handleTravel = () => {
  changeConfirmationVisibility(false);
  emit("travel");
};
</script>
