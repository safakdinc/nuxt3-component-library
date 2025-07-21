<template>
  <div class="relative overflow-hidden h-fit w-fit parent" ref="container">
    <div class="opacity-0 w-fit pointer-events-none" :class="props.class">{{ props.words[index] }}</div>
    <div class="absolute top-0 flex flex-col gap-[8px] h-full" :class="props.class">
      <div v-for="word in props.words" :key="word" class="box" ref="boxes">
        {{ word }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const props = defineProps({
  class: String,
  words: {
    type: Array,
    default: ['One', 'Two', 'Three']
  },
  intervals: {
    type: Number,
    default: 2000
  },
  duration: {
    type: Number,
    default: 0.6
  },
  ease: {
    type: String,
    default: 'power3.out'
  }
});

const container = ref();
const boxes = ref();
const index = ref(0);

onMounted(() => {
  startAnimation();
});

function startAnimation() {
  const tl = gsap.timeline({
    repeat: -1
  });
  boxes.value.forEach((box, index) => {
    if (index != 0) {
      tl.to(
        container.value,
        {
          duration: props.duration,
          ease: props.ease,
          scrollTo: { y: getDistance(index) }
        },
        `>${props.intervals / 1000}`
      );
    }
  });
  tl.to(
    container.value,
    {
      duration: props.duration,
      ease: props.ease,
      scrollTo: { y: 0 }
    },
    `>${props.intervals / 1000}`
  );
}

function getDistance(i) {
  const parentRect = container.value.getBoundingClientRect();
  const rect = boxes.value[i].getBoundingClientRect();
  const topDistance = rect.top - parentRect.top;
  const scrollTop = container.value.scrollTop;
  return topDistance + scrollTop;
}
</script>

<style lang="scss" scoped></style>
