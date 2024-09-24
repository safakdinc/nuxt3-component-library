<template>
  <div class="wrapper rounded-xl">
    <input @input="emits('handleInput')" :type="props.type" class="w-full" />
    <span class="span">{{ props.label }}</span>
    <div :style="{ '--background': props.underlineColor }" class="underline"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  type: {
    default: 'text',
    type: String
  },
  underlineColor: {
    type: String,
    default: 'aliceblue'
  }
});
const emits = defineEmits(['handleInput']);
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}
input {
  padding: 4px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  background-color: transparent;

  &::placeholder {
    transform: all 0.2s ease-in;
    opacity: 0;
  }
  &:focus::placeholder {
    opacity: 1;
  }
  &:focus ~ .span {
    top: -1.2rem;
    font-size: 12px;
  }
  &:focus ~ .underline::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}

.span {
  padding: 4px 0px 4px 0;
  display: flex;
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 3px;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in;
}
.underline {
  position: relative;
  height: 0.12rem;
  width: 100%;
  background-color: gray;
  border-radius: 9999px;
  overflow: hidden;
  &::after {
    content: '';
    display: block;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.2s ease-in;
    background: var(--background);
  }
}
</style>
