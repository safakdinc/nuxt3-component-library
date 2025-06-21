<template>
  <button
    @click="emits('handleClick')"
    class="tooltip group flex justify-center items-center"
  >
    <div
      @pointerenter="
        () => {
          showTooltip = true;
        }
      "
      @pointerleave="
        () => {
          showTooltip = false;
        }
      "
      class="group-hover:text-[var(--secondary)] transition-colors duration-300"
    >
      <slot></slot>
    </div>

    <span
      class="tooltiptext"
      :style="{ '--tooltipBackground': props.tooltipBackground }"
      >{{ text }}</span
    >
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "tooltip",
  },
  tooltipBackground: {
    type: String,
    default: "black",
  },
});
const emits = defineEmits(["handleClick"]);
const showTooltip = ref(false);
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}

.tooltip {
  position: relative;
  cursor: pointer;
  &:hover {
    .tooltiptext {
      opacity: 1;
    }
  }
  .tooltiptext {
    padding: 0.5em;
    background-color: var(--tooltipBackground);
    pointer-events: none;
    text-align: center;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    right: 150%;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    &::after {
      content: "";
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(50%, -50%);
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent black;
    }
  }
}
</style>
