<template>
  <div class="flex flex-col justify-center gap-[32px] p-[16px] md:p-[64px]">
    <div class="flex gap-[16px] items-center">
      <ShimmerLoading class="h-16 aspect-square rounded-full"></ShimmerLoading>
      <div class="flex flex-col gap-[8px]">
        <ShimmerLoading class="h-4 w-[120px]"></ShimmerLoading>
        <ShimmerLoading class="h-4 w-[200px]"></ShimmerLoading>
      </div>
    </div>
    <div class="flex flex-col gap-[16px]">
      <ShimmerLoading class="h-4 max-w-[350px] w-full"></ShimmerLoading>
      <ShimmerLoading class="h-4 max-w-[400px] w-full"></ShimmerLoading>
      <ShimmerLoading class="h-4 max-w-[200px] w-full"></ShimmerLoading>
    </div>
  </div>
</template>
