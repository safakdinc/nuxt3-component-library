<template>
  <div>
    <Transition name="sidebar" mode="out-in">
      <div
        v-if="props.open"
        class="fixed top-0 left-0 h-full bg-black z-[1001] width"
        :style="{
          '--defaultWidth': props.defaultWidth,
          '--sm': props.sm,
          '--md': props.md,
          '--lg': props.lg,
          '--xl': props.xl,
          '--xxl': props.xxl
        }">
        <slot></slot>
      </div>
    </Transition>
    <Transition name="background" mode="out-in">
      <div v-if="props.open" class="fixed top-0 left-0 w-full h-full z-[1000]" @click="close">
        <div class="w-full h-full bg-black opacity-40"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  defaultWidth: {
    type: String,
    default: '80%'
  },
  sm: {
    type: String,
    default: '300px'
  },
  md: {
    type: String,
    default: '300px'
  },
  lg: {
    type: String,
    default: '300px'
  },
  xl: {
    type: String,
    default: '300px'
  },
  xxl: {
    type: String,
    default: '300px'
  }
});

const emits = defineEmits(['handleClose']);

function close() {
  emits('handleClose');
}
</script>

<style lang="scss" scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0);
}

.background-enter-active,
.background-leave-active {
  transition: all 0.3s ease;
}
.background-enter-from,
.background-leave-to {
  opacity: 0;
}
.background-enter-to,
.background-leave-from {
  opacity: 1;
}

.width {
  border-radius: 0px 15px 15px 0px;
  width: var(--defaultWidth);
}

@media (min-width: 640px) {
  .width {
    width: var(--sm);
  }
}

@media (min-width: 768px) {
  .width {
    width: var(--md);
  }
}

@media (min-width: 1024px) {
  .width {
    width: var(--lg);
  }
}
@media (min-width: 1280px) {
  .width {
    width: var(--xl);
  }
}

@media (min-width: 1536px) {
  .width {
    width: var(--xxl);
  }
}
</style>
