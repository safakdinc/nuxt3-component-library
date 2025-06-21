<template>
  <div class="cursor-pointer" @click="openModal">
    <slot name="button"></slot>
  </div>
  <Transition name="modal">
    <div v-if="open" class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1001] pointer-events-none">
      <div class="pointer-events-auto"><slot></slot></div>
    </div>
  </Transition>
  <!--Background-->
  <Transition name="fade">
    <div v-if="open" class="fixed top-0 left-0 w-full h-full z-[1000]">
      <div class="w-full h-full opacity-50 bg-black" @click="closeModal"></div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['handleOpen', 'handleClose']);
const open = ref(props.open);

function openModal() {
  open.value = true;
  emits('handleOpen');
}
function closeModal() {
  open.value = false;
  emits('handleClose');
}
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-in-out;
}
</style>
