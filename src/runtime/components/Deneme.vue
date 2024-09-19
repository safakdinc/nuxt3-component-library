<template>
  <GlobeContainer>
    <GlobeItem
      :class="'overflow-hidden  w-[18vw] h-auto flex flex-col gap-[8px] transition-all duration-300 hover:opacity-70'"
      :positions="{ x: -1, y: 0, z: -0.1 }"
    >
      <div class="w-full text-center overflow-hidden">
        Lorem ipsum dolor sit amet.
      </div>
    </GlobeItem>
    <GlobeItem
      :class="'overflow-hidden  w-[18vw] h-auto flex flex-col gap-[8px] transition-all duration-300 hover:opacity-70'"
      :positions="{ x: 1, y: 0, z: -0.1 }"
    >
      <div class="w-full text-center overflow-hidden">
        Lorem ipsum dolor sit amet.
      </div></GlobeItem
    >
    <GlobeItem
      :class="'overflow-hidden  w-[18vw] h-auto flex flex-col gap-[8px] transition-all duration-300 hover:opacity-70'"
      :positions="{ x: 0, y: 0.5, z: -1 }"
    >
      <div class="w-full text-center overflow-hidden">
        Lorem ipsum dolor sit amet.
      </div></GlobeItem
    >
  </GlobeContainer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
