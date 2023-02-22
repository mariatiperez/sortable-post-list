<template>
  <article
    v-for="n in 5"
    class="mt-5 h-20 w-full rounded bg-white p-3 drop-shadow"
  >
    <div
      class="flex h-full w-full animate-pulse flex-row justify-between align-middle"
    >
      <div class="h-6 w-14 self-center rounded bg-slate-100" />
      <div class="flex flex-col justify-center">
        <div
          v-if="n > 1 && n < 5"
          class="my-1 h-4 w-4 rounded-full bg-slate-100"
        />
        <div class="my-1 h-4 w-4 rounded-full bg-slate-100" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts"></script>
