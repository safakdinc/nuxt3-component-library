<template>
  <div class="w-full flex justify-center items-center p-[16px] md:p-[64px]">
    <button @click="openModal" class="px-4 py-2 bg-green-500 rounded h-fit">Open Modal</button>
    <ModalDefault :open="isModalOpen" @closeModal="closeModal">
      <div class="bg-[var(--background-fade)] px-6 py-4 w-[350px] h-[400px] rounded-lg shadow-lg flex flex-col">
        <img
          src="https://img.odatv.com/rcman/Cw1280h720q95gc/storage/files/images/2024/08/29/yusuf-dikec-marka-oluyor-d71c.jpg"
          class="rounded-[inherit] flex-1 object-cover object-center" />
        <h2 class="text-2xl font-bold mb-4">Modal Content</h2>
        <p>This is the content of the modal.</p>
      </div>
    </ModalDefault>
  </div>
</template>

<script setup>
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>
