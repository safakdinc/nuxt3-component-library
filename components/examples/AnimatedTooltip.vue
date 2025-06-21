<template>
  <div class="flex-1 flex items-center justify-center">
    <AnimatedTooltip class="">
      <template #tooltip>
        <div class="text-nowrap">（￣︶￣）</div>
      </template>
      <div class="transition-transform hover:scale-[1.15] duration-300 ease-out">Hover for Tooltip</div>
    </AnimatedTooltip>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
