<template>
  <div class="main p-2" :style="{ '--cols': props.cols, '--rows': props.rows }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  cols: {
    type: Number,
    default: 12
  },
  rows: {
    type: Number,
    default: 1
  }
});
</script>

<style lang="scss" scoped>
.main {
  --cols: 12;
  --rows: 1;
  display: grid;
  grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
}
</style>
