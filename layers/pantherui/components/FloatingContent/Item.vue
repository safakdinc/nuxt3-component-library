<template>
  <div class="globe-item absolute hidden">
    <div
      :class="props.class"
      class="relative item"
      :data-initial-x="props.positions.x"
      :data-initial-y="props.positions.y"
      :data-initial-z="props.positions.z"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  class: String,
  positions: {
    type: Object,
    default: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
});
</script>

<style lang="scss" scoped></style>
