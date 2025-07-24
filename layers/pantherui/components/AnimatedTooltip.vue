<template>
  <div
    :class="twMerge('main rounded-full cursor-pointer relative group', props.class)"
    @mousemove="mouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="absolute left-[50%] translate-x-[-50%] p-3 pointer-events-none group-hover:opacity-100
        opacity-0 transition-all duration-300 ease-in-out scale-0 group-hover:scale-100"
      :style="{
        bottom: `calc(100% + ${props.offset}px)`,
      }"
    >
      <div class="tooltip py-[4px]" ref="tooltip">
        <div
          class="tooltip-underline"
          :style="{
            '--underlineColor': props.underlineColor,
          }"
        ></div>
        <slot name="tooltip"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { twMerge } from "tailwind-merge";

const props = defineProps({
  class: String,
  offset: {
    type: Number,
    default: 0,
  },
  underlineColor: {
    type: String,
    default: "rgb(65, 228, 181)",
  },
});

const isHovered = ref(false);
const tooltip = ref();

function mouseMove() {
  const x = event.offsetX;
  const halfWidth = event.target.offsetWidth / 2;
  let maxRotate = 15;
  let ratio = (x - halfWidth) / halfWidth;
  tooltip.value.style.setProperty("--rotate", maxRotate * ratio + "deg");
  tooltip.value.style.setProperty("--translateX", (x - halfWidth) / 2 + "px");
}

function handleMouseEnter() {
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
}
</script>

<style lang="scss" scoped>
.main {
  --transition: cubic-bezier(0.38, 0.83, 0.48, 2);
}
.tooltip {
  --rotate: 0deg;
  --translateX: 0px;
  transition: all 0.4s var(--transition);
  transform: rotate(var(--rotate)) translateX(var(--translateX));
  position: relative;
  & .tooltip-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--underlineColor);
    background: linear-gradient(
      90deg,
      rgba(22, 219, 179, 0) 0%,
      var(--underlineColor) 50%,
      rgba(145, 66, 222, 0) 100%
    );
  }
}

.tooltip-enter-active,
.tooltip-leave-active {
}
.tooltip-enter-from,
.tooltip-leave-to {
  transform: translateY(50%) translateX(-50%) scale(0.4);
  opacity: 1;
}
.tooltip-enter-to,
.tooltip-leave-from {
  transform: translateY(0) translateX(-50%) scale(1);
  opacity: 1;
  pointer-events: none;
}
</style>
