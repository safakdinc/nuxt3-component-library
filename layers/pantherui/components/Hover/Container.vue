<template>
  <div
    :class="twMerge('w-full flex justify-center', props.class)"
    @mousemove="mouseMove"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <Responsive
      :items="props.items"
      :item-min-width="props.itemMinWidth"
      :item-max-width="props.itemMaxWidth"
      :row-padding="props.rowPadding"
      :max-columns="props.maxColumns"
      :col-padding="props.colPadding"
    >
      <template #default="{ item, index }">
        <slot :item="item" :index="index"></slot>
      </template>
    </Responsive>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemMinWidth: {
    type: Number,
    default: 200,
  },
  itemMaxWidth: {
    type: Number,
    default: 300,
  },
  rowPadding: {
    type: Number,
    default: 16,
  },
  colPadding: {
    type: Number,
    default: 16,
  },
  maxColumns: {
    type: Number,
    default: null,
  },
  class: String,
});

// Hover effect logic
const x = ref();
const y = ref();
const isHovered = ref(false);

function mouseMove(event) {
  x.value = event.clientX;
  y.value = event.clientY;
}

function mouseEnter() {
  isHovered.value = true;
}

function mouseLeave() {
  isHovered.value = false;
}

// Provide hover context for child components
provide("clientX", x);
provide("clientY", y);
provide("isHovered", isHovered);
</script>
