<template>
  <div class="h-[500vh] trigger mt-8 w-full">
    <div class="w-full h-[60vh] pb-8 flex justify-center items-center red-box">
      <div class="w-full max-w-[850px] max-h-full h-full screen-center pt-20"></div>
    </div>
  </div>
  <div class="rounded-xl p-1 flex gap-1 sticky bottom-4 w-full justify-center">
    <div class="flex gap-1 items-center dock relative">
      <div v-for="item in items">
        <img
          v-if="item !== '/docks/safari.png'"
          :src="item"
          class="w-[50px] dock-items aspect-square rounded-md overflow-hidden object-cover" />
        <div v-else>
          <div class="dock-center aspect-square w-[50px] absolute top-0 left-1/2 -translate-x-1/2">
            <div class="video-element w-full aspect-[1203/753] opacity-0">
              <dock-safari-mockup></dock-safari-mockup>
            </div>
          </div>
          <div ref="logo" class="aspect-square w-[50px] absolute top-0 left-1/2 -translate-x-1/2">
            <img :src="item" class="w-full h-full object-contain aspect-square" />
          </div>
        </div>
        <div v-if="item == '/docks/safari.png'" class="w-[50px] placeholder-box"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import Flip from 'gsap/dist/Flip';

gsap.registerPlugin(Flip, ScrollTrigger);

export interface Props {
  scroller?: HTMLElement | null;
}

const props = withDefaults(defineProps<Props>(), {
  scroller: () => document.documentElement
});

const items = ['/docks/zen.png', '/docks/hyprland.png', '/docks/safari.png', '/docks/steam.png', '/docks/discord.webp'];

const isMockup = ref(false);

const DURATION = 0.4;

const logo = useTemplateRef('logo');

function moveToCenter() {
  isMockup.value = true;

  const video = document.querySelector('.video-element') as HTMLVideoElement;
  const screenCenter = document.querySelector('.screen-center') as HTMLDivElement;

  // Capture initial state
  const state = Flip.getState(video);

  screenCenter.appendChild(video);
  gsap.to('.placeholder-box', { width: '0px', duration: DURATION });
  gsap.to(video, {
    opacity: 1,
    duration: DURATION,
    onComplete: () => {
      // Remove Tailwind class and clear GSAP properties
      video.classList.remove('opacity-0');
      gsap.set(video, { clearProps: 'opacity' });
    }
  });
  gsap.to(logo.value, {
    scale: 0,
    opacity: 0,
    duration: DURATION
  });
  Flip.from(state, {
    duration: DURATION,
    ease: 'power2.out',
    scale: true,
    absolute: false
  });
}

function moveBackToDock() {
  isMockup.value = false;

  const video = document.querySelector('.video-element') as HTMLVideoElement;
  const dockCenter = document.querySelector('.dock-center') as HTMLDivElement;

  // Capture initial state
  const state = Flip.getState(video);

  gsap.to('.placeholder-box', { width: '50px', duration: DURATION });
  dockCenter.appendChild(video);
  gsap.to(video, {
    opacity: 0,
    duration: DURATION,
    onComplete: () => {
      // Add back Tailwind class
      video.classList.add('opacity-0');
      gsap.set(video, { clearProps: 'opacity' });
    }
  });

  gsap.to(logo.value, {
    scale: 1,
    opacity: 1,

    duration: DURATION
  });

  Flip.from(state, {
    duration: DURATION,
    ease: 'power2.out',
    scale: true,
    absolute: false
  });
}

onMounted(() => {
  // Create ScrollTrigger for Flip animation
  ScrollTrigger.create({
    trigger: '.red-box',
    start: 'top top',
    end: '+=3000 bottom',
    markers: true,
    pin: true,
    scroller: props.scroller || window,
    onEnter: moveToCenter,
    onLeave: moveBackToDock,
    onEnterBack: moveToCenter,
    onLeaveBack: moveBackToDock
  });
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all DURATIONs ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  scale: none;
}

.dock-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
