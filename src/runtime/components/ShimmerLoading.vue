<template>
  <div class="main" :style="{ '--background': props.background, '--shimmer': props.shimmer }">
    <div class="shimmer"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  background: {
    type: String,
    default: '#c2c2c2'
  },
  shimmer: {
    type: String,
    default: '#ffffff'
  }
});
</script>

<style lang="scss" scoped>
.main {
  --background: #c2c2c2;
  --shimmer: #ffffff;
  background-color: var(--background);
  position: relative;
  overflow: hidden;
}

.shimmer {
  transition: all 4s ease;
  position: absolute;
  width: 200%;
  height: 200%;
  border-radius: initial;
  left: 0;
  top: 0;
  transform: translateX(-100%) translateY(-100%);
  animation: shimmer 2s infinite ease;
  mask-image: linear-gradient(-45deg, transparent 30%, rgba(0, 0, 0, 1) 70%, transparent 100%);
  background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0) 40%, var(--shimmer) 50%, rgba(255, 255, 255, 0) 60%);
}
@keyframes shimmer {
  from {
    transform: translateX(-100%) translateY(-100%);
  }
  to {
    transform: translateX(100%) translateY(100%);
  }
}
</style>
