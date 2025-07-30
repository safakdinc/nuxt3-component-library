<template>
  <div class="relative h-fit w-fit parent">
    <div class="w-fit h-full mask-image overflow-visible" ref="container" :class="props.class">
      <div class="w-full h-fit flex flex-col overflow-visible items-start" ref="boxes">
        <div v-for="word in props.words" class="word">{{ word }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";

const props = defineProps({
  class: String,
  words: {
    type: Array,
    default: ["One", "Two", "Three"],
  },
  intervals: {
    type: Number,
    default: 500,
  },
  duration: {
    type: Number,
    default: 0.6,
  },
  ease: {
    type: String,
    default: "power3.out",
  },
  start: {
    type: Boolean,
    default: true,
  },
});

const container = ref();
const boxes = ref();

function convertEmToPixels() {
  return boxes.value.offsetHeight / props.words.length;
}

let tl;

function createTimeline() {
  gsap.set(boxes.value, {
    y: boxes.value.offsetHeight / 2 - convertEmToPixels() / 2,
  });

  tl = gsap.timeline({
    repeat: -1,
  });

  props.words.forEach((word, i) => {
    if (i != 0) {
      tl.to(
        boxes.value,
        {
          duration: props.duration,
          ease: props.ease,
          y: boxes.value.offsetHeight / 2 - convertEmToPixels() / 2 - convertEmToPixels() * i,
        },
        `>${props.intervals / 1000}`,
      );
    }
  });

  tl.to(
    boxes.value,
    {
      duration: props.duration,
      ease: props.ease,
      y: boxes.value.offsetHeight / 2 - convertEmToPixels() / 2,
    },
    `>${props.intervals / 1000}`,
  );
}

watch(
  () => props.start,
  (newVal) => {
    if (newVal) {
      createTimeline();
    } else {
      tl.kill();
    }
  },
);

const prevWidth = ref();

onMounted(() => {
  prevWidth.value = window.innerWidth;
  if (props.start) {
    createTimeline();
  }
  const resizeHandler = () => {
    tl.kill(); // Kill the current timeline
    createTimeline(); // Recreate the timeline
  };

  const checkResize = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== prevWidth.value) {
      prevWidth.value = currentWidth;
      resizeHandler();
    }
  };

  checkResize();

  window.addEventListener("resize", checkResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkResize);
  });
});
</script>

<style lang="scss" scoped>
.mask-image {
  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
