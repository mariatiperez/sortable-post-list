<template>
  <div
    v-if="list.length == 0"
    data-cy="empty-list-message"
    class="mt-5 flex h-[70px] flex-row justify-between rounded bg-white p-3 drop-shadow transition-all duration-300"
  >
    <span>
      Something happened, we don't have any posts to display
      <img class="inline h-10 pl-5" src="/cat.png" alt="Sad Cat" srcset="" />
    </span>
  </div>
  <TransitionGroup tag="ul" v-else>
    <ListItem
      v-for="(item, index) in list"
      :key="item.id"
      :id="item.id"
      :allow-up="index !== 0"
      :allow-down="index < list.length - 1"
      @move="$emit('move', { ...$event, index, item })"
      data-cy="list-item"
    />
  </TransitionGroup>
</template>

<script lang="ts" setup>
import ListItem from "./ListItem.vue";
import type { ListItemI } from "@/types";

defineProps<{
  list: Array<ListItemI>;
}>();
</script>
