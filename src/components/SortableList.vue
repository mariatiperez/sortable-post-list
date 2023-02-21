<template>
  <div class="h-min">
    <h1 class="text-lg font-medium text-white">
      Sortable Post List

      <span class="group relative">
        <div class="inline cursor-pointer">
          <i class="fa-solid fa-circle-question" />
        </div>
        <div
          class="tooltip-arrow pointer-events-none absolute left-8 -top-6 z-10 hidden w-60 rounded-md border-transparent bg-neutral-100 p-2 pl-6 text-xs font-normal text-neutral-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block"
        >
          <ul class="list-disc">
            <li>Use the arrows to move the posts up and down</li>
            <li>
              Click on time travel to revert an action and the subsequent
              actions
            </li>
          </ul>
        </div>
      </span>
    </h1>
    <TransitionGroup tag="ul">
      <ListItem
        v-for="(item, index) in list"
        :key="item.id"
        :id="item.id"
        :allow-up="index !== 0"
        :allow-down="index < list.length - 1"
        @move="$emit('move', { ...$event, index, item })"
        data-cy="list-item"
      />
      <div
        class="m-5 flex flex-col items-start rounded bg-white p-2 drop-shadow"
        v-if="list.length == 0"
        data-cy="empty-list-message"
      >
        <span>
          Something happened, we don't have any posts to display
          <img
            class="inline h-10 pl-5"
            src="/cat.png"
            alt="Sad Cat"
            srcset=""
          />
        </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import ListItem from "./ListItem.vue";
import type { ListItemI } from "@/types";

defineProps<{
  list: Array<ListItemI>;
}>();
</script>
