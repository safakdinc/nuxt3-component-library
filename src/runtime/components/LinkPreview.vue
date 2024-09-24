<template>
  <NuxtLink :to="props.url" class="relative cursor-pointer">
    <div class="absolute bottom-[130%] left-[50%] w-[250px] aspect-[4/2] image">
      <img :src="getPreview()" class="w-full h-full rounded-lg object-cover object-top" />
    </div>
    <div class="link"><slot></slot></div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    default: 'https://astrilya.com'
  },
  width: {
    type: Number,
    default: 1200
  },
  height: {
    type: Number,
    default: 1200
  }
});
function getPreview() {
  return `https://api.microlink.io/?url=${props.url}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.width=${props.width}&viewport.height=${props.height}`;
}
</script>

<style lang="scss" scoped>
.relative {
  &:hover .image {
    transform: rotateX(0deg) translateX(-50%);
  }
}

.image {
  transform-style: preserve-3d;
  transform-origin: bottom;
  transform: rotateX(90deg) translateX(-50%);
  transition: transform 0.5s;
}
</style>
