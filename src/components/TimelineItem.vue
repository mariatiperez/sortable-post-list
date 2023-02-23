<template>
  <li
    class="flex h-24 w-full select-none flex-row content-center justify-between bg-white p-3 shadow drop-shadow xs:h-16"
  >
    <span data-cy="timeline-cell-title" class="mr-2 w-3/6 self-center">
      Moved Post {{ itemId }} from index {{ prevIndex }} to index
      {{ currIndex }}
    </span>
    <div class="relative">
      <Transition name="switch">
        <div
          v-if="displayConfirmationDialog"
          class="flex h-full flex-row content-center"
        >
          <button
            data-cy="confirm-button"
            class="mr-2 h-9 w-11 min-w-fit self-center rounded bg-primary p-2 text-white"
            @click="handleTravel"
          >
            <i class="fa-solid fa-check" />
          </button>
          <button
            data-cy="cancel-button"
            class="h-9 w-11 min-w-fit self-center rounded bg-red-400 p-2 text-white"
            @click="changeConfirmationVisibility(false)"
          >
            <i class="fa-solid fa-xmark" />
          </button>
        </div>
        <div v-else class="flex h-full flex-row content-center">
          <button
            data-cy="travel-button"
            class="h-9 w-24 self-center whitespace-nowrap rounded bg-secondary p-2"
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

<style lang="css" scoped>
.switch-move,
.switch-enter-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  backface-visibility: hidden;
}

.switch-leave-active {
  opacity: 0;
}

.switch-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
