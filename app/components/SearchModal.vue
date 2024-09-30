<template>
  <div
    class="bg-[var(--background-fade)] h-[400px] overflow-y-auto rounded-lg shadow-lg flex flex-col gap-[12px]"
    style="width: min(600px, 100vw)">
    <div class="flex gap-3 items-center px-4 py-4 line pb-3 bg-[var(--background-fade)] sticky top-0 left-0 z-[10]">
      <i class="fa fa-search"></i>
      <TextXs>
        <input type="text" placeholder="Search..." v-model="searchQuery" @input="filterItems" />
      </TextXs>
    </div>
    <div class="w-full flex flex-col gap-[12px]">
      <div v-for="(group, title) in filteredNavigation" :key="title" class="flex flex-col gap-[12px] line pb-3 px-4">
        <TextSm class="font-semibold">{{ formatTitle(title) }}</TextSm>
        <div class="flex flex-col gap-[12px] link-group">
          <NuxtLink class="link flex gap-2 items-center" :to="item._path" v-for="item in group" :key="item._path">
            <i class="fa-regular fa-file-lines text-[var(--text-gray)]"></i>
            <TextXs>{{ item.title }}</TextXs>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { data: navigationItems } = await useAsyncData('navigation', () => queryContent('/docs').where({ _partial: false }).find());

const searchQuery = ref('');

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

const filteredNavigation = ref({});

const filterItems = () => {
  const query = searchQuery.value.toLowerCase();
  filteredNavigation.value = Object.entries(groupedNavigation.value).reduce((acc, [key, items]) => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(query) || item._path.toLowerCase().includes(query));
    if (filteredItems.length > 0) {
      acc[key] = filteredItems;
    }
    return acc;
  }, {});
};

onMounted(() => {
  filteredNavigation.value = groupedNavigation.value;
});

const formatTitle = title => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};
</script>

<style scoped lang="scss">
input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  background-color: transparent;
  &::placeholder {
    font-size: 14px;
  }
}

.line {
  border-bottom: 1px solid rgb(226 232 240/0.15);
}

.link {
  transition: all 0.2s ease-out;
  color: var(--text-color);
  &:hover {
    transform: translateX(5px);
    color: var(--primary);
  }
  &:active {
    transform: translateX(5px);
    color: var(--primary);
  }
}
</style>
