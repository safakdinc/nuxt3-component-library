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
  </div>
</template>

<script setup>
import '@/assets/css/content.scss';

const { path } = useRoute();
const route = useRoute();

const slugs = useRoute().params.slug;

// Old: const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne());
// New: Use queryCollection and specify the collection name 'docs' (or whatever you named it in content.config.ts)
const { data: page } = await useAsyncData(`content-${path}`, () =>
  queryCollection('docs')
    .path(`/docs${slugs.map(slug => `/${slug}`).join('')}`)
    .first()
);
</script>
