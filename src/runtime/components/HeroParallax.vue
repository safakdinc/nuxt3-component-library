<template>
  <div ref="container" class="w-full">
    <div
      ref="parallaxContainer"
      class="w-full flex flex-col gap-[32px] parallax-container pt-[100px]"
    >
      <div
        v-for="(row, rowIndex) in items"
        :key="rowIndex"
        class="w-full flex flex-row gap-[32px] overflow-x-visible"
        :ref="(el) => (rows[rowIndex] = el)"
      >
        <div
          v-for="(item, itemIndex) in row"
          :key="itemIndex"
          class="w-[35%] flex-shrink-0 aspect-[4/3] rounded-lg bg-white"
        >
          <img
            :src="item.img"
            alt="item.name"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  [
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
  ],
  [
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
  ],
  [
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Deneme",
    },
  ],
];

const container = ref(null);
const parallaxContainer = ref();
const rows = ref([]);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      start: "top top",
      end: "+=2500", // Set total scroll distance to 1000px
      scrub: 1,
      markers: true,
      pin: true,
      pinSpacing: true,
    },
  });

  // Rotation animation (completes in first 100px)

  tl.fromTo(
    parallaxContainer.value,
    {
      x: "0%",
      rotateX: 30,
      rotateZ: 20,
    },
    {
      x: 0,
      rotateX: 0,
      rotateZ: 0,
      duration: 0.2, // This makes it complete in 10% of the total scroll distance
    }
  );

  tl.fromTo(
    parallaxContainer.value,
    {
      y: "0",
    },
    {
      y: "0",
      duration: 0.2, // This makes it complete in 10% of the total scroll distance
    },
    "<"
  );

  // Other animations (will start after rotation and complete by the end)
  rows.value.forEach((row, index) => {
    gsap.set(row, {
      x: index % 2 === 0 ? "-10%" : "10%",
    });

    tl.to(
      row,
      {
        x: index % 2 === 0 ? "10%" : "-10%",
        yPercent: -300,
      },
      0.15 // Start after the rotation animation
    );
  });
});
</script>

<style scoped>
.parallax-container {
  transform-style: preserve-3d;
  perspective: 1000px;
}
</style>
