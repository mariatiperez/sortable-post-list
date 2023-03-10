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
          v-if="displayConfirmation"
          class="flex w-24 flex-row justify-evenly xs:justify-between"
        >
          <IconButton
            name="confirm"
            icon="check"
            :rounded="false"
            class="bg-primary"
            @click="handleTravel"
          />
          <IconButton
            name="cancel"
            icon="xmark"
            :rounded="false"
            class="bg-red-400"
            @click="changeConfirmationVisibility(false)"
          />
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
import IconButton from "./IconButton.vue";

defineProps<{
  itemId: number;
  prevIndex: number;
  currIndex: number;
}>();

const emit = defineEmits(["travel"]);
const displayConfirmation = ref(false);

const changeConfirmationVisibility = (display: boolean) => {
  displayConfirmation.value = display;
};

const handleTravel = () => {
  changeConfirmationVisibility(false);
  emit("travel");
};
</script>
