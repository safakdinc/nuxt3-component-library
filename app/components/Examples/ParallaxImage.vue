<template>
  <div class="w-full flex flex-wrap justify-center p-[16px] md:p-[64px]">
    <div class="w-full flex justify-center font-bold">Scroll down for parallax effect</div>
    <div class="h-[40vh] w-full"></div>
    <ParallaxImage
      class="w-full md:w-1/2 aspect-square"
      :trigger-element="'.preview'"
      src="https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg"
    ></ParallaxImage>
    <div class="h-[40vh] w-full"></div>
  </div>
</template>
<style scoped></style>
