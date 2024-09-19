<template>
  <div class="space-y-4">
    <TextLg class="flex flex-col justify-center gap-2">
      <div class="flex items-center">
        Customize &nbsp
        <FlipWordDefault
          class="font-bold"
          :words="['animations', 'transitions', 'effects', 'movements']"
          :intervals="1500"
          :duration="0.4"
          ease="back.out(2.5)"></FlipWordDefault>
      </div>
      <div>with <code>FlipWordDefault</code></div>
    </TextLg>

    <TextLg class="flex items-center gap-2 justify-start">
      <div class="flex items-center">
        Create &nbsp
        <FlipWordFaded
          class="font-bold text-green-600"
          :words="['smooth', 'elegant', 'subtle', 'graceful']"
          :intervals="1000"
          :duration="0.5"
          ease="power1.out"
          :start="true"></FlipWordFaded>
      </div>
      <div>fades with <code>FlipWordFaded</code></div>
    </TextLg>
  </div>
</template>
