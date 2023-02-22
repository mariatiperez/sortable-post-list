<template>
  <div class="flex justify-center font-Roboto">
    <Home class="z-10" />
    <div
      class="diagonal-background absolute top-0 z-0 min-h-[25%] w-full transition-all duration-300 md:min-h-[25%] lg:min-h-[20%]"
    />
  </div>
</template>

<script setup lang="ts">
import Home from "./views/Home.vue";
</script>

<style lang="css" scoped>
.diagonal-background {
  background: linear-gradient(to right bottom, #6357b1 50%, #f4f4f4 50%);
}
</style>
