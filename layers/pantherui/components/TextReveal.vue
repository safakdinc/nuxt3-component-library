<template>
  <div :class="twMerge('w-64 flex flex-col', props.class)" ref="container">
    <div ref="textContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { twMerge } from 'tailwind-merge';
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  triggerElement: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: 'h-[100vh] sticky top-10 '
  }
});

const textContainer = ref();
const container = ref(null);

onMounted(() => {
  const text = new SplitType(textContainer.value, { types: 'words', splitClass: 'word' });
  const words = text.words;
  const height = textContainer.value.offsetHeight / words.length;
  let scrollerElement = document.querySelector(props.triggerElement) || window;
  ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });

  words.forEach((word, index) => {
    gsap.fromTo(
      word,
      {
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: word,
          start: `top+=${height * index} center`,
          end: `top+=${height * (index + 1)} top`,
          toggleActions: 'play none none reverse',
          scroller: scrollerElement
        }
      }
    );
  });
});
</script>
