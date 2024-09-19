<template>
  <button
    v-wave
    :class="props.classs"
    class="px-[16px] py-[8px] rounded-lg button cursor-pointer relative h-fit"
    @click="emits('handleClick')"
    :style="{ '--color': props.underlineColor }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  underlineColor: {
    type: String,
    default: "rgb(255, 255, 255)",
  },
  classs: String,
});
const emits = defineEmits(["handleClick"]);
</script>

<style lang="scss" scoped>
.button {
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
    height: 2px;
    width: 100%;
    background-color: var(--color);
    transform: scaleX(0);
    transform-origin: bottom right;
  }
  &:hover::after {
    transform: scaleX(100%);
    transform-origin: bottom left;
  }
}
</style>
