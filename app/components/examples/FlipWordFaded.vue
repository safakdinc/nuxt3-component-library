<template>
  <div class="text-lg flex items-center text-nowrap overflow-hidden flex-col md:flex-row">
    <div class="">You can see words with fade effect</div>
    &nbsp &nbsp
    <ClientOnly>
      <FlipWordFaded :words="['lorem', 'ipsum', 'dolor', 'sit', 'amet']" class="w-fit font-bold"></FlipWordFaded>
    </ClientOnly>
  </div>
</template>
