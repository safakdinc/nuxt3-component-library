<template>
  <div ref="containerRef" class="h-full flex" :class="props.class">
    <div class="">
      <div ref="dotRef" class="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center">
        <div ref="innerDotRef" class="h-2 w-2 rounded-full border border-neutral-300 bg-white"></div>
      </div>
      <svg :viewBox="`0 0 20 ${svgHeight}`" width="20" :height="svgHeight" class="ml-4 block" aria-hidden="true">
        <path
          :d="`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`"
          fill="none"
          stroke="#9091A0"
          strokeOpacity="0.16"></path>
        <path
          :d="`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`"
          fill="none"
          stroke="url(#gradient)"
          stroke-width="1.25"></path>
        <defs>
          <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" :y1="gradientY1" :y2="gradientY2">
            <stop stop-color="#6344F5" stop-opacity="0"></stop>
            <stop offset="0.5" stop-color="#6344F5"></stop>
            <stop offset="1" stop-color="#18CCFC"></stop>
            <stop offset="0" stop-color="#AE48FF" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  triggerElement: {
    default: null
  },
  class: {
    type: String,
    default: ''
  }
});

const containerRef = ref(null);
const gradientY1 = ref(0);
const gradientY2 = ref(0);
const svgHeight = ref(0);

onMounted(() => {
  let scrollerElement = document.querySelector(props.triggerElement) || window;
  ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
  ScrollTrigger.scrollerProxy(scrollerElement, {
    scrollTop(value) {
      if (arguments.length) {
        scrollerElement.scrollTop = value;
      }
      return scrollerElement.scrollTop;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  });
  scrollerElement.addEventListener('scroll', () => {
    let scrollY = scrollerElement.scrollTop;
    gsap.to(gradientY1, {
      value: scrollY,
      duration: 0.6,
      ease: 'power2.out'
    });
    gsap.to(gradientY2, {
      value: scrollY + scrollerElement.offsetHeight * (scrollY / svgHeight.value) + 100 * (scrollY / svgHeight.value),
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  if (containerRef.value) {
    svgHeight.value = containerRef.value.offsetHeight;
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>
