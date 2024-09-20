<template>
  <div class="w-full justify-center flex p-[64px]">
    <HoverContainer class="w-full flex flex-wrap gap-[8px]">
      <HoverCard
        v-for="(framework, index) in frameworks"
        :key="index"
        class="aspect-square p-4 flex flex-col items-center justify-center bg-[var(--background-fade)]"
        style="flex: 1 1 max(calc(100% / 4), 150px)">
        <div class="flex-1 flex items-center justify-center">
          <img :src="framework.img" :alt="framework.name" class="h-full max-h-[100px] aspect-square object-center object-contain mb-4" />
        </div>
        <TextMd class="text-lg font-bold mb-2">{{ framework.name }}</TextMd>
        <TextXs class="text-sm text-gray-500 text-center">{{ framework.description }}</TextXs>
      </HoverCard>
    </HoverContainer>
  </div>
</template>

<script setup>
const frameworks = [
  {
    name: 'React',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: 'A JavaScript library for building user interfaces.'
  },
  {
    name: 'Vue.js',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
    description: 'The Progressive JavaScript Framework.'
  },
  {
    name: 'Angular',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
    description: 'One framework. Mobile & desktop.'
  },
  {
    name: 'Svelte',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg',
    description: 'Cybernetically enhanced web apps.'
  },
  {
    name: 'Ember.js',
    img: 'https://emberjs.com/images/brand/ember-tomster-lockup-4c.svg',
    description: 'A framework for ambitious web developers.'
  },
  {
    name: 'Solid.js',
    img: 'https://www.solidjs.com/img/logo/without-wordmark/logo.png',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.'
  }
];
</script>
