<template>
  <div class="custom-card" ref="card" :style="cardStyles">
    <div class="custom-card-border" :style="borderStyles"></div>
    <div class="custom-card-content" :class="props.class">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface CustomizationProps {
  borderIntensity?: number;
  glowIntensity?: number;
  borderColor?: string;
  glowColor?: string;
  animationSpeed?: number;
  borderRadius?: number;
  effectSize?: number;
  effectType?: "radial" | "linear" | "spotlight";
}

export interface Props {
  class?: string;
  customization?: CustomizationProps;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  customization: () => ({
    borderIntensity: 0.4,
    glowIntensity: 0.06,
    borderColor: "white",
    glowColor: "white",
    animationSpeed: 0.4,
    borderRadius: 10,
    effectSize: 500,
    effectType: "radial",
  }),
});

const card = ref<HTMLElement>();
const clientX = inject<Ref<number>>("clientX");
const clientY = inject<Ref<number>>("clientY");
const isHovered = inject<Ref<boolean>>("isHovered");

// Color mappings
const colorMap: Record<string, string> = {
  white: "255, 255, 255",
  blue: "59, 130, 246",
  purple: "147, 51, 234",
  green: "34, 197, 94",
  red: "239, 68, 68",
  gold: "245, 158, 11",
};

// Computed styles
const cardStyles = computed(() => ({
  "--border-radius": `${props.customization.borderRadius || 10}px`,
  "--animation-speed": `${props.customization.animationSpeed || 0.4}s`,
}));

const borderStyles = computed(() => {
  const borderColor = colorMap[props.customization.borderColor || "white"] || colorMap.white;
  const glowColor = colorMap[props.customization.glowColor || "white"] || colorMap.white;
  const opacity = isHovered?.value ? props.customization.borderIntensity || 0.4 : 0;

  let gradient = "";

  switch (props.customization.effectType || "radial") {
    case "radial":
      gradient = `radial-gradient(${props.customization.effectSize || 500}px circle at var(--mouse-x) var(--mouse-y), rgba(${borderColor}, ${props.customization.borderIntensity || 0.4}), transparent 40%)`;
      break;
    case "linear":
      gradient = `linear-gradient(45deg, rgba(${borderColor}, ${props.customization.borderIntensity || 0.4}) 0%, transparent 50%, rgba(${borderColor}, ${props.customization.borderIntensity || 0.4}) 100%)`;
      break;
    case "spotlight":
      gradient = `radial-gradient(${(props.customization.effectSize || 500) * 0.6}px circle at var(--mouse-x) var(--mouse-y), rgba(${borderColor}, ${props.customization.borderIntensity || 0.4}), rgba(${borderColor}, ${(props.customization.borderIntensity || 0.4) * 0.3}) 60%, transparent 80%)`;
      break;
  }

  return {
    opacity,
    background: gradient,
    transition: `all ${props.customization.animationSpeed || 0.4}s ease`,
  };
});

const glowStyles = computed(() => {
  const glowColor = colorMap[props.customization.glowColor || "white"] || colorMap.white;

  let gradient = "";

  switch (props.customization.effectType || "radial") {
    case "radial":
      gradient = `radial-gradient(${(props.customization.effectSize || 500) * 1.2}px circle at var(--mouse-x) var(--mouse-y), rgba(${glowColor}, ${props.customization.glowIntensity || 0.06}), transparent 40%)`;
      break;
    case "linear":
      gradient = `linear-gradient(45deg, rgba(${glowColor}, ${props.customization.glowIntensity || 0.06}) 0%, transparent 50%, rgba(${glowColor}, ${props.customization.glowIntensity || 0.06}) 100%)`;
      break;
    case "spotlight":
      gradient = `radial-gradient(${props.customization.effectSize || 500}px circle at var(--mouse-x) var(--mouse-y), rgba(${glowColor}, ${props.customization.glowIntensity || 0.06}), transparent 40%)`;
      break;
  }

  return gradient;
});

// Mouse tracking
watch(
  clientX,
  (newVal) => {
    if (card.value && newVal !== undefined) {
      let rect = card.value.getBoundingClientRect();
      let mouseX = newVal - rect.left;
      card.value.style.setProperty("--mouse-x", `${mouseX}px`);
    }
  },
  { immediate: false },
);

watch(
  clientY,
  (newVal) => {
    if (card.value && newVal !== undefined) {
      let rect = card.value.getBoundingClientRect();
      let mouseY = newVal - rect.top;
      card.value.style.setProperty("--mouse-y", `${mouseY}px`);
    }
  },
  { immediate: false },
);
</script>

<style lang="scss" scoped>
.custom-card {
  --mouse-x: 0px;
  --mouse-y: 0px;
  --border-radius: 10px;
  --animation-speed: 0.4s;

  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  position: relative;
  padding: 2px;

  &:hover::before {
    opacity: 1;
  }

  &::before {
    pointer-events: none;
    opacity: 0;
    transition: all var(--animation-speed) ease;
    background: v-bind(glowStyles);
    border-radius: inherit;
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
}

.custom-card-content {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: relative;
  z-index: 2;
}

.custom-card-border {
  border-radius: inherit;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
