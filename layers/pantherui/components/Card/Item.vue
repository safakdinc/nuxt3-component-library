<template>
  <div class="w-fit" :class="{ shadow: isHovered && boxShadow }" :style="styleObject">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const props = defineProps({
  translateZ: {
    type: Number,
    default: 30
  },
  boxShadow: {
    type: Boolean,
    default: false
  }
});
const isHovered = inject('isHovered');
const styleObject = computed(() => ({
  transform: isHovered.value ? `translateZ(${props.translateZ}px)` : 'translateZ(0px)',
  transition: 'all 0.4s ease' // Apply transition to transform property
}));
</script>

<style lang="scss" scoped>
.shadow {
  perspective: 1000px;
  transform-style: preserve-3d;
  box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 1);
}
</style>
