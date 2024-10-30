<template>
  <div v-if="page" :key="$route.fullPath" class="flex-1 overflow-hidden">
    <div class="w-full flex flex-col gap-[8px] relative pb-[32px]">
      <div class="font-bold text-lg">
        <h1>{{ page.title }}</h1>
      </div>
      <div class="text-[var(--text-gray)] mb-[24px]">
        <p>{{ page.description }}</p>
      </div>
      <div class="w-full h-[1px] absolute bottom-0 left-0" style="background-color: rgb(255 255 255/ 0.3)"></div>
    </div>
    <ContentRenderer :value="page" class="flex flex-col gap-[8px] content-renderer-wrapper" />
    <div class="w-full grid grid-cols-8 gap-8 mt-[48px]">
      <div class="col-span-8 sm:col-span-4 md:col-span-3">
        <NavigateButton v-if="prev" :right="false" :data="prev"></NavigateButton>
      </div>
      <div class="col-span-2 hidden md:block"></div>
      <div class="col-span-8 sm:col-span-4 md:col-span-3">
        <NavigateButton v-if="next" :data="next"></NavigateButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/content.scss';

const { path } = useRoute();
const route = useRoute();
const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne());

const [prev, next] = await queryContent().only(['_path', 'title', 'description']).sort({ date: 1 }).findSurround(path);
</script>
