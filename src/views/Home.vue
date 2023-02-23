<template>
  <div class="flex justify-center font-Roboto">
    <div
      class="z-10 grid h-min w-full grid-cols-1 justify-center gap-10 p-10 text-sm md:grid-cols-2 lg:gap-32"
    >
      <div class="h-min">
        <h1
          class="flex h-12 select-none items-center text-lg font-medium text-white"
        >
          Sortable Post List
          <div class="group relative ml-2">
            <i class="fa-solid fa-circle-question inline cursor-pointer" />
            <ol
              class="pointer-events-none absolute top-7 -left-32 z-10 w-44 list-disc rounded-md border-transparent bg-neutral-100 p-2 pl-6 text-sm font-normal text-neutral-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-active:opacity-100 xs:w-64 sm:left-8 sm:-top-6"
            >
              <li>Use the arrows to move the posts up and down</li>
              <li>
                Then click on <b>Time travel</b> to rewind the posts as it was
                before that action was taken. This will remove the clicked card
                and the cards above that
              </li>
            </ol>
          </div>
        </h1>
        <ListLoader v-if="loading" />
        <SortableList v-else :list="list" @move="handleMove" />
      </div>
      <Timeline :timeline="timeline" @travel="handleTravel" />
    </div>
    <div
      class="diagonal-background absolute top-0 z-0 min-h-[50%] w-full transition-all duration-300 xs:min-h-[25%] md:min-h-[25%] lg:min-h-[20%]"
    />
  </div>
</template>

<script setup lang="ts">
import SortableList from "@/components/SortableList.vue";
import Timeline from "@/components/Timeline.vue";
import ListLoader from "@/components/ListLoader.vue";
import { ref, onMounted, nextTick } from "vue";
import type { ListItemI, MoveI, TimelineItemI } from "@/types";
import { getList } from "@/api";

const loading = ref(true);
const list = ref<ListItemI[]>([]);
const timeline = ref<TimelineItemI[]>([]);
const currState = ref<number[]>([]);
let listById: Record<number, ListItemI> = {};

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
    prevState: [...currState.value],
    timestamp: new Date(),
  });

  // Update state
  currState.value[prevIndex] = currState.value[currIndex];
  currState.value[currIndex] = item.id;
};

const handleTravel = async (index: number) => {
  if (index < 0 || index >= timeline.value.length)
    throw "Selected item doesn't exist";

  const targetState = timeline.value[index].prevState;

  if (!targetState) throw "Selected item doesn't have a state to travel to";

  // Order list to match with targetState
  list.value = targetState.map((id) => listById[id]);
  timeline.value.splice(0, index + 1);
  currState.value = targetState;

  // Scroll timeline to the top
  await nextTick();
  document.getElementById("timeline")?.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="css" scoped>
.diagonal-background {
  background: linear-gradient(to right bottom, #6357b1 50%, #f4f4f4 50%);
}
</style>
