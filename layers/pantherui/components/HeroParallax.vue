<template>
  <div ref="container" :class="twMerge('w-full', props.class)">
    <div ref="parallaxContainer" class="w-full flex flex-col gap-[32px] parallax-container">
      <div
        v-for="(row, rowIndex) in splitItems"
        :key="rowIndex"
        class="w-full flex flex-row gap-[32px] overflow-x-visible"
        :ref="el => (rows[rowIndex] = el)">
        <div
          v-for="(item, itemIndex) in row"
          :key="itemIndex"
          class="max-w-[480px] max-h-[384px] w-[40vw] aspect-[5/3.5] flex-shrink-0 rounded-lg bg-white image-shadow relative group transition-all hover:translate-y-[-15px]">
          <NuxtLink v-if="item.link" :to="item.link" class="w-full h-full absolute top-0 left-0"></NuxtLink>
          <div
            class="w-full h-full absolute top-0 left-0 z-10 opacity-0 transition-all group-hover:opacity-100 flex items-end p-[16px] pointer-events-none"
            style="background-color: rgba(0, 0, 0, 0.7)">
            <div class="text-Lg">{{ item.name }}</div>
          </div>
          <img :src="item.img" :alt="item.name" :width="800" :height="500" class="w-full h-full object-cover object-top rounded-lg image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { twMerge } from 'tailwind-merge';
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  triggerElement: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: ' '
  }
});

const splitItems = computed(() => {
  const result = [];
  for (let i = 0; i < props.items.length; i += 3) {
    result.push(props.items.slice(i, i + 3));
  }
  return result;
});

const container = ref(null);
const parallaxContainer = ref();
const rows = ref([]);
const rowHeight = ref(384);

function calculateHeight() {
  rowHeight.value = document.querySelectorAll('.image')[0].offsetHeight;
}

onMounted(() => {
  let scrollerElement = document.querySelector(props.triggerElement) || window;
  ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
  window.addEventListener('resize', calculateHeight);
  calculateHeight();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      scroller: scrollerElement
    }
  });

  gsap.set(parallaxContainer.value, {
    rotateX: 30,
    rotateZ: 20,
    y: 0
  });

  tl.to(parallaxContainer.value, {
    rotateX: 0,
    rotateZ: 0,
    duration: 0.2
  });
  tl.to(
    parallaxContainer.value,
    {
      y: '100vh',
      duration: 0.2
    },
    '<'
  );

  rows.value.forEach((row, index) => {
    gsap.set(row, {
      x: index % 2 === 0 ? '-40%' : '10%'
    });

    tl.to(
      row,
      {
        x: index % 2 === 0 ? '20%' : '-30%',
        duration: 1
      },
      '<'
    );
  });
});
</script>
