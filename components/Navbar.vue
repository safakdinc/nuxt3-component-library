<template>
  <div class="w-full h-[var(--navbar-height)] sticky top-0 left-0 z-[999]">
    <div class="w-full h-full grid grid-cols-12 relative">
      <div class="absolute top-0 left-0 w-full h-full navbar z-[999]" ref="navbar"></div>
      <div class="col-start-0 lg:col-start-3 px-5 lg:px-3 col-span-12 lg:col-span-8 flex justify-between py-2 items-center z-[1000]">
        <div class="flex h-full items-center justify-between logo gap-[32px] interFont">
          <NuxtLink to="/" class="text-2xl md-text font-bold hidden sm:block">Title</NuxtLink>
          <NuxtLink to="/docs/components" class="link-button text-[var(--text-gray)] font-[500]">Components</NuxtLink>
        </div>
        <div class="flex gap-[32px]">
          <ModalButton>
            <template #button>
              <button class="transition duration-300 hover:text-[var(--primary)]">
                <i class="fa fa-search"></i>
              </button>
            </template>
            <SearchModal></SearchModal>
          </ModalButton>
          <button @click="toggleSidebar" class="block md:hidden">
            <i class="fa fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
const navbar = ref();
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.to(navbar.value, {
    scrollTrigger: {
      trigger: navbar.value,
      start: 'top top',
      end: '+=500',
      scrub: 1
    },
    backgroundColor: ' rgba(var(--background-color-rgb), 1)',
    backdropFilter: 'blur(10px)'
  });
});

function scrollToSection(link) {
  const element = document.getElementById(link);
  element.scrollIntoView({
    behavior: 'smooth'
  });
}

const { $event } = useNuxtApp();

function toggleSearchModal() {
  $event('search:toggle');
}

function toggleSidebar() {
  $event('sidebar:toggle');
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: rgba(0, 0, 0, 0);
}
</style>
