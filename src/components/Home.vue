<template>
  <div
    class="grid h-min w-full grid-cols-1 justify-center gap-8 p-10 text-sm sm:grid-cols-2"
  >
    <SortableList :list="list" @move="handleMove" />
    <Timeline :timeline="timeline" @travel="handleTravel" />
  </div>
</template>

<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";
import Timeline from "@/components/Timeline.vue";
import { ref, onMounted } from "vue";
import type { ListItemI, MoveI, TimelineItemI } from "@/types";
import { getList } from "@/api";

const list = ref<ListItemI[]>([]);
const timeline = ref<TimelineItemI[]>([]);
const currState = ref<number[]>([]);
let listById: { [id: number]: ListItemI } = {};

onMounted(async () => {
  list.value = await getList();
  listById = list.value.reduce((result, listItem) => {
    result[listItem.id] = listItem;
    currState.value.push(listItem.id);
    return result;
  }, listById);
});

const handleMove = ({ direction = "down", index: prevIndex, item }: MoveI) => {
  const currIndex = prevIndex + (direction === "down" ? 1 : -1);

  if (currIndex < 0) throw "This item is already at the top of the list";
  if (currIndex >= list.value.length)
    throw "This item is already at the end of the list";

  // Update list
  list.value[prevIndex] = list.value[currIndex];
  list.value[currIndex] = item;

  // Update timeline
  timeline.value.unshift({
    itemId: item.id,
    prevIndex,
    currIndex,
    prevState: [...currState.value], // Improve
  });

  // Update state
  currState.value[prevIndex] = currState.value[currIndex];
  currState.value[currIndex] = item.id;
};

const handleTravel = (index: number) => {
  if (index < 0 || index >= timeline.value.length)
    throw "Selected item doesn't exist";

  const targetState = timeline.value[index].prevState;

  if (!targetState) throw "Selected item doesn't have a state to travel to";

  list.value = targetState.map((id) => listById[id]);
  timeline.value.splice(0, index + 1);
};
</script>
