<template>
  <li
    class="h-30 flex w-full select-none flex-col content-center justify-between bg-white p-3 shadow drop-shadow xs:h-16 xs:flex-row"
  >
    <span
      data-cy="timeline-cell-title"
      class="mr-2 mb-2 w-full self-center xs:mb-0 xs:w-4/6"
    >
      Moved Post {{ itemId }} from index {{ prevIndex }} to index
      {{ currIndex }}
    </span>
    <div class="relative h-9">
      <Transition name="switch">
        <div
          v-if="displayConfirmationDialog"
          class="mx-auto grid h-full w-4/6 grid-cols-2 justify-items-center xs:w-full"
        >
          <button
            data-cy="confirm-button"
            class="h-9 w-11 self-center rounded bg-primary p-2 text-white xs:mr-1"
            @click="handleTravel"
          >
            <i class="fa-solid fa-check" />
          </button>
          <button
            data-cy="cancel-button"
            class="h-9 w-11 self-center rounded bg-red-400 p-2 text-white"
            @click="changeConfirmationVisibility(false)"
          >
            <i class="fa-solid fa-xmark" />
          </button>
        </div>
        <div v-else class="grid h-full justify-items-center">
          <button
            data-cy="travel-button"
            class="h-9 w-24 self-center rounded bg-secondary p-2"
            @click="changeConfirmationVisibility(true)"
          >
            Time travel
          </button>
        </div>
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
