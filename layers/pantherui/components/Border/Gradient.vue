<template>
  <div :class="twMerge('rounded-2xl p-[3px] relative cursor-pointer card', props.wrapperClass)">
    <div class="absolute top-0 left-0 h-full w-full rounded-[inherit] gradient-border"></div>
    <div class="absolute top-0 left-0 h-full w-full gradient"></div>
    <div
      :class="props.class"
      class="overflow-hidden w-full h-full rounded-[inherit] px-[16px] py-[8px]"
      :style="{ background: props.background }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  background: {
    type: String,
    default: 'black'
  },
  class: String,
  wrapperClass: String
});
</script>

<style lang="scss" scoped>
.card {
  &:hover {
    .gradient {
      opacity: 1;
    }
  }
}

.gradient {
  inset: 0;
  z-index: -1;
  opacity: 0.3;
  transition: opacity 0.5s ease;
  filter: blur(15px);
  animation: backgroundShift 5s infinite alternate;
  background-size: 400% 400%;
  background-image: radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent),
    radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent),
    radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316);
}

.gradient-border {
  inset: 0;
  z-index: -1;
  opacity: 0.6;
  transition: opacity 0.5s ease;
  animation: backgroundShift 5s infinite alternate;
  background-size: 400% 400%;
  background-image: radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent),
    radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent),
    radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316);
}
@keyframes backgroundShift {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
