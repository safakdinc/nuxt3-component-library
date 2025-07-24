<template>
  <!-- This component renders nothing but contributes path data to the parent Wrapper -->
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted, onBeforeUnmount, watch, nextTick, type Ref } from "vue";
import gsap from "gsap";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";
import type { BeamData } from "./Wrapper.vue";

// Register GSAP plugin
gsap.registerPlugin(MorphSVGPlugin);

export interface AnimatedBeamLineProps {
  from: HTMLElement;
  to: HTMLElement;
  curvature?: number;
  curvatureX?: number;
  curvatureY?: number;
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

const props = withDefaults(defineProps<AnimatedBeamLineProps>(), {
  curvature: 0,
  curvatureX: undefined,
  curvatureY: undefined,
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

// Inject methods from parent Wrapper
const containerRef = inject<Ref<HTMLElement | undefined>>("animatedBeamContainer");
const registerBeam = inject<(beam: BeamData) => void>("registerBeam");
const unregisterBeam = inject<(beamId: string) => void>("unregisterBeam");
const updateBeam = inject<(beamId: string, updates: Partial<BeamData>) => void>("updateBeam");
const updateSvgDimensions = inject<() => void>("updateSvgDimensions");

const beamId = `beam-${Math.random().toString(36).substring(2, 10)}`;
const isVertical = ref(false);
const isRightToLeft = ref(false);
const isBottomToTop = ref(false);
const currentPathD = ref("");

// Cache gradient coordinates to prevent recursive updates
const cachedGradientCoords = ref({ useHorizontal: true, isExtremeCurve: false });

// Calculate points along the curve for proper gradient animation
const calculateCurvePoints = () => {
  if (!containerRef?.value || !props.from || !props.to) {
    return { startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 }, controlPoint: { x: 0, y: 0 } };
  }

  const containerRect = containerRef.value.getBoundingClientRect();
  const rectA = props.from.getBoundingClientRect();
  const rectB = props.to.getBoundingClientRect();

  const startX = rectA.left - containerRect.left + rectA.width / 2 + props.startXOffset;
  const startY = rectA.top - containerRect.top + rectA.height / 2 + props.startYOffset;
  const endX = rectB.left - containerRect.left + rectB.width / 2 + props.endXOffset;
  const endY = rectB.top - containerRect.top + rectB.height / 2 + props.endYOffset;

  // Calculate control point
  let controlX: number;
  let controlY: number;

  if (props.curvatureX !== undefined || props.curvatureY !== undefined) {
    controlX = (startX + endX) / 2 + (props.curvatureX ?? 0);
    controlY = (startY + endY) / 2 + (props.curvatureY ?? 0);
  } else {
    if (isVertical.value) {
      controlX = (startX + endX) / 2 + props.curvature;
      controlY = (startY + endY) / 2;
    } else {
      controlX = (startX + endX) / 2;
      controlY = (startY + endY) / 2 - props.curvature;
    }
  }

  return {
    startPoint: { x: startX, y: startY },
    endPoint: { x: endX, y: endY },
    controlPoint: { x: controlX, y: controlY },
  };
};

// Calculate gradient coordinates that follow the curve
const updateGradientCoordinates = () => {
  const { startPoint, endPoint, controlPoint } = calculateCurvePoints();

  // Calculate the total curve length for better gradient positioning
  const curveLength =
    Math.sqrt(
      Math.pow(controlPoint.x - startPoint.x, 2) + Math.pow(controlPoint.y - startPoint.y, 2),
    ) +
    Math.sqrt(Math.pow(endPoint.x - controlPoint.x, 2) + Math.pow(endPoint.y - controlPoint.y, 2));

  // For extreme curvatures, we need to use path-based coordinates instead of linear
  const isExtremeCurve =
    curveLength >
    Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)) *
      1.5;

  if (isExtremeCurve) {
    // For extreme curves, calculate points along the actual path
    const midT = 0.5;
    const midPoint = {
      x:
        (1 - midT) * (1 - midT) * startPoint.x +
        2 * (1 - midT) * midT * controlPoint.x +
        midT * midT * endPoint.x,
      y:
        (1 - midT) * (1 - midT) * startPoint.y +
        2 * (1 - midT) * midT * controlPoint.y +
        midT * midT * endPoint.y,
    };

    // Use the curve's midpoint to determine the primary direction
    const dx = midPoint.x - startPoint.x;
    const dy = midPoint.y - startPoint.y;
    const useHorizontal = Math.abs(dx) > Math.abs(dy);

    cachedGradientCoords.value = { useHorizontal, isExtremeCurve: true };
  } else {
    // For normal curves, use the original logic
    const avgDirection = Math.abs(endPoint.x - startPoint.x) > Math.abs(endPoint.y - startPoint.y);
    cachedGradientCoords.value = { useHorizontal: avgDirection, isExtremeCurve: false };
  }
};

// Computed animation values based on curve shape
const x1 = computed(() => {
  const { useHorizontal, isExtremeCurve } = cachedGradientCoords.value;
  const direction = props.reverse ? !isRightToLeft.value : isRightToLeft.value;

  if (isExtremeCurve) {
    // For extreme curves, use more conservative animation values
    if (useHorizontal) {
      return direction ? "75%; 25%;" : "25%; 125%;";
    } else {
      return "50%; 50%;";
    }
  } else {
    if (useHorizontal) {
      return direction ? "90%; -10%;" : "10%; 110%;";
    } else {
      return "45%; 45%;";
    }
  }
});

const x2 = computed(() => {
  const { useHorizontal, isExtremeCurve } = cachedGradientCoords.value;
  const direction = props.reverse ? !isRightToLeft.value : isRightToLeft.value;

  if (isExtremeCurve) {
    if (useHorizontal) {
      return direction ? "85%; 15%;" : "15%; 115%;";
    } else {
      return "50%; 50%;";
    }
  } else {
    if (useHorizontal) {
      return direction ? "100%; 0%;" : "0%; 100%;";
    } else {
      return "55%; 55%;";
    }
  }
});

const y1 = computed(() => {
  const { useHorizontal, isExtremeCurve } = cachedGradientCoords.value;
  const direction = props.reverse ? !isBottomToTop.value : isBottomToTop.value;

  if (isExtremeCurve) {
    if (!useHorizontal) {
      return direction ? "75%; 25%;" : "25%; 125%;";
    } else {
      return "50%; 50%;";
    }
  } else {
    if (!useHorizontal) {
      return direction ? "90%; -10%;" : "10%; 110%;";
    } else {
      return "45%; 45%;";
    }
  }
});

const y2 = computed(() => {
  const { useHorizontal, isExtremeCurve } = cachedGradientCoords.value;
  const direction = props.reverse ? !isBottomToTop.value : isBottomToTop.value;

  if (isExtremeCurve) {
    if (!useHorizontal) {
      return direction ? "85%; 15%;" : "15%; 115%;";
    } else {
      return "50%; 50%;";
    }
  } else {
    if (!useHorizontal) {
      return direction ? "100%; 0%;" : "0%; 100%;";
    } else {
      return "55%; 55%;";
    }
  }
});

// Create beam data object
const createBeamData = (): BeamData => ({
  id: beamId,
  pathD: currentPathD.value,
  pathColor: props.pathColor,
  pathWidth: props.pathWidth,
  pathOpacity: props.pathOpacity,
  gradientStartColor: props.gradientStartColor,
  gradientStopColor: props.gradientStopColor,
  duration: props.duration,
  delay: props.delay,
  isVertical: isVertical.value,
  x1: x1.value,
  x2: x2.value,
  y1: y1.value,
  y2: y2.value,
});

// Function to calculate the path
const calculatePath = (): string => {
  if (!containerRef?.value || !props.from || !props.to) return "";

  const { startPoint, endPoint, controlPoint } = calculateCurvePoints();

  // Update direction flags
  isVertical.value = Math.abs(endPoint.y - startPoint.y) > Math.abs(endPoint.x - startPoint.x);
  isRightToLeft.value = endPoint.x < startPoint.x;
  isBottomToTop.value = endPoint.y < startPoint.y;

  return `M ${startPoint.x},${startPoint.y} Q ${controlPoint.x},${controlPoint.y} ${endPoint.x},${endPoint.y}`;
};

// Update path and beam data
const updatePath = (animate = false) => {
  const newPath = calculatePath();

  // Update gradient coordinates cache
  updateGradientCoordinates();

  if (animate && currentPathD.value && updateBeam) {
    // For morphing, we'll handle this differently since we don't have direct SVG access
    // We can still update the data and let the wrapper handle the visual updates
    currentPathD.value = newPath;
    updateBeam(beamId, {
      pathD: newPath,
      isVertical: isVertical.value,
      x1: x1.value,
      x2: x2.value,
      y1: y1.value,
      y2: y2.value,
    });
  } else {
    currentPathD.value = newPath;
    if (updateBeam) {
      updateBeam(beamId, {
        pathD: newPath,
        isVertical: isVertical.value,
        x1: x1.value,
        x2: x2.value,
        y1: y1.value,
        y2: y2.value,
      });
    }
  }
};

// Watch for curvature changes and animate
watch(
  [() => props.curvature, () => props.curvatureX, () => props.curvatureY],
  ([newCurvature, newCurvatureX, newCurvatureY], [oldCurvature, oldCurvatureX, oldCurvatureY]) => {
    if (
      (oldCurvature !== undefined && newCurvature !== oldCurvature) ||
      (oldCurvatureX !== undefined && newCurvatureX !== oldCurvatureX) ||
      (oldCurvatureY !== undefined && newCurvatureY !== oldCurvatureY)
    ) {
      updatePath(true);
    }
  },
  { flush: "post" },
);

// Watch for other prop changes
watch(
  [
    () => props.pathColor,
    () => props.pathWidth,
    () => props.pathOpacity,
    () => props.gradientStartColor,
    () => props.gradientStopColor,
    () => props.duration,
    () => props.delay,
    () => props.reverse,
  ],
  () => {
    if (updateBeam) {
      updateBeam(beamId, createBeamData());
    }
  },
  { flush: "post" },
);

// Watch for changes in element refs or container
watch(
  [() => props.from, () => props.to, containerRef],
  () => {
    if (props.from && props.to && containerRef?.value) {
      nextTick(() => {
        updatePath();
      });
    }
  },
  { flush: "post" },
);

eventBus.on("recalculatePaths", () => {
  updatePath();
});

onMounted(() => {
  if (props.from && props.to && containerRef?.value) {
    updatePath();

    if (registerBeam) {
      registerBeam(createBeamData());
    }
  } else {
    // Fallback: try again after a short delay
    setTimeout(() => {
      if (props.from && props.to && containerRef?.value) {
        updatePath();

        if (registerBeam) {
          registerBeam(createBeamData());
        }
      }
    }, 100);
  }
});

onBeforeUnmount(() => {
  if (unregisterBeam) {
    unregisterBeam(beamId);
  }
});
</script>

<style scoped></style>
