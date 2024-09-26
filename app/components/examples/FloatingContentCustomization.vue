<template>
  <div class="w-full flex items-center justify-center">
    <FloatingContContainer class="w-full min-h-[540px]" :horizontalMoveMultiplier="4" :verticalMoveMultiplier="3">
      <FloatingContItem v-for="(item, index) in customizedItems" :key="index" :positions="item.positions" :class="item.class">
        <div class="flex flex-col gap-[8px] justify-end p-4 bg-[var(--background-fade)] bg-opacity-50 rounded-3xl">
          <img :src="item.img" class="w-full flex-1 object-cover rounded-lg object-center" />
          <TextMd class="text-white text-lg font-bold">{{ item.title }}</TextMd>
          <p class="text-gray-300 text-sm">{{ item.description }}</p>
        </div>
      </FloatingContItem>
    </FloatingContContainer>
  </div>
</template>

<script setup>
const getCustomImage = id => `https://picsum.photos/318/200?random=${id}`;

const customizedItems = [
  {
    title: 'Advanced Genomics Research',
    img: getCustomImage(1),
    description: 'Discover the future of genetics',
    positions: { x: 1.2, y: 0.9, z: -0.1 },
    class: 'w-64 relative scale-[0.9]'
  },
  {
    title: 'Tailored Nutrition Plans',
    img: getCustomImage(2),
    description: 'Optimize your health with genetic-based diets',
    positions: { x: -1.2, y: 0.7, z: 0.2 },
    class: 'w-64 relative scale-[0.9]'
  },
  {
    title: 'Preventative Health Screening',
    img: getCustomImage(3),
    description: 'Proactive health management through DNA insights',
    positions: { x: 0.9, y: -0.9, z: 0.3 },
    class: 'w-64 relative scale-[0.9]'
  },
  {
    title: 'Pharmacogenomics',
    img: getCustomImage(4),
    description: 'Personalized drug treatments based on your genes',
    positions: { x: -0.9, y: -0.7, z: -0.2 },
    class: 'w-64 relative scale-[0.9]'
  },
  {
    title: 'Ancestry Analysis',
    img: getCustomImage(5),
    description: 'Trace your roots with precision DNA analysis',
    positions: { x: 0, y: 0, z: -1.2 },
    class: 'w-64 relative scale-[0.9]'
  }
];
</script>
