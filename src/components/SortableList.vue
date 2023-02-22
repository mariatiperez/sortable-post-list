<template>
  <section>
    <article
      v-if="list.length == 0"
      data-cy="empty-list-message"
      class="mb-5 flex h-20 flex-row items-center rounded bg-white p-3 drop-shadow"
    >
      Something happened, we don't have any posts to display
      <img class="ml-2 inline h-10" src="/cat.png" alt="Sad Cat" srcset="" />
    </article>
    <TransitionGroup tag="ul" v-else>
      <ListItem
        v-for="(item, index) in list"
        data-cy="list-item"
        :key="`item-${item.id}`"
        :id="item.id"
        :allow-up="index !== 0"
        :allow-down="index < list.length - 1"
        @move="$emit('move', { ...$event, index, item })"
      />
    </TransitionGroup>
  </section>
</template>

<script lang="ts" setup>
import ListItem from "./ListItem.vue";
import type { ListItemI } from "@/types";

defineProps<{
  list: Array<ListItemI>;
}>();
</script>
