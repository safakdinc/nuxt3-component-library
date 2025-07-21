<template>
  <div ref="scroller" class="flex-1 items-center min-h-full scroller overflow-auto relative">
    <DockItems v-if="scroller" :scroller="scroller"></DockItems>
  </div>
</template>

<script setup lang="ts">
const scroller = ref<HTMLElement | null>(null);
</script>
