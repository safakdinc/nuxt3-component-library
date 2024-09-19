<template>
  <div
    ref="wrapper"
    class="w-52 h-52 wrapper rounded-xl overflow-hidden relative"
    @mouseenter="handleMouseEnter"
    :style="{ '--position': direction }"
  >
    <div
      class="image rounded-xl absolute top-0 left-0 w-full h-full"
      :style="{ backgroundImage: `url('${props.img}')` }"
    ></div>
    <div class="content w-full h-full relative">
      <div
        class="absolute top-0 left-0 w-full h-full bg-black opacity-30"
      ></div>
      <div class="absolute top-0 left-0 w-full h-full flex items-end p-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  img: {
    type: String,
    default: "",
  },
});

const direction = ref("left");

function handleMouseEnter() {
  const { left, top, width, height } = event.target.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;

  const xPercentage = (x / width) * 100;
  const yPercentage = (y / height) * 100;

  let dir;
  if (xPercentage < yPercentage) {
    dir = xPercentage < 100 - yPercentage ? "left" : "bottom";
  } else {
    dir = xPercentage < 100 - yPercentage ? "top" : "right";
  }
  direction.value = dir;
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  &:hover {
    .image {
      background-position: var(--position);
    }
    .content {
      opacity: 1;
    }
  }
}
.content {
  transition: all 0.3s ease;
  opacity: 0;
}

.image {
  transition: all 0.3s ease;
  background-size: 115% 115%;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}
</style>
