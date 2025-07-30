<template>
  <img :src="props.src" class="object-cover" style="object-position: center 100%" ref="image" />
</template>

<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  scrub: {
    type: [Boolean, Number],
    default: true,
  },
  triggerElement: {
    type: String,
    default: null,
  },
});

const image = ref();

onMounted(() => {
  let scrollerElement = document.querySelector(props.triggerElement) || window;
  ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
  ScrollTrigger.scrollerProxy(scrollerElement, {
    scrollTop(value) {
      if (arguments.length) {
        scrollerElement.scrollTop = value;
      }
      return scrollerElement.scrollTop;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });

  gsap.to(image.value, {
    objectPosition: "center 0%",
    ease: "none",
    scrollTrigger: {
      trigger: image.value,
      start: "top bottom",
      end: "bottom top",
      scrub: props.scrub,
      scroller: scrollerElement,
    },
  });

  ScrollTrigger.addEventListener("refreshInit", () => {
    ScrollTrigger.refresh();
  });
});
</script>

<style lang="scss" scoped></style>
