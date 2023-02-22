<template>
  <div
    class="grid h-min w-full grid-cols-1 justify-center gap-10 p-10 text-sm md:grid-cols-2 lg:gap-32"
  >
    <div class="h-min">
      <h1 class="h-12 select-none text-lg font-medium text-white">
        Sortable Post List
        <span class="group relative">
          <div class="inline cursor-pointer">
            <i class="fa-solid fa-circle-question" />
          </div>
          <div
            class="tooltip-arrow pointer-events-none absolute top-7 -left-32 z-10 w-64 rounded-md border-transparent bg-neutral-100 p-2 pl-6 text-xs font-normal text-neutral-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-active:opacity-100 sm:left-8 sm:-top-6"
          >
            <ul class="list-disc">
              <li>Use the arrows to move the posts up and down</li>
              <li>
                Click on Time Travel to rewind the posts as it was before that
                action was taken and remove the clicked card and the cards above
                that.
              </li>
            </ul>
          </div>
        </span>
      </h1>
      <ListLoader v-if="loading" />
      <SortableList v-else :list="list" @move="handleMove" />
    </div>
    <Timeline :timeline="timeline" @travel="handleTravel" />
  </div>
</template>

<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";
import Timeline from "@/components/Timeline.vue";
import ListLoader from "@/components/ListLoader.vue";
import { ref, onMounted } from "vue";
import type { ListItemI, MoveI, TimelineItemI } from "@/types";
import { getList } from "@/api";

const loading = ref<boolean>(true);
const list = ref<ListItemI[]>([]);
const timeline = ref<TimelineItemI[]>([]);
const currState = ref<number[]>([]);
let listById: { [id: number]: ListItemI } = {};

onMounted(async () => {
  list.value = await getList();
  loading.value = false;
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
    timestamp: new Date(),
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
  currState.value = targetState;
};
</script>
