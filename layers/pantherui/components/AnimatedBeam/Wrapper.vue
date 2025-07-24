<template>
  <ClientOnly>
    <div ref="containerRef" class="relative w-full h-full">
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
        <!-- Render all paths -->
        <template v-for="beam in beams" :key="beam.id">
          <path
            :d="beam.pathD"
            :stroke="beam.pathColor"
            :stroke-width="beam.pathWidth"
            :stroke-opacity="beam.pathOpacity"
            stroke-linecap="round"
          />
          <path
            :d="beam.pathD"
            :stroke-width="beam.pathWidth"
            :stroke="`url(#${beam.id})`"
            stroke-opacity="1"
            stroke-linecap="round"
          />
        </template>

        <!-- Render all gradients -->
        <defs>
          <template v-for="beam in beams" :key="`gradient-${beam.id}`">
            <linearGradient
              :id="beam.id"
              gradientUnits="userSpaceOnUse"
              x1="0%"
              x2="0%"
              y1="0%"
              y2="0%"
            >
              <stop :stop-color="beam.gradientStartColor" stop-opacity="0" />
              <stop :stop-color="beam.gradientStartColor" />
              <stop offset="32.5%" :stop-color="beam.gradientStopColor" />
              <stop offset="100%" :stop-color="beam.gradientStopColor" stop-opacity="0" />

              <!-- Horizontal animations -->
              <animate
                v-if="!beam.isVertical"
                attributeName="x1"
                :values="beam.x1"
                :dur="`${beam.duration}s`"
                :begin="`${beam.delay}s`"
                keyTimes="0; 1"
                keySplines="0.16 1 0.3 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
              <animate
                v-if="!beam.isVertical"
                attributeName="x2"
                :values="beam.x2"
                :dur="`${beam.duration}s`"
                :begin="`${beam.delay}s`"
                keyTimes="0; 1"
                keySplines="0.16 1 0.3 1"
                calcMode="spline"
                repeatCount="indefinite"
              />

              <!-- Vertical animations -->
              <animate
                v-if="beam.isVertical"
                attributeName="y1"
                :values="beam.y1"
                :dur="`${beam.duration}s`"
                :begin="`${beam.delay}s`"
                keyTimes="0; 1"
                keySplines="0.16 1 0.3 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
              <animate
                v-if="beam.isVertical"
                attributeName="y2"
                :values="beam.y2"
                :dur="`${beam.duration}s`"
                :begin="`${beam.delay}s`"
                keyTimes="0; 1"
                keySplines="0.16 1 0.3 1"
                calcMode="spline"
                repeatCount="indefinite"
              />
            </linearGradient>
          </template>
        </defs>
      </svg>

      <!-- Slot for AnimatedBeamLine components -->
      <slot></slot>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { ref, provide, onMounted, onBeforeUnmount, nextTick } from "vue";

export interface AnimatedBeamWrapperProps {
  /**
   * Additional CSS classes to apply to the wrapper container.
   */
  class?: string;
}

export interface BeamData {
  id: string;
  pathD: string;
  pathColor: string;
  pathWidth: number;
  pathOpacity: number;
  gradientStartColor: string;
  gradientStopColor: string;
  duration: number;
  delay: number;
  isVertical: boolean;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
}

const props = withDefaults(defineProps<AnimatedBeamWrapperProps>(), {
  class: "",
});

const containerRef = ref<HTMLElement>();
const svgDimensions = ref({ width: 0, height: 0 });
const beams = ref<BeamData[]>([]);

let resizeObserver: ResizeObserver | undefined = undefined;

// Provide methods for Line components to register/unregister themselves
const registerBeam = (beamData: BeamData) => {
  beams.value.push(beamData);
};

const unregisterBeam = (beamId: string) => {
  const index = beams.value.findIndex((beam) => beam.id === beamId);
  if (index > -1) {
    beams.value.splice(index, 1);
  }
};

const updateBeam = (beamId: string, updates: Partial<BeamData>) => {
  const beam = beams.value.find((b) => b.id === beamId);
  if (beam) {
    Object.assign(beam, updates);
  }
};

const updateSvgDimensions = () => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    svgDimensions.value = {
      width: rect.width,
      height: rect.height,
    };

    // Trigger path recalculation for all Line components
    nextTick(() => {
      eventBus.emit("recalculatePaths");
    });
  }
};

// Provide container reference and beam management methods
provide("animatedBeamContainer", containerRef);
provide("registerBeam", registerBeam);
provide("unregisterBeam", unregisterBeam);
provide("updateBeam", updateBeam);
provide("updateSvgDimensions", updateSvgDimensions);

onMounted(async () => {
  if (containerRef.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(updateSvgDimensions);
    resizeObserver.observe(containerRef.value);
  } else {
    window.addEventListener("resize", updateSvgDimensions);
  }

  nextTick(() => {
    updateSvgDimensions(); // Initial dimensions calculation
  });
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  } else {
    window.removeEventListener("resize", updateSvgDimensions);
  }
});
</script>

<style scoped></style>
