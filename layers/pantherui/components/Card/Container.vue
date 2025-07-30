<template>
  <div
    ref="container"
    class="card"
    @mousemove="mouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  multiplierX: {
    type: Number,
    default: 20,
  },
  multiplierY: {
    type: Number,
    default: 10,
  },
});
const container = ref();
function mouseMove() {
  const x = event.offsetX;
  const y = event.offsetY;
  const width = event.target.offsetWidth / 2;
  const height = event.target.offsetHeight / 2;
  const rotateX = ((x - width) / width) * props.multiplierX;
  const rotateY = ((y - height) / height) * props.multiplierY;
  container.value.style.setProperty("--rotateX", -rotateY + "deg");
  container.value.style.setProperty("--rotateY", rotateX + "deg");
}

const isHovered = ref(false);

function handleMouseEnter() {
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
}

provide("isHovered", isHovered);
</script>

<style lang="scss" scoped>
.card {
  --rotateX: 0deg;
  --rotateY: 0deg;
  --perspective: 1000px;
  transition: all 0.4s ease-out;
  transform-style: preserve-3d;
  perspective: 1000px;
  &:hover {
    transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
  }
}
</style>
