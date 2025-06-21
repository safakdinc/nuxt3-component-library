<template>
  <div
    ref="container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="[' rounded-lg overflow-hidden group/card relative', props.class]">
    <div class="relative h-full w-full">
      <div ref="overlay" class="absolute inset-0 w-full h-full bg-black/60 z-10 opacity-0"></div>
      <div ref="imageContainer" class="h-full w-full relative">
        <img :src="props.img" :alt="props.imageAlt" :class="['h-full w-full object-cover scale-[1.15]', props.imageClass]" />
      </div>
      <div ref="content" :class="['w-full h-full top-0 left-0 absolute z-40 opacity-0', props.childrenClass]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';

const props = defineProps({
  img: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: 'Hover image'
  },
  class: {
    type: String,
    default: ''
  },
  childrenClass: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  }
});

const container = ref(null);
const overlay = ref(null);
const imageContainer = ref(null);
const content = ref(null);

const getDirection = (ev, obj) => {
  const { width: w, height: h, left, top } = obj.getBoundingClientRect();
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  return ['top', 'right', 'bottom', 'left'][d];
};

const handleMouseEnter = event => {
  if (!container.value) return;
  const direction = getDirection(event, container.value);
  animateHover(direction);
};

const handleMouseLeave = () => {
  animateHoverExit();
};

let duration = 0.2;

const animateHover = direction => {
  gsap.to(overlay.value, { opacity: 1, duration: duration });

  let xMove = 0;
  let yMove = 0;

  switch (direction) {
    case 'top':
      yMove = 20;
      break;
    case 'bottom':
      yMove = -20;
      break;
    case 'left':
      xMove = 20;
      break;
    case 'right':
      xMove = -20;
      break;
  }

  gsap.to(imageContainer.value, {
    x: xMove,
    y: yMove,
    duration: duration,
    ease: 'power2.out'
  });

  gsap.to(content.value, {
    x: -xMove / 10,
    y: -yMove / 10,
    opacity: 1,
    duration: duration,
    ease: 'power2.out'
  });
};

const animateHoverExit = () => {
  gsap.to(overlay.value, { opacity: 0, duration: duration });
  gsap.to(imageContainer.value, { x: 0, y: 0, duration: duration, ease: 'power2.out' });
  gsap.to(content.value, { x: 0, y: 0, opacity: 0, duration: duration, ease: 'power2.out' });
};
</script>
