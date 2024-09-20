<template>
  <div class="w-full flex flex-col gap-[16px] justify-start items-center h-[200vh] p-[16px] md:p-[64px]">
    <TextLg class="font-bold">Scroll down</TextLg>
    <TextReveal :trigger-element="'.preview'">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus at, tenetur magnam ut distinctio earum vero laudantium, similique
      soluta nobis dolor repellat expedita ab atque perspiciatis repudiandae laboriosam autem repellendus.
    </TextReveal>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
