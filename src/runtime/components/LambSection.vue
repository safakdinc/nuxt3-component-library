<template>
  <div :class="['relative flex  flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0', props.class]">
    <div class="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
      <div
        ref="leftLamp"
        :style="{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
        }"
        class="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]">
        <div class="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div class="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
      </div>
      <div
        ref="rightLamp"
        :style="{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
        }"
        class="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]">
        <div class="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div class="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
      </div>
      <div class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
      <div class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
      <div class="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
      <div ref="centerLamp" class="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"></div>
      <div ref="lampLine" class="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"></div>
      <div class="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
    </div>
    <div class="relative z-50 flex -translate-y-80 flex-col items-center px-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
});

const leftLamp = ref(null);
const rightLamp = ref(null);
const centerLamp = ref(null);
const lampLine = ref(null);
const title = ref(null);

onMounted(() => {
  gsap.from(leftLamp.value, {
    opacity: 0.5,
    width: '15rem',
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: leftLamp.value,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from(rightLamp.value, {
    opacity: 0.5,
    width: '15rem',
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: rightLamp.value,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from(centerLamp.value, {
    width: '8rem',
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: centerLamp.value,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from(lampLine.value, {
    width: '15rem',
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: lampLine.value,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.from(title.value, {
    opacity: 0.5,
    y: 100,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: title.value,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play none none reverse'
    }
  });
});
</script>
