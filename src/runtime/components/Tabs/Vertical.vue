<template>
  <div class="flex flex-col relative main" :style="{ '--background': props.background }" ref="main">
    <div
      v-wave
      v-for="(item, index) in tabs"
      class="cursor-pointer px-[16px] py-[8px] rounded-lg link"
      :class="props.class"
      ref="link"
      @click="handleClick(index)">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
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
  class: {
    type: String,
    default: ''
  }
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
  let height = element.offsetHeight;
  let element_top = element.getBoundingClientRect().top;
  let main_top = main.value.getBoundingClientRect().top;
  main.value.style.setProperty('--top', `${element_top - main_top}px`);
  main.value.style.setProperty('--height', `${height}px`);
}

function handleClick(index) {
  active_el.value = index;
  emits('handleClick', index);
}
</script>

<style lang="scss" scoped>
.main {
  --top: 0px;
  --height: 0px;
  transition: all 0.4s ease;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2px;
    height: 100%;
    border-radius: 100vh;
    background-color: gray;
  }
  &::after {
    content: '';
    transition: all 0.4s ease;
    position: absolute;
    top: var(--top);
    left: 0;
    width: 2px;
    height: var(--height);
    border-radius: 100vh;
    background: var(--background);
  }
}
</style>
