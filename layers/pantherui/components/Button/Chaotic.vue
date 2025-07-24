<template>
  <div @click="emits('handleClick')" class="rounded-lg p-[2px] relative main cursor-pointer h-fit">
    <div class="background rounded-[inherit]"></div>
    <div class="blur rounded-[inherit]"></div>
    <button :class="props.class" class="button rounded-[inherit] z-[1] px-[16px] py-[8px]">
      <slot></slot>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  class: String,
});
const emits = defineEmits(["handleClick"]);
</script>

<style lang="scss" scoped>
.main {
  &:hover .blur {
    height: 60%;
  }
}

.button {
  background-color: rgb(32, 32, 32);
  box-shadow: inset 0px 0px 15px 0px rgba(0, 0, 0, 0.75);
}
.background {
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: -100% 0%;
  animation: gradient 15s infinite linear;
  background-size: 200% 100%;
  background-image: linear-gradient(
    90deg,
    rgba(238, 102, 74, 1) 0%,
    rgba(238, 200, 74, 1) 15%,
    rgba(201, 238, 74, 1) 30%,
    rgba(74, 223, 201, 1) 45%,
    rgba(84, 155, 254, 1) 60%,
    rgba(245, 133, 195, 1) 75%,
    rgba(252, 57, 143, 1) 90%,
    rgba(238, 102, 74, 1) 100%
  );
  mask-image: linear-gradient(180deg, transparent 30%, rgba(0, 0, 0, 1) 100%);
}
.blur {
  transition: all 0.3s ease;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 5%;
  width: 90%;
  height: 45%;
  background-position: -100% 0%;
  animation: gradient 15s infinite linear;
  background-size: 200% 100%;
  background-image: linear-gradient(
    90deg,
    rgba(238, 102, 74, 1) 0%,
    rgba(238, 200, 74, 1) 15%,
    rgba(201, 238, 74, 1) 30%,
    rgba(74, 223, 201, 1) 45%,
    rgba(84, 155, 254, 1) 60%,
    rgba(245, 133, 195, 1) 75%,
    rgba(252, 57, 143, 1) 90%,
    rgba(238, 102, 74, 1) 100%
  );
}

@keyframes gradient {
  from {
    background-position: 100%;
  }
  to {
    background-position: -100%;
  }
}
</style>
