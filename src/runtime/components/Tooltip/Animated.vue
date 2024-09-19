<template>
  <div
    class="rounded-full cursor-pointer relative main"
    @mousemove="mouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Transition name="tooltip">
      <div
        v-if="true"
        class="absolute bottom-[100%] left-[50%] translate-x-[-50%] p-3"
      >
        <div ref="tooltip" class="tooltip py-[4px]">
          <div class="tooltip-underline"></div>
          <slot name="tooltip"></slot>
        </div>
      </div>
    </Transition>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
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

provide("isHovered", isHovered);
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
    background: rgb(22, 219, 179);
    background: linear-gradient(
      90deg,
      rgba(22, 219, 179, 0) 0%,
      rgba(65, 228, 181, 1) 50%,
      rgba(145, 66, 222, 0) 100%
    );
  }
}

.content {
  transition: scale 0.3s ease;
  &:hover {
    scale: 1.15;
  }
}
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.3s var(--transition);
}
.tooltip-enter-from,
.tooltip-leave-to {
  transform: translateY(50%) translateX(-50%) scale(0.4);
  opacity: 0;
}
.tooltip-enter-to,
.tooltip-leave-from {
  transform: translateY(0) translateX(-50%) scale(1);
  opacity: 1;
  pointer-events: none;
}
</style>
