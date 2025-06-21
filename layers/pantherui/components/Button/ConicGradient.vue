<template>
  <button @click="emits('handleClick')" class="w-fit h-fit rounded-lg flex conic-border" style="color: var(--text-color)">
    <div class="background z-[-1]"></div>
    <div
      :class="props.class"
      class="w-fit h-fit flex gap-3 rounded-[inherit] px-[16px] py-[8px] z-10"
      :style="{ 'background-color': props.backgroundColor }">
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'black'
  },
  class: {
    type: String,
    default: ''
  }
});
const emits = defineEmits(['handleClick']);
</script>

<style scoped>
.conic-border {
  position: relative;
  cursor: pointer;
  --width: 2px;
  --d: 5s; /* animation duration */
  --s: 1;
}
.background {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  background-image: conic-gradient(from var(--a), transparent, #08f, #f03 50%, transparent);
  --_a: ;
  animation: border linear infinite calc(var(--d) / var(--s));
  animation-play-state: running;
  background-size: 100% 100%;
  border-radius: inherit;
  width: calc(100% + var(--width));
  height: calc(100% + var(--width));
  translate: -50% -50%;
  scale: 1 1;
  transition: scale 500ms linear;
}
.conic-border:hover {
  --width: 2px;
}
.conic-border:hover .background {
  /*   scale: 1.025 1.1; */
  animation-play-state: running;
}

@property --a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes border {
  0% {
    --a: 0deg;
  }
  100% {
    --a: 360deg;
  }
}
</style>
