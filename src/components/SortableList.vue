<template>
  <section>
    <article
      v-if="list.length == 0"
      data-cy="empty-list-message"
      class="flex h-20 flex-row items-center rounded bg-white p-3 drop-shadow"
    >
      Something happened, we don't have any posts to display
      <img class="ml-2 inline h-10" src="/cat.png" alt="Sad Cat" srcset="" />
    </article>
    <TransitionGroup
      tag="ul"
      name="swap"
      class="flex h-[480px] flex-col justify-between"
    >
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

<style lang="css" scoped>
.swap-move,
.swap-enter-active,
.swap-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  backface-visibility: hidden;
}
</style>
