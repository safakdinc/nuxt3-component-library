<template>
  <div class="flex flex-col">
    <slot @handleToggle="handleToggle"></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  openSingle: {
    type: Boolean,
    default: true
  }
});

const activeIndex = ref(null);

const { $listen } = useNuxtApp();
$listen('accordeon:activate', index => {
  activeIndex.value = index;
});

provide('activeIndex', activeIndex);
provide('openSingle', props.openSingle);
</script>

<style lang="scss" scoped></style>
