<template>
  <div class="w-full justify-center flex p-[16px] md:p-[64px]">
    <div class="pins-container">
      <ThreeDPin v-for="(pin, index) in pins" :key="index">
        <template #pin>
          <a href="#"> <ButtonUnderGradient>3D Pin</ButtonUnderGradient> </a>
        </template>
        <div
          class="w-[320px] h-[384px] border rounded-lg flex flex-col gap-[16px] py-[16px] px-[24px]"
          style="background-color: var(--background-fade)">
          <TextMd>Deneme UI</TextMd>
          <TextMd class="text-[var(--text-gray)]">Customizable Tailwind CSS and GSAP Components.</TextMd>
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

<style scoped>
.pins-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.pin-icon {
  width: 24px;
  height: 24px;
}

.card-content {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  width: 200px;
  height: 150px;
}

h2 {
  margin-top: 0;
}
</style>
