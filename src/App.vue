<template>
  <div class="flex h-full justify-center bg-gray font-Roboto">
    <Home class="z-10" />
    <div
      class="diagonal-background lg:min-h-[20%] absolute top-0 z-0 min-h-[25%] w-full transition-all duration-300 md:min-h-[25%]"
    />
  </div>
</template>

<script setup lang="ts">
import Home from "./components/Home.vue";
</script>

<style lang="css" scoped>
.diagonal-background {
  background: linear-gradient(to right bottom, #691edd 50%, #f4f4f4 50%);
}
</style>
