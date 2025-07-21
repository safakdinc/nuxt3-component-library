<template>
  <div class="w-full justify-center flex p-[16px] md:p-[64px]">
    <div class="flex justify-around flex-wrap gap-[20px] w-full max-w-[320px]">
      <ThreeDPin v-for="(pin, index) in pins" :key="index">
        <template #pin>
          <a
            class="no-underline h-fit w-auto group cursor-pointer relative rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
            href="#">
            <div class="relative flex items-center z-10 rounded-[inherit] py-0.5 px-4 ring-1 ring-white/10 w-auto">3D Pin</div>
            <span
              class="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </a>
        </template>
        <div
          class="w-full h-[384px] border rounded-lg flex flex-col gap-[16px] py-[16px] px-[24px]"
          style="background-color: var(--background-fade)">
          <div class="text-[16px] xl:text-[18px] 2xl:text-[20px]">Deneme UI</div class="text-[16px] xl:text-[18px] 2xl:text-[20px]">
          <div  class="text-[var(--text-gray)] text-[16px] xl:text-[18px] 2xl:text-[20px]">Customizable Tailwind CSS and GSAP Components.</div>
        </div>
      </ThreeDPin>
    </div>
  </div>
</template>

<script setup>
const pins = ref([
  {
    icon: '/path/to/icon1.svg',
    title: 'Location A',
    description: 'This is a description for Location A.'
  }
]);
</script>

<style scoped></style>
