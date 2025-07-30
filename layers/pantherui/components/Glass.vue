<template>
  <div
    class="rounded-lg"
    :style="{ backdropFilter: `blur(${props.blur}px)`, background: props.background }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  background: {
    type: String,
    default: "rgba(0,0,0,0.2)",
  },
  blur: {
    type: Number,
    default: 10,
  },
});
</script>

<style lang="scss" scoped></style>
