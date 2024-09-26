<template>
  <svg
    fill="none"
    :width="svgDimensions.width"
    :height="svgDimensions.height"
    xmlns="http://www.w3.org/2000/svg"
    :class="'w-full h-full pointer-events-none absolute left-0 top-0 transform-gpu stroke-2 z-[-1]'"
    :view-box="`0 0 ${svgDimensions.width} ${svgDimensions.height}`">
    <path :d="pathD" :stroke="props.pathColor" :stroke-width="props.pathWidth" :stroke-opacity="props.pathOpacity" stroke-linecap="round" />
    <path :d="pathD" :stroke-width="props.pathWidth" :stroke="`url(#${gradientId})`" stroke-opacity="1" stroke-linecap="round" />
    <defs>
      <linearGradient
        :id="gradientId"
        class="transform-gpu"
        gradientUnits="userSpaceOnUse"
        :x1="gradientPositions.x1"
        :x2="gradientPositions.x2"
        :y1="gradientPositions.y1"
        :y2="gradientPositions.y2">
        <stop :stop-color="props.gradientStartColor" stop-opacity="0" />
        <stop :stop-color="props.gradientStartColor" />
        <stop offset="32.5%" :stop-color="props.gradientStopColor" />
        <stop offset="100%" :stop-color="props.gradientStopColor" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  reverse: {
    type: Boolean,
    default: false
  },
  container: {
    default: null,
    required: true
  },
  from: {
    default: null,
    required: true
  },
  to: {
    default: null,
    required: true
  },
  curvature: {
    type: Number,
    default: 0
  },
  startXOffset: {
    type: Number,
    default: 0
  },
  startYOffset: {
    type: Number,
    default: 0
  },
  endXOffset: {
    type: Number,
    default: 0
  },
  endYOffset: {
    type: Number,
    default: 0
  },
  pathWidth: {
    type: Number,
    default: 2
  },
  pathOpacity: {
    type: Number,
    default: 0.2
  },
  gradientStartColor: {
    type: String,
    default: '#6344F5'
  },
  gradientStopColor: {
    type: String,
    default: '#18CCFC'
  },
  pathColor: {
    type: String,
    default: 'gray'
  },
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: () => Math.random() * 3 + 4
  }
});

const pathD = ref('');
const svgDimensions = ref({ width: 0, height: 0 });
const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
const gradientPositions = ref({
  x1: '0%',
  x2: '0%',
  y1: '0%',
  y2: '0%'
});

const gradientCoordinates = computed(() => {
  if (props.reverse) {
    return {
      x1: ['90%', '-10%'],
      x2: ['100%', '0%'],
      y1: ['0%', '0%'],
      y2: ['0%', '0%']
    };
  } else {
    return {
      x1: ['10%', '110%'],
      x2: ['0%', '100%'],
      y1: ['0%', '0%'],
      y2: ['0%', '0%']
    };
  }
});

watchEffect(() => {
  updatePath();
});

onMounted(() => {
  updatePath();
  window.addEventListener('resize', updatePath);
  animateGradient();
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePath);
});

function updatePath() {
  if (props.container && props.from && props.to) {
    const containerRect = props.container.getBoundingClientRect();
    const rectA = props.from.getBoundingClientRect();
    const rectB = props.to.getBoundingClientRect();

    const svgWidth = containerRect.width;
    const svgHeight = containerRect.height;
    svgDimensions.value = { width: svgWidth, height: svgHeight };

    const startX = rectA.left - containerRect.left + rectA.width / 2 + props.startXOffset;
    const startY = rectA.top - containerRect.top + rectA.height / 2 + props.startYOffset;
    const endX = rectB.left - containerRect.left + rectB.width / 2 + props.endXOffset;
    const endY = rectB.top - containerRect.top + rectB.height / 2 + props.endYOffset;

    const controlY = startY - props.curvature;
    const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;

    pathD.value = d;
  }
}

function animateGradient() {
  gsap.fromTo(
    gradientPositions.value,
    {
      x1: gradientCoordinates.value.x1[0],
      x2: gradientCoordinates.value.x2[0],
      y1: gradientCoordinates.value.y1[0],
      y2: gradientCoordinates.value.y2[0]
    },
    {
      x1: gradientCoordinates.value.x1[1],
      x2: gradientCoordinates.value.x2[1],
      y1: gradientCoordinates.value.y1[1],
      y2: gradientCoordinates.value.y2[1],
      duration: props.duration,
      delay: props.delay,
      ease: 'power2.out',
      repeat: -1
    }
  );
}
</script>

<style lang="scss" scoped></style>
