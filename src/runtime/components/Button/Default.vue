<template>
  <button v-wave class="px-[16px] py-[8px] rounded-lg button cursor-pointer h-fit" @click="emits('handleClick')">
    <slot></slot>
  </button>
</template>

<script setup>
const emits = defineEmits(['handleClick']);
</script>

<style lang="scss" scoped>
.button {
  transition: scale 0.3s ease-in-out;
  &:hover {
    scale: 1.1;
  }
}
</style>
