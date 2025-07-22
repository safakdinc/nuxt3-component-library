<template>
  <div class="w-full justify-center flex p-[16px] lg:p-[64px]">
    <!-- Using the ResponsiveWrapper approach -->
    <HoverContainer :items="frameworks" :item-min-width="220" :max-columns="3" :row-padding="16" :col-padding="16">
      <template #default="{ item, index }">
        <HoverCard class="aspect-square p-4 flex flex-col items-center justify-center bg-[var(--background-fade)] h-full w-full">
          <div class="flex-1 flex items-center justify-center">
            <img :src="item.img" :alt="item.name" class="h-full max-h-[100px] aspect-square object-center object-contain mb-4" />
          </div>
          <div class="text-lg font-bold mb-2">{{ item.name }}</div>
          <div class="text-sm text-gray-500 text-center">{{ item.description }}</div>
        </HoverCard>
      </template>
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
    description: 'A declarative, efficient, and flexible JavaScript library.'
  }
];
</script>
