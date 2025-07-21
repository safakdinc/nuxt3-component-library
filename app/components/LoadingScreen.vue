<template>
  <div class="fixed top-0 left-0 h-full w-full flex z-[1000] pointer-events-none bg-black" ref="background">
    <div v-for="column in columnNumber" class="h-full flex-1 bg-white scale-y-0 origin-bottom" ref="columns"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
const columnNumber = 5;
const staggerDuration = 0.15;

const props = defineProps({
  start: {
    type: Boolean,
    default: false
  }
});

const columns = ref();
const background = ref();

watch(
  () => props.start,
  newVal => {
    if (newVal == true) {
      console.log('aaa');
      const timeline = gsap.timeline();
      timeline.to(columns.value, {
        scaleY: '100%',
        stagger: staggerDuration,
        delay: 0.5,
        onComplete: () => {
          gsap.set(columns.value, {
            transformOrigin: 'top'
          });
          gsap.set(background.value, {
            backgroundColor: 'rgba(0,0,0,0)'
          });
        }
      });

      timeline.to(columns.value, {
        scaleY: '0%',
        stagger: staggerDuration
      });
    }
  }
);

onMounted(() => {
  if (props.start == true) {
    const timeline = gsap.timeline();
    timeline.to(columns.value, {
      scaleY: '100%',
      stagger: staggerDuration,
      onComplete: () => {
        gsap.set(columns.value, {
          transformOrigin: 'top'
        });
      }
    });

    timeline.to(columns.value, {
      scaleY: '0%',
      stagger: staggerDuration
    });
  }
});
</script>

<style scoped></style>
