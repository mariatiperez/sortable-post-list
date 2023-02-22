<template>
  <div class="overflow-hidden rounded bg-neutral-100 shadow drop-shadow">
    <div
      class="flex h-16 items-center border-neutral-100 bg-white py-3 px-6 text-lg font-medium"
    >
      List of actions committed
    </div>
    <div
      class="max-h-[480px] min-h-[70px] divide-y divide-neutral-100 p-2 sm:p-6"
    >
      <div
        v-if="timeline.length == 0"
        class="flex h-full w-full flex-col self-center text-center"
      >
        <span>
          No actions to display <br />
          Click on the arrows to get started <br />
        </span>
        <span>
          <i class="fa-solid fa-chevron-up self-center text-primary" /> /
          <i class="fa-solid fa-chevron-down self-center text-primary" />
        </span>
      </div>
      <div
        v-else
        class="max-h-[430px] min-h-[70px] overflow-y-auto overflow-x-clip"
        id="timeline"
      >
        <TransitionGroup name="fade">
          <TimelineItem
            v-for="(item, index) in timeline"
            :key="`timeline-item-${item.itemId}-${item.timestamp}`"
            :item-id="item.itemId"
            :prev-index="item.prevIndex"
            :curr-index="item.currIndex"
            :class="{
              'rounded-t': index === 0,
              'rounded-b': index === timeline.length - 1,
            }"
            @travel="$emit('travel', index)"
            data-cy="timeline-item"
          />
        </TransitionGroup>
      </div>
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

<style lang="css" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  backface-visibility: hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, -30px);
}

.fade-leave-active {
  position: absolute;
  z-index: 0;
}
</style>
