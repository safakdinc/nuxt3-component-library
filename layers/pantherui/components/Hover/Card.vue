<template>
  <div class="card" ref="card">
    <div class="card-border" :style="{ opacity: isHovered ? '1' : '0' }"></div>
    <div class="card-content" :class="props.class">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  class: String
});

const card = ref();
const clientX = inject('clientX');
const clientY = inject('clientY');

watch(clientX, newVal => {
  let rect = card.value.getBoundingClientRect();
  let mouseX = newVal - rect.left;
  card.value.style.setProperty('--mouse-x', `${mouseX}px`);
});
watch(clientY, newVal => {
  let rect = card.value.getBoundingClientRect();
  let mouseY = newVal - rect.top;
  card.value.style.setProperty('--mouse-y', `${mouseY}px`);
});

const isHovered = inject('isHovered');
</script>

<style lang="scss" scoped>
.card {
  --mouse-x: 0px;
  --mouse-y: 0px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  position: relative;
  padding: 2px;
  &:hover::before {
    opacity: 1;
  }
  &::before {
    pointer-events: none;
    opacity: 0;
    transition: all 0.4s ease;
    background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%);
    border-radius: inherit;
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
}

.card-content {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: relative;
  z-index: 2;
}
.card-border {
  opacity: 0;
  transition: all 0.4s ease;
  background: radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%);
  border-radius: inherit;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
