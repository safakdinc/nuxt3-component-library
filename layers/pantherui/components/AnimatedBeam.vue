<template>
  <svg
    fill="none"
    :width="svgDimensions.width"
    :height="svgDimensions.height"
    xmlns="http://www.w3.org/2000/svg"
    :class="
      twMerge(
        'pointer-events-none absolute left-0 top-0 transform-gpu stroke-2 z-[-1]',
        props.class,
      )
    "
    :viewBox="`0 0 ${svgDimensions.width} ${svgDimensions.height}`"
  >
    <path
      ref="pathElement"
      :d="pathD"
      :stroke="props.pathColor"
      :stroke-width="props.pathWidth"
      :stroke-opacity="props.pathOpacity"
      stroke-linecap="round"
    />
    <path
      ref="pathElementGradient"
      :d="pathD"
      :stroke-width="props.pathWidth"
      :stroke="`url(#${id})`"
      stroke-opacity="1"
      stroke-linecap="round"
    />
    <defs>
      <linearGradient :id="id" gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
        <stop :stop-color="props.gradientStartColor" stop-opacity="0" />
        <stop :stop-color="props.gradientStartColor" />
        <stop offset="32.5%" :stop-color="props.gradientStopColor" />
        <stop offset="100%" :stop-color="props.gradientStopColor" stop-opacity="0" />
        <animate
          v-if="!isVertical"
          attributeName="x1"
          :values="x1"
          :dur="`${props.duration}s`"
          :begin="`${props.delay}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
        <animate
          v-if="!isVertical"
          attributeName="x2"
          :values="x2"
          :dur="`${props.duration}s`"
          :begin="`${props.delay}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
        <animate
          v-if="isVertical"
          attributeName="y1"
          :values="y1"
          :dur="`${props.duration}s`"
          :begin="`${props.delay}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
        <animate
          v-if="isVertical"
          attributeName="y2"
          :values="y2"
          :dur="`${props.duration}s`"
          :begin="`${props.delay}s`"
          keyTimes="0; 1"
          keySplines="0.16 1 0.3 1"
          calcMode="spline"
          repeatCount="indefinite"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { ref, computed, watchEffect, onBeforeUnmount, watch } from "vue";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export interface AnimatedBeamProps {
  /**
   * Custom CSS class for the SVG element.
   */
  class?: string;

  /**
   * The container element where the beams will be drawn.
   */
  container: HTMLElement;
  from: HTMLElement;
  to: HTMLElement;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  morphDuration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

const props = withDefaults(defineProps<AnimatedBeamProps>(), {
  curvature: 0,
  reverse: false,
  duration: () => Math.random() * 3 + 4,
  delay: 0,
  morphDuration: 0.5,
  pathColor: "gray",
  pathWidth: 2,
  pathOpacity: 0.2,
  gradientStartColor: "#6344F5",
  gradientStopColor: "#18CCFC",
  startXOffset: 0,
  startYOffset: 0,
  endXOffset: 0,
  endYOffset: 0,
});

const id = `beam-${Math.random().toString(36).substring(2, 10)}`;
const isVertical = ref(false);
const isRightToLeft = ref(false);
const isBottomToTop = ref(false);

// Computed animation values based on direction and reverse prop
const x1 = computed(() => {
  const direction = props.reverse ? !isRightToLeft.value : isRightToLeft.value;
  return direction ? "90%; -10%;" : "10%; 110%;";
});

const x2 = computed(() => {
  const direction = props.reverse ? !isRightToLeft.value : isRightToLeft.value;
  return direction ? "100%; 0%;" : "0%; 100%;";
});

const y1 = computed(() => {
  const direction = props.reverse ? !isBottomToTop.value : isBottomToTop.value;
  return direction ? "90%; -10%;" : "10%; 110%;";
});

const y2 = computed(() => {
  const direction = props.reverse ? !isBottomToTop.value : isBottomToTop.value;
  return direction ? "100%; 0%;" : "0%; 100%;";
});

const pathD = ref("");
const svgDimensions = ref<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

// For storing path elements to animate
const pathElement = ref<SVGPathElement>();
const pathElementGradient = ref<SVGPathElement>();

let resizeObserver: ResizeObserver | undefined = undefined;

const { stop: stopEffect } = watchEffect(effect);

function effect() {
  if (resizeObserver === undefined && props.container != null) {
    resizeObserver = new ResizeObserver(() => {
      updatePath();
    });
    resizeObserver.observe(props.container);
    updatePath(); // Initial path calculation
    stopEffect();
  }
}

// Function to update the path based on the positions of the elements
function updatePath(animate = false) {
  if (props.container && props.from && props.to) {
    const containerRect = props.container.getBoundingClientRect();
    const rectA = props.from.getBoundingClientRect();
    const rectB = props.to.getBoundingClientRect();

    const svgWidth = containerRect.width;
    const svgHeight = containerRect.height;
    svgDimensions.value = { width: svgWidth, height: svgHeight };

    const startX = rectA.left - containerRect.left + rectA.width / 2 + (props.startXOffset ?? 0);
    const startY = rectA.top - containerRect.top + rectA.height / 2 + (props.startYOffset ?? 0);
    const endX = rectB.left - containerRect.left + rectB.width / 2 + (props.endXOffset ?? 0);
    const endY = rectB.top - containerRect.top + rectB.height / 2 + (props.endYOffset ?? 0);

    // Check if the light beam is in a vertical direction
    isVertical.value = Math.abs(endY - startY) > Math.abs(endX - startX);

    // Determine the animation direction based on the position relationship
    isRightToLeft.value = endX < startX;
    isBottomToTop.value = endY < startY;

    const controlY = startY - (props.curvature ?? 0);
    const newPath = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;

    if (animate && pathD.value && pathElement.value && pathElementGradient.value) {
      // Animate path morphing
      gsap.to([pathElement.value, pathElementGradient.value], {
        duration: props.morphDuration,
        ease: "power2.out",
        morphSVG: newPath,
        onUpdate: () => {
          // Update the reactive ref during animation
          if (pathElement.value) {
            pathD.value = pathElement.value.getAttribute("d") || newPath;
          }
        },
        onComplete: () => {
          pathD.value = newPath;
        },
      });
    } else {
      pathD.value = newPath;
    }
  }
}

// Watch for curvature changes and animate
watch(
  () => props.curvature,
  (newCurvature, oldCurvature) => {
    if (oldCurvature !== undefined && newCurvature !== oldCurvature) {
      updatePath(true);
    }
  },
  { flush: "post" },
);

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>

<style lang="scss" scoped></style>
