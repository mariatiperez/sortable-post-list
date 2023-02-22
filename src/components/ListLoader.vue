<template>
  <div
    v-for="n in 5"
    class="mt-5 h-[70px] w-full rounded bg-white p-3 drop-shadow"
  >
    <div
      class="flex h-full w-full animate-pulse flex-row justify-between align-middle"
    >
      <div class="h-6 w-14 self-center rounded bg-slate-100"></div>
      <div class="flex flex-col justify-center">
        <button class="flex rounded py-1" v-if="n > 1 && n < 5">
          <div class="h-4 w-4 rounded-full bg-slate-100" />
        </button>
        <button class="flex rounded py-1">
          <div class="h-4 w-4 rounded-full bg-slate-100" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
