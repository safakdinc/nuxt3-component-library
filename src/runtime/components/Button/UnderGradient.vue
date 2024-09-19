<template>
  <button
    @click="emits('handleClick')"
    :style="{ background: props.borderColor }"
    class="no-underline h-fit w-auto group cursor-pointer relative rounded-full p-px text-xs font-semibold leading-6 text-white inline-block h-fit">
    <div
      v-wave
      :class="props.class"
      :style="{ background: props.background }"
      class="relative flex items-center z-10 rounded-[inherit] py-0.5 px-4 ring-1 ring-white/10 w-auto">
      <slot></slot>
    </div>
    <span
      class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
  </button>
</template>

<script setup>
const props = defineProps({
  borderColor: {
    type: String,
    default: 'rgb(30 ,41, 59)'
  },
  background: {
    type: String,
    default: 'black'
  },
  class: String
});
const emits = defineEmits(['handleClick']);
</script>

<style lang="scss" scoped></style>
