<template>
  <div
    :class="twMerge('w-full grid justify-center gap-[8px]', props.class)"
    :style="{ 'grid-template-columns': `repeat(auto-fit, minmax(${props.gridMinWidth}px, 1fr))` }"
    @mousemove="mouseMove"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave">
    <slot></slot>
  </div>
</template>

<script setup>
import { twMerge } from 'tailwind-merge';
const props = defineProps({
  class: String,
  gridMinWidth: {
    type: Number,
    default: 220
  }
});
const x = ref();
const y = ref();
const isHovered = ref(false);

function mouseMove() {
  x.value = event.clientX;
  y.value = event.clientY;
}

function mouseEnter() {
  isHovered.value = true;
}

function mouseLeave() {
  isHovered.value = false;
}

provide('clientX', x);
provide('clientY', y);
provide('isHovered', isHovered);
</script>

<style lang="scss" scoped>
.deneme {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
</style>
