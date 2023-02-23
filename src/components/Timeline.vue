<template>
  <section
    class="h-fit overflow-hidden rounded bg-neutral-100 shadow drop-shadow"
  >
    <h2
      class="flex h-16 select-none items-center border-neutral-100 bg-white py-3 px-6 text-lg font-medium"
    >
      List of actions committed
    </h2>
    <div class="flex max-h-[480px] min-h-[70px] items-center p-2 sm:p-6">
      <Transition name="switch">
        <div
          v-if="timeline.length == 0"
          class="flex h-full w-full flex-col text-center"
        >
          No actions to display <br />
          <span>
            Click
            <i class="fa-solid fa-circle-question text-primary" /> to see the
            instructions
          </span>
        </div>
        <div
          v-else
          class="relative max-h-[430px] min-h-[70px] w-full overflow-y-auto overflow-x-clip"
          id="timeline"
        >
          <TransitionGroup name="fade" tag="ul">
            <TimelineItem
              v-for="(item, index) in timeline"
              data-cy="timeline-item"
              :key="`timeline-item-${item.itemId}-${item.timestamp}`"
              :item-id="item.itemId"
              :prev-index="item.prevIndex"
              :curr-index="item.currIndex"
              :class="{
                'rounded-t': index === 0,
                'rounded-b': index === timeline.length - 1,
              }"
              @travel="$emit('travel', index)"
            />
          </TransitionGroup>
        </div>
      </Transition>
    </div>
  </section>
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
