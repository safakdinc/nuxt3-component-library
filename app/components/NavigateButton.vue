<template>
  <NuxtLink
    :to="props.data._path"
    class="w-full min-h-[185px] h-full flex flex-col gap-[8px] px-[24px] py-[32px] rounded-lg container"
    :class="{ 'items-end': props.right }"
    style="border: 1px solid rgb(255 255 255 / 0.3)">
    <div class="p-[8px] aspect-square flex justify-center items-center rounded-full w-fit mb-[16px]" style="background-color: #27272a">
      <i v-if="props.right" class="fa fa-chevron-right"></i>
      <i v-else class="fa fa-chevron-left"></i>
    </div>
    <TextMd class="font-[600]">{{ props.data.title }}</TextMd>
    <TextXs style="color: var(--text-gray)" class="description" :class="{ 'text-end': props.right }">{{ props.data.description }}</TextXs>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  right: {
    type: Boolean,
    default: true
  }
});
</script>

<style lang="scss" scoped>
.container {
  transition: color 0.2s ease-out;
  &:hover {
    color: var(--primary);
  }
}
</style>
