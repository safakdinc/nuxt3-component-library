<template>
  <div class="main" :style="{ '--col-span': props.colSpan, '--row-span': props.rowSpan }">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  colSpan: {
    type: Number,
    default: 1
  },
  rowSpan: {
    type: Number,
    default: 1
  }
});
</script>

<style lang="scss" scoped>
.main {
  --col-span: 1;
  --row-span: 1;
  grid-column: span var(--col-span) / span var(--col-span);
  grid-row: span var(--row-span) / span var(--row-span);
}
</style>
