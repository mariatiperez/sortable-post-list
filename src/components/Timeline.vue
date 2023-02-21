<template>
  <div class="block h-fit rounded bg-gray shadow drop-shadow">
    <h1 class="rounded-t border-gray bg-white py-3 px-6 text-lg font-medium">
      List of actions committed
    </h1>
    <div class="divide-y divide-gray p-6">
      <TransitionGroup name="fade">
        <TimelineItem
          v-for="(item, index) in timeline"
          :key="`timeline-item-${item.itemId}-${item.timestamp}`"
          v-bind="item"
          :class="{
            'rounded-t': index === 0,
            'rounded-b': index === timeline.length - 1,
          }"
          @travel="$emit('travel', index)"
          data-cy="timeline-item"
        />
        <span v-if="timeline.length == 0"
          >No actions to display <i class="fa-solid fa-circle-info"></i>
          <i class="fa-solid fa-circle-exclamation text-danger"></i>
          <i class="fa-regular fa-triangle-exclamation"></i>
        </span>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import type { TimelineItemI } from "@/types";

defineProps<{
  timeline: Array<TimelineItemI>;
}>();
</script>
<style>
/* 1. declare transition */

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, -30px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
