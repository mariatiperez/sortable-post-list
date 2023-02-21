<template>
  <div class="block h-fit rounded bg-gray shadow drop-shadow">
    <h1 class="rounded-t border-gray bg-white py-3 px-6 text-lg font-medium">
      List of actions committed
    </h1>
    <div class="divide-y divide-gray p-6">
      <TimelineItem
        v-for="(item, index) in timeline"
        :key="`timeline-item-${index}`"
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
