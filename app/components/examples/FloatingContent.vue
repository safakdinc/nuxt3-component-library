<template>
  <div class="w-full flex items-center justify-center">
    <FloatingContentContainer class="w-full min-h-[540px]">
      <FloatingContentItem v-for="(item, index) in items" :key="index" :positions="item.positions" :class="item.class">
        <div class="flex flex-col gap-[8px] justify-end p-4 bg-[var(--background-fade)] bg-opacity-50 rounded-3xl">
          <img :src="item.img" class="w-full flex-1 object-cover rounded-lg object-center" />
          <TextMd class="text-white text-lg font-bold">{{ item.title }}</TextMd>
          <p class="text-gray-300 text-sm">{{ item.description }}</p>
        </div>
      </FloatingContentItem>
    </FloatingContentContainer>
  </div>
</template>

<script setup>
const getRandomImage = () => `https://picsum.photos/318/200?random=${Math.random()}`;

const items = [
  {
    title: 'Full Genome Sequencing',
    img: getRandomImage(),
    description: 'Unlock your genetic blueprint',
    positions: { x: 1, y: 0.8, z: -0.7 },
    class: 'w-72 relative scale-[0.8]'
  },
  {
    title: 'Personalized Medicine',
    img: getRandomImage(),
    description: 'Tailored treatments based on your DNA',
    positions: { x: -1, y: 0.8, z: -0.7 },
    class: 'w-72 relative scale-[0.8]'
  },
  {
    title: 'Genetic Counseling',
    img: getRandomImage(),
    description: 'Expert guidance for your genetic journey',
    positions: { x: 1, y: -0.8, z: -0.5 },
    class: 'w-72 relative scale-[0.8]'
  },
  {
    title: 'DNA Analysis',
    img: getRandomImage(),
    description: 'Uncover your genetic predispositions',
    positions: { x: -1, y: -0.8, z: -0.5 },
    class: 'w-72 relative scale-[0.8]'
  },
  {
    title: 'Nutrigenomics',
    img: getRandomImage(),
    description: 'Optimize your diet with genetic insights',
    positions: { x: 0, y: 0, z: -1 },
    class: 'w-72 relative scale-[0.8]'
  }
];
</script>
