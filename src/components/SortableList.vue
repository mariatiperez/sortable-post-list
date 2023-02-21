<template>
  <div>
    <h1 class="font-medium text-lg text-white">Sortable Post List</h1>
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
