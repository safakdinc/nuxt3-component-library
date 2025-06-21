<script setup lang="ts">
import gsap from 'gsap';
import { Environment, OrbitControls, Precipitation, RoundedBox } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import { EffectComposerPmndrs, FishEyePmndrs } from '@tresjs/post-processing';
import { BackSide, NoToneMapping } from 'three';
import { ref, watch } from 'vue';
import { BlendFunction } from 'postprocessing';

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping
};

const lensParams = reactive({ lensSX: 0.0, lensSY: 0.0, lensFX: 0.0, lensFY: 0.0 });

const localBlendFunction = ref(BlendFunction.NORMAL);

onMounted(() => {
  gsap.to(lensParams, {
    lensSX: 1.0,
    lensSY: 1.0,
    lensFX: 0.2,
    lensFY: 0.2,
    delay: 1.5,
    duration: 1.0,
    ease: 'easeOut.power3'
  });
});
</script>

<template>
  <Suspense>
    <EffectComposerPmndrs>
      <FishEyePmndrs
        :blendFunction="localBlendFunction"
        :lensS="[lensParams.lensSX, lensParams.lensSY]"
        :lensF="[lensParams.lensFX, lensParams.lensFY]" />
    </EffectComposerPmndrs>
  </Suspense>
</template>
