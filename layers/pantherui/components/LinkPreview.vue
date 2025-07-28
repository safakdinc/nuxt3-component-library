<template>
  <NuxtLink :to="props.url" class="relative cursor-pointer" @mouseenter="preloadImage">
    <div class="absolute bottom-[130%] left-[50%] w-[250px] aspect-[4/2] image">
      <img
        v-if="imageLoaded"
        :src="imageSrc"
        class="w-full h-full rounded-lg object-cover object-top"
        alt="Link preview"
      />
      <div
        v-else
        class="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center
          justify-center"
      >
        <div class="text-gray-400 text-sm">Loading...</div>
      </div>
    </div>
    <div class="link"><slot></slot></div>
  </NuxtLink>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  url: {
    type: String,
    default: "",
    required: true,
  },
  width: {
    type: Number,
    default: 200,
  },
  height: {
    type: Number,
    default: 125,
  },
  quality: {
    type: Number,
    default: 50,
  },
  isStatic: {
    type: Boolean,
    default: false,
  },
  imageSrc: {
    type: String,
    default: "",
  },
});

const imageLoaded = ref(false);
const preloadedImages = new Set();

// Computed property for image source (similar to React example)
const imageSrc = computed(() => {
  if (props.isStatic) {
    return props.imageSrc;
  }

  // Build query parameters object
  const params = {
    url: props.url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": props.width * 3,
    "viewport.height": props.height * 3,
  };

  // Convert params to query string
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  return `https://api.microlink.io/?${queryString}`;
});

// Preload image function
const preloadImage = () => {
  const src = imageSrc.value;

  // Skip if already preloaded
  if (preloadedImages.has(src)) {
    imageLoaded.value = true;
    return;
  }

  // Create new image element for preloading
  const img = new Image();

  img.onload = () => {
    preloadedImages.add(src);
    imageLoaded.value = true;
  };

  img.onerror = () => {
    console.warn("Failed to load preview image:", src);
    imageLoaded.value = false;
  };

  img.src = src;
};

onMounted(() => {
  // Preload image on component mount
  if (props.imageSrc) {
    preloadImage();
  }
});
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
