<template>
  <div
    ref="popoverRoot"
    @mouseenter="mode === 'hover' && onMouseEnter()"
    @mouseleave="mode === 'hover' && onMouseLeave()"
    class="relative"
  >
    <div ref="trigger" @click="mode === 'click' && togglePopover()">
      <slot name="trigger" :open="isOpen" :close="closePopover"> </slot>
    </div>

    <Transition :name="props.transitionName">
      <div v-show="isOpen" ref="panel" :style="panelStyle" class="relative">
        <div
          v-if="props.arrow"
          ref="arrow"
          data-popper-arrow
          :class="twMerge('visible block z-[-1] w-2 h-2 absolute rotate-45', props.arrowClass)"
        ></div>
        <div class="z-[100]">
          <slot :open="isOpen" :close="closePopover"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { twMerge } from "tailwind-merge";

const props = defineProps({
  mode: {
    type: String,
    default: "hover",
    validator: (value) => ["click", "hover"].includes(value),
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  transitionName: {
    type: String,
    default: "popover",
  },
  placement: {
    type: String,
    default: "bottom",
  },
  arrow: {
    type: Boolean,
    default: true,
  },
  arrowClass: {
    type: String,
    default: "bg-gray-500",
  },
  offset: {
    type: Number,
    default: 8,
  },
});

const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open ?? false);
const popoverRoot = ref(null);
const trigger = ref(null);
const panel = ref(null);
const arrow = ref(null);
const panelStyle = ref({});

let openTimeout = null;
let closeTimeout = null;

const updatePosition = () => {
  if (!trigger.value || !panel.value || !popoverRoot.value) return;

  const triggerRect = trigger.value.getBoundingClientRect();
  const panelRect = panel.value.getBoundingClientRect();

  let top, left;

  switch (props.placement) {
    case "top":
      top = -panelRect.height - props.offset;
      left = (triggerRect.width - panelRect.width) / 2;
      break;
    case "bottom":
      top = triggerRect.height + props.offset;
      left = (triggerRect.width - panelRect.width) / 2;
      break;
    case "left":
      top = (triggerRect.height - panelRect.height) / 2;
      left = -panelRect.width - props.offset;
      break;
    case "right":
      top = (triggerRect.height - panelRect.height) / 2;
      left = triggerRect.width + props.offset;
      break;
  }

  panelStyle.value = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
  };

  if (props.arrow) {
    const arrowSize = 8; // Adjust this value based on your arrow size
    let arrowTop, arrowLeft;

    switch (props.placement) {
      case "top":
        arrowTop = panelRect.height - arrowSize / 2;
        arrowLeft = panelRect.width / 2;
        break;
      case "bottom":
        arrowTop = -arrowSize / 2;
        arrowLeft = panelRect.width / 2;
        break;
      case "left":
        arrowTop = panelRect.height / 2 - arrowSize / 2;
        arrowLeft = panelRect.width - arrowSize / 2;
        break;
      case "right":
        arrowTop = panelRect.height / 2 - arrowSize / 2;
        arrowLeft = -arrowSize / 2;
        break;
    }

    arrow.value.style.top = `${arrowTop}px`;
    arrow.value.style.left = `${arrowLeft}px`;
  }
};
watch(
  () => props.open,
  (newValue) => {
    if (newValue !== undefined) {
      isOpen.value = newValue;
    }
  },
);

watch(isOpen, (newValue) => {
  emit("update:open", newValue);
  if (newValue) {
    nextTick(updatePosition);
  }
});

const togglePopover = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const openPopover = () => {
  if (!props.disabled && !isOpen.value) {
    isOpen.value = true;
  }
};

const closePopover = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
};

const onMouseEnter = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  openTimeout = setTimeout(openPopover, props.openDelay);
};

const onMouseLeave = () => {
  if (openTimeout) {
    clearTimeout(openTimeout);
    openTimeout = null;
  }
  closeTimeout = setTimeout(closePopover, props.closeDelay);
};

const handleClickOutside = (event) => {
  if (popoverRoot.value && !popoverRoot.value.contains(event.target)) {
    closePopover();
  }
};

onMounted(() => {
  if (panel.value) {
    updatePosition();
  }
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", updatePosition);
  window.addEventListener("scroll", updatePosition);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", updatePosition);
  window.removeEventListener("scroll", updatePosition);
});
</script>

<style scoped>
.popover-enter-active,
.popover-leave-active {
  transition:
    all 0.2s ease-out,
    left 0s ease;
}
.popover-enter-to,
.popover-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
