<template>
  <div class="flex flex-col">
    <button v-wave class="sticky top-0 left-0 h-fit w-full px-[8px] rounded-t-lg" @click="handleClick">
      <div class="flex justify-between py-[8px] font-bold items-center">
        <slot name="trigger"></slot>
        <i
          :class="{ 'rotate-[-180deg]': isOpen }"
          class="fa fa-chevron-down transition-all"
          :style="{ transitionDuration: props.duration + 's' }"></i>
      </div>
    </button>
    <div class="max-h-0 overflow-auto" ref="container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    }
  ]
});

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  maxHeight: {
    type: Number,
    default: 300
  },
  duration: {
    type: Number,
    default: 0.4
  },
  index: {
    type: Number,
    required: true
  }
});

const isOpen = ref(props.open);

watch(
  () => props.open,
  newVal => {
    if (newVal !== isOpen.value) {
      isOpen.value = newVal;
    }
  },
  { immediate: true }
);

const activeIndex = inject('activeIndex');
const openSingle = inject('openSingle');
const { $event } = useNuxtApp();

/* To prevent possible bugs, the container component needs to know which item is open at startup.*/
if (openSingle) {
  if (props.open) {
    $event('accordeon:activate', props.index);
  }
  watch(activeIndex, newVal => {
    isOpen.value = props.index === newVal;
  });
}

const emits = defineEmits(['handleToggle']);

const container = ref();

function toggleAccordeon() {
  const tl = gsap.timeline({});
  if (isOpen.value) {
    if (container.value.scrollHeight > props.maxHeight) {
      tl.to(container.value, {
        maxHeight: props.maxHeight,
        duration: props.duration,
        ease: 'power2.out'
      });
    } else {
      tl.set(container.value, { overflow: 'hidden' });
      tl.to(container.value, {
        maxHeight: container.value.scrollHeight,
        duration: props.duration,
        ease: 'power2.out'
      });
    }
  } else {
    tl.to(container.value, {
      maxHeight: 0,
      duration: props.duration,
      ease: 'power2.out'
    });
  }
}

watch(isOpen, toggleAccordeon);

onMounted(() => {
  toggleAccordeon();
});

function handleClick() {
  isOpen.value = !isOpen.value;
  emits('handleToggle', props.index);
  $event('accordeon:activate', props.index);
}
</script>
<style></style>
