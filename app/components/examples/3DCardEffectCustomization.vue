<template>
  <div class="p-[16px] md:p-[64px]">
    <CardContainer
      :multiplier-x="40"
      :multiplier-y="30"
      class="w-[480px] flex flex-col gap-[16px] rounded-lg p-[24px]"
      style="border: 1px solid rgb(255 255 255/0.3)">
      <CardItem :translate-z="50" class="sm:max-w-full md:max-w-[70%]">
        <TextMd class="font-[600]">Customize as you wish</TextMd>
        <TextXs class="text-[var(--text-gray)]">Play with different multiplier-x and multiplier-y values</TextXs>
      </CardItem>
      <CardItem :translate-z="80">
        <img
          src="https://preview.redd.it/8r1ddglt15m91.jpg?auto=webp&s=582e130ba4205da10b71471dbadd302dc6ae114e"
          class="w-full h-full object-cover rounded-lg object-center min-h-[250px]" />
      </CardItem>
      <CardItem :translate-z="120" class="sm:max-w-full mt-[12px]">
        <TextMd class="font-[600]">You can also increase elevation of any <code>CardItem</code> component</TextMd>
      </CardItem>
    </CardContainer>
  </div>
</template>
