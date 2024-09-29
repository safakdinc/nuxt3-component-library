<template>
  <div class="flex-1 relative">
    <TracingCurveContainer :curveData="curveData" :trigger-element="'.preview'"></TracingCurveContainer>
  </div>
</template>

<script setup>
const curveData = ref([
  {
    line: { start: { x: 300, y: 0, z: 0 }, end: { x: 1200, y: 50, z: 0 }, curvature: { x: 100, y: 100 } },
    item: {
      title: 'Step 1',
      subtitle: 'Getting Started',
      texts: ['Begin your journey', 'Explore the basics']
    }
  },
  {
    line: { start: { x: 1200, y: 50, z: 0 }, end: { x: 1700, y: 550, z: 0 }, curvature: { x: 100, y: -150 } },
    item: {
      title: 'Step 2',
      subtitle: 'Building Skills',
      texts: ['Learn advanced techniques', 'Practice regularly']
    }
  },
  {
    line: { start: { x: 1700, y: 550, z: 0 }, end: { x: 1000, y: 900, z: 0 }, curvature: { x: 500, y: -400 } },
    item: {
      title: 'Step 3',
      subtitle: 'Applying Knowledge',
      texts: ['Work on real projects', 'Collaborate with others']
    }
  },
  {
    line: { start: { x: 1000, y: 900, z: 0 }, end: { x: 500, y: 1400, z: 0 }, curvature: { x: -500, y: 0 } },
    item: {
      title: 'Step 4',
      subtitle: 'Mastering the Craft',
      texts: ['Refine your skills', 'Teach and mentor others']
    }
  }
]);
</script>

<style lang="scss" scoped></style>
