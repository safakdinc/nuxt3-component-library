<template>
  <div class="w-full flex p-[16px] md:p-[64px] justify-center">
    <CardContainer
      :multiplier-x="30"
      :multiplier-y="20"
      class="w-[480px] flex flex-col gap-[16px] rounded-lg p-[24px]"
      style="border: 1px solid rgb(255 255 255/0.3)">
      <CardItem :translate-z="50" class="sm:max-w-full md:max-w-[70%]">
        <div class="font-[600] text-2xl">Give depth to your Card items</div>
        <div class="text-[var(--text-gray)]">Hover over this card to unleash the power of CSS perspective</div>
      </CardItem>
      <CardItem :translate-z="80">
        <img
          src="https://preview.redd.it/8r1ddglt15m91.jpg?auto=webp&s=582e130ba4205da10b71471dbadd302dc6ae114e"
          class="w-full h-full object-cover rounded-lg object-center min-h-[250px]" />
      </CardItem>
      <CardItem :translate-z="120" class="sm:max-w-full md:max-w-[70%] mt-[12px]">
        <div class="font-[600] text-lg">You can also increase elevation of any <code>CardItem</code> component</div>
      </CardItem>
    </CardContainer>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
