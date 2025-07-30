<template>
  <div class="flex-1 flex flex-col justify-center items-center">
    <div class="text-lg flex flex-col justify-center gap-2">
      <div class="flex items-center">
        Customize &nbsp
        <FlipWordDefault
          class="font-bold"
          :words="['animations', 'transitions', 'effects', 'movements']"
          :intervals="1500"
          :duration="0.4"
          ease="back.out(2.5)"
        ></FlipWordDefault>
      </div>
      <div>with <code>FlipWordDefault</code></div>
    </div>

    <div class="text-lg flex items-center gap-2 justify-start">
      <div class="flex items-center">
        Create &nbsp
        <FlipWordFaded
          class="font-bold"
          :words="['smooth', 'elegant', 'subtle', 'graceful']"
          :intervals="1000"
          :duration="0.5"
          ease="power1.out"
          :start="true"
        ></FlipWordFaded>
      </div>
      <div>fades</div>
    </div>
  </div>
</template>
