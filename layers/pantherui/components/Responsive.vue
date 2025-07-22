<template>
  <div ref="gridContainer" class="flex flex-col w-full" :style="containerStyle">
    <div class="w-full flex flex-wrap justify-center" :style="gridStyle">
      <div v-for="(item, index) in items" :key="`item-${index}`" class="grid-item" :style="itemStyle">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, readonly } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import gsap from 'gsap';
import Flip from 'gsap/dist/Flip';

gsap.registerPlugin(Flip);

export interface Props {
  /**
   * Array of items to display in the grid.
   */
  items: Array<any>;
  /**
   * Minimum width of each item in pixels.
   */
  itemMinWidth?: number;
  /**
   * Maximum width of each item in pixels. This value is used to calculate maxWidth of the container with this formula:
   *
   * `props.itemMaxWidth * props.maxColumns`
   */
  itemMaxWidth?: number;
  /**
   * Padding between rows in pixels.
   */
  rowPadding?: number;
  /**
   * Padding between columns in pixels.
   */
  colPadding?: number;
  /**
   * Maximum number of columns in the grid. Default is null, which means no limit.
   */
  maxColumns?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  itemMinWidth: 150,
  itemMaxWidth: 250,
  rowPadding: 16,
  colPadding: 16,
  maxColumns: null
});

const gridContainer = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const itemWidth = ref(props.itemMinWidth);

// Computed styles for better performance
const containerStyle = computed(() => ({
  gap: `${props.rowPadding}px`,
  maxWidth: props.maxColumns ? `${props.itemMaxWidth * props.maxColumns}px` : '100%'
}));

const gridStyle = computed(() => ({
  gap: `${props.colPadding}px`
}));

const itemStyle = computed(() => ({
  width: `${itemWidth.value}px`,
  minWidth: `${props.itemMinWidth}px`,
  maxWidth: `${itemWidth.value}px`,
  flexShrink: 0
}));

// Optimized grid calculation
const calculateLayout = () => {
  if (!gridContainer.value || !props.items.length) return;

  const width = gridContainer.value.clientWidth;
  if (width === containerWidth.value) return; // Skip if width hasn't changed

  containerWidth.value = width;

  // Calculate items per row more efficiently
  const availableWidth = width - props.colPadding;
  const itemWithGap = props.itemMinWidth + props.colPadding;
  let itemsPerRow = Math.max(1, Math.floor((availableWidth + props.colPadding) / itemWithGap));

  // Apply maxColumns constraint if specified
  if (props.maxColumns && props.maxColumns > 0) {
    itemsPerRow = Math.min(itemsPerRow, props.maxColumns);
  }

  // Calculate optimal item width
  const totalGaps = (itemsPerRow - 1) * props.colPadding;
  const availableWidthForItems = width - totalGaps;
  const calculatedWidth = Math.floor(availableWidthForItems / itemsPerRow);

  // Always respect both maxColumns AND itemMaxWidth constraints
  itemWidth.value = Math.min(props.itemMaxWidth, Math.max(props.itemMinWidth, calculatedWidth));
};

// Debounced resize handler for better performance
const debouncedCalculateLayout = useDebounceFn(calculateLayout, 100);

// ResizeObserver for more efficient size tracking
let resizeObserver: ResizeObserver | null = null;

onMounted(async () => {
  await nextTick();

  if (window.ResizeObserver && gridContainer.value) {
    resizeObserver = new ResizeObserver(debouncedCalculateLayout);
    resizeObserver.observe(gridContainer.value);
  } else {
    // Fallback for older browsers
    window.addEventListener('resize', debouncedCalculateLayout);
  }

  calculateLayout();
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  } else {
    window.removeEventListener('resize', debouncedCalculateLayout);
  }
});

// Watch items changes more efficiently
watch(() => props.items.length, calculateLayout, { flush: 'post' });

defineExpose({
  calculateLayout,
  containerWidth: readonly(containerWidth),
  itemWidth: readonly(itemWidth)
});
</script>

<style scoped>
.grid-item {
  box-sizing: border-box;
}
</style>
