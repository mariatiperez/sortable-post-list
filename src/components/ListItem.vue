<template>
  <li
    class="flex h-20 select-none flex-row justify-between rounded bg-white p-3 text-lg drop-shadow"
  >
    <span data-cy="cell-title" class="self-center"> Post {{ id }} </span>

    <!-- Action buttons -->
    <div class="flex flex-col justify-center">
      <IconButton
        v-if="allowUp"
        name="up"
        icon="chevron-up"
        @click="handleMove('up')"
      />
      <IconButton
        v-if="allowDown"
        name="down"
        icon="chevron-down"
        @click="handleMove('down')"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import IconButton from "./IconButton.vue";

defineProps<{
  id: number;
  allowUp: boolean;
  allowDown: boolean;
}>();

const emit = defineEmits(["move"]);

const handleMove = (direction: string) => emit("move", { direction });
</script>
