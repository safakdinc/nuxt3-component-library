<template>
  <Transition name="sidebar">
    <div
      v-show="(sidebarOpen && windowSmall) || !windowSmall"
      class="max-w-[240px] w-[240px] h-full overflow-auto overflow-x-hidden fixed top-0 left-0 md:top-[var(--navbar-height)] md:sticky bg-black md:bg-transparent z-[1002] md:z-10"
      :class="{ maxScreenHeight: !windowSmall }">
      <div class="flex flex-col gap-[24px] px-[16px] py-[24px]">
        <div v-for="(group, title) in groupedNavigation" :key="title" class="flex flex-col gap-[8px]">
          <div class="font-semibold">{{ formatTitle(title) }}</div>
          <div class="flex flex-col gap-[12px] link-group">
            <NuxtLink class="link" :to="item._path" v-for="item in group" :key="item._path">
              <div class="text-sm">{{ item.title }}</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="sidebar-fade">
    <div
      @click="toggleSidebar"
      v-show="sidebarOpen && windowSmall"
      class="w-full h-full fixed md:hidden z-[1000] top-0 left-0"
      style="backdrop-filter: blur(2px); background-color: rgba(0, 0, 0, 0.3)"></div>
  </Transition>
</template>

<script setup>
const { data: navigationItems } = await useAsyncData('navigation', () => queryContent('/docs').where({ _partial: false }).find());
const groupedNavigation = computed(() => {
  const groups = {};
  navigationItems.value.forEach(item => {
    const parts = item._path.split('/').filter(Boolean);
    if (parts.length > 2) {
      const groupName = parts[1];
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
    }
  });
  return groups;
});

const sidebarOpen = ref(false);
const windowSmall = ref(true);

onMounted(() => {
  window.addEventListener('resize', resize);
});

function resize() {
  if (window.innerWidth <= 768) {
    windowSmall.value = true;
  } else {
    windowSmall.value = false;
  }
}

resize();

const formatTitle = title => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const { $listen } = useNuxtApp();

$listen('sidebar:toggle', toggleSidebar);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style lang="scss" scoped>
.link {
  transition: all 0.2s ease-out;
  color: var(--text-gray);
  &:hover {
    transform: translateX(5px);
    color: var(--primary);
  }
  &:active {
    transform: translateX(5px);
    color: var(--primary);
  }
}
.router-link-exact-active {
  font-weight: 500;
  color: var(--text-color);
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.2s ease-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0%);
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
  opacity: 1;
}
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: all 0.2s ease-out;
}
</style>
