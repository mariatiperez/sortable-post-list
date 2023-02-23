<template>
  <li
    class="h-30 flex w-full select-none flex-col content-center justify-between bg-white p-3 shadow drop-shadow xs:h-16 xs:flex-row"
  >
    <p
      data-cy="timeline-cell-title"
      class="mb-2 w-full self-center xs:mb-0 xs:mr-2 xs:w-4/6"
    >
      Moved Post {{ itemId }} from index {{ prevIndex }} to index
      {{ currIndex }}
    </p>

    <!-- Action buttons -->
    <div class="relative mx-auto h-9 w-24 xs:m-0">
      <Transition name="switch">
        <div
          v-if="displayConfirmationDialog"
          class="flex w-24 flex-row justify-evenly xs:justify-between"
        >
          <button
            data-cy="confirm-button"
            class="w-11 self-center rounded bg-primary p-2 text-white"
            @click="handleTravel"
          >
            <i class="fa-solid fa-check" />
          </button>
          <button
            data-cy="cancel-button"
            class="w-11 self-center rounded bg-red-400 p-2 text-white"
            @click="changeConfirmationVisibility(false)"
          >
            <i class="fa-solid fa-xmark" />
          </button>
        </div>
        <button
          v-else
          data-cy="travel-button"
          class="mx-auto w-24 self-center rounded bg-secondary p-2 xs:mr-0"
          @click="changeConfirmationVisibility(true)"
        >
          Time travel
        </button>
      </Transition>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  itemId: number;
  prevIndex: number;
  currIndex: number;
}>();

const emit = defineEmits(["travel"]);
const displayConfirmationDialog = ref(false);

const changeConfirmationVisibility = (display: boolean) => {
  displayConfirmationDialog.value = display;
};

const handleTravel = () => {
  changeConfirmationVisibility(false);
  emit("travel");
};
</script>
