<template>
  <div class="flex-1 flex items-center justify-center min-h-full px-[120px]">
    <div ref="container" class="w-full flex flex-col h-full items-center justify-center relative">
      <AnimatedBeam :container="container" :from="div2" :to="div3" :curvature="-240" class=""> </AnimatedBeam>
      <AnimatedBeam :container="container" :from="div2" :to="div1" :reverse="true" :curvature="-40" class=""> </AnimatedBeam>
      <AnimatedBeam :container="container" :from="div3" :to="div1" :reverse="true" :curvature="-40" class=""> </AnimatedBeam>
      <div class="w-full flex justify-center">
        <div ref="div1" class="w-10 aspect-square rounded-full bg-blue-400"></div>
      </div>
      <div class="w-full flex justify-between h-fit">
        <div ref="div2" class="w-10 aspect-square rounded-full bg-red-400"></div>
        <div ref="div3" class="w-10 aspect-square rounded-full bg-green-400"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const container = ref();
const div1 = ref();
const div2 = ref();
const div3 = ref();
</script>
