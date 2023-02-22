<template>
  <article
    class="flex min-h-fit select-none flex-row content-center justify-between bg-white p-3 shadow drop-shadow sm:h-16"
  >
    <span data-cy="timeline-cell-title" class="mr-2 self-center">
      Moved Post {{ itemId }} from index {{ prevIndex }} to index
      {{ currIndex }}
    </span>
    <div v-if="displayConfirmationDialog" class="flex flex-row text-xs">
      <button
        data-cy="confirm-button"
        class="mr-2 w-10 min-w-fit self-center rounded bg-primary p-2 text-white"
        @click="handleTravel"
      >
        <i class="fa-solid fa-check" />
      </button>
      <button
        data-cy="cancel-button"
        class="w-10 min-w-fit self-center rounded bg-red-400 p-2 text-white"
        @click="changeConfirmationVisibility(false)"
      >
        <i class="fa-solid fa-xmark" />
      </button>
    </div>
    <button
      v-else
      data-cy="travel-button"
      class="w-fit min-w-fit self-center rounded bg-secondary p-2"
      @click="changeConfirmationVisibility(true)"
    >
      Time Travel
    </button>
  </article>
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
