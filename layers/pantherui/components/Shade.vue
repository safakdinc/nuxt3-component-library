<template>
  <div class="w-full flex flex-col overflow-x-hidden gap-[-2px]">
    <div class="h-screen"></div>
    <div class="flex origin-bottom flex-row" ref="element">
      <img
        sizes="100vw"
        src="https://res.cloudinary.com/dn5zxeevu/image/upload/v1727605207/transition_svj8u3.png"
        class="pointer-events-none h-auto w-full grow origin-top mt-2px" />
    </div>
    <div class="h-[400vh] bg-black translate-y-[-2px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const element = ref();

onMounted(() => {
  const tl = gsap.timeline();

  tl.fromTo(
    element.value,
    { scaleY: 0 },
    {
      scaleY: 8,
      ease: 'none' // Ensures linear scaling
    }
  );
  tl.to(element.value, { scaleX: 2.2 });
  tl.pause();

  setTimeout(() => {
    ScrollTrigger.create({
      animation: tl,
      trigger: element.value,
      start: 'top bottom',
      end: '+=2000',
      scrub: 2,
      pin: true,
      pinSpacing: true
    });
  }, 10);
});
</script>

<style lang="scss" scoped></style>
