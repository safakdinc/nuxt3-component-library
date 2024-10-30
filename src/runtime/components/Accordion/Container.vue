<template>
  <div :class="twMerge('flex flex-col', props.class)">
    <slot></slot>
  </div>
</template>

<script setup>
import { twMerge } from 'tailwind-merge';
import emitter from '../../composables/eventBus';

const props = defineProps({
  openSingle: {
    type: Boolean,
    default: true
  },
  class: String
});

const activeIndex = ref(null);

emitter.on('accordeon', index => {
  activeIndex.value = index;
});

provide('activeIndex', activeIndex);
provide('openSingle', props.openSingle);
</script>

<style lang="scss" scoped></style>
