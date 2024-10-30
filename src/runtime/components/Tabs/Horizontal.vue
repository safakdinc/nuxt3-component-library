<template>
  <div :class="twMerge('flex relative main gap-[4px]', props.class)" :style="{ '--background': props.background }" ref="main">
    <button
      v-for="(item, index) in tabs"
      :class="twMerge('cursor-pointer px-[16px] py-[8px] rounded-lg link', props.tabClass)"
      ref="link"
      @click="handleClick(index)">
      {{ item }}
    </button>
  </div>
</template>

<script setup>
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: ['Tab 1', 'Tab 2']
  },
  background: {
    type: String,
    default: 'aliceblue'
  },
  class: String,
  tabClass: String
});

const emits = defineEmits(['handleClick']);
const link = ref();
const main = ref();
const active_el = ref(props.active);

watch(
  () => props.active,
  newVal => {
    active_el.value = newVal;
  }
);

watch(active_el, newVal => {
  active_el.value = newVal;
  drawUnderline();
});

onMounted(() => {
  drawUnderline();
});

function drawUnderline() {
  let element = link.value[active_el.value];
  let width = element.offsetWidth;
  let element_left = element.getBoundingClientRect().left;
  let main_left = main.value.getBoundingClientRect().left;
  main.value.style.setProperty('--left', `${element_left - main_left}px`);
  main.value.style.setProperty('--width', `${width}px`);
}

function handleClick(index) {
  active_el.value = index;
  emits('handleClick', index);
}
</script>

<style lang="scss" scoped>
.main {
  --left: 0px;
  --width: 0px;
  transition: all 0.4s ease;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 100vh;
    background-color: gray;
  }
  &::after {
    content: '';
    transition: all 0.4s ease;
    position: absolute;
    bottom: 0;
    left: var(--left);
    width: var(--width);
    height: 2px;
    border-radius: 100vh;
    background: var(--background);
  }
}
</style>
