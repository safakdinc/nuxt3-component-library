<template>
  <div class="w-full flex flex-col gap-[16px] overflow-hidden">
    <div class="w-fit">
      <TabsHorizontal @handle-click="handleClick" :tabs="['Preview', 'Code']"></TabsHorizontal>
    </div>

    <!-- Conditionally Render Preview or Code -->
    <div class="flex flex-col gap-[8px] overflow-hidden rounded-md" style="border: 1px solid rgb(255 255 255 / 0.3)">
      <div v-show="isPreview" class="w-full flex justify-center preview min-h-[50vh] max-h-[80vh] overflow-x-hidden overflow-y-auto">
        <component :is="resolveComponent('examples-' + props.component)"></component>
      </div>
      <div v-show="!isPreview" class="relative text-sm">
        <button @click="copyClipBoard" class="absolute top-[4px] right-[12px] px-[12px] py-[6px] copy-code rounded-md">
          <div><i class="fa-solid text-2xl" :class="{ 'fa-check': copied, 'fa-copy': !copied }"></i></div>
        </button>
        <div class="w-full overflow-hidden" v-html="highlightedCode"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createHighlighter } from 'shiki';

const props = defineProps({
  component: {
    type: String,
    required: false
  }
});

const isPreview = ref(true);
const highlightedCode = ref('');

function handleClick(value) {
  isPreview.value = value === 0;
}

const sourceCode = ref('');

onMounted(async () => {
  const highlighter = await createHighlighter({
    themes: ['material-theme-darker'],
    langs: ['vue']
  });

  const module = await import(`../components/examples/${props.component}.vue?raw`);
  sourceCode.value = module.default;

  highlightedCode.value = highlighter.codeToHtml(sourceCode.value, {
    lang: 'vue',
    theme: 'material-theme-darker'
  });
});

const copied = ref(false);

function copyClipBoard() {
  copied.value = true;
  navigator.clipboard.writeText(sourceCode.value);
}
</script>

<style lang="scss">
.shiki {
  overflow: auto;
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
  border-radius: 0.375rem;
  padding: 16px 16px 16px 16px;
}

.copy-code {
  transition: all 0.3s ease-out;
  &:hover {
    background-color: var(--background-fade);
    color: var(--primary);
  }
}
</style>
