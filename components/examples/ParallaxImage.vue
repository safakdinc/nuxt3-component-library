<template>
  <div class="w-full flex flex-wrap justify-center p-[16px] md:p-[64px]">
    <div class="w-full flex justify-center font-bold">Scroll down for parallax effect</div>
    <div class="h-[40vh] w-full"></div>
    <ParallaxImage
      class="w-full md:w-1/2 aspect-square"
      :trigger-element="'.preview'"
      src="https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></ParallaxImage>
    <div class="h-[40vh] w-full"></div>
  </div>
</template>
<style scoped></style>
