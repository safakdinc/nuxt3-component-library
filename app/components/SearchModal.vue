<template>
  <div
    class="bg-[var(--background-fade)] h-[400px] overflow-y-auto rounded-lg shadow-lg flex flex-col
      gap-[12px]"
    style="width: min(600px, 100vw)"
  >
    <div
      class="flex gap-3 items-center px-4 py-4 line pb-3 bg-[var(--background-fade)] sticky top-0
        left-0 z-[10]"
    >
      <i class="fa fa-search"></i>
      <div class="text-sm">
        <input type="text" placeholder="Search..." v-model="searchQuery" />
      </div>
    </div>
    <div class="w-full flex flex-col gap-[12px]">
      <div
        v-for="group in filteredNavigation"
        :key="group.path || group.title"
        class="flex flex-col gap-[12px] line pb-3 px-4"
      >
        <div v-if="group.title" class="font-semibold">
          <NuxtLink
            v-if="group.path && group.page !== false"
            :to="group.path"
            class="group-title-link"
          >
            {{ group.title }}
          </NuxtLink>
          <span v-else>{{ group.title }}</span>
        </div>

        <div
          v-if="group.children && group.children.length > 0"
          class="flex flex-col gap-[12px] link-group"
        >
          <NuxtLink
            class="link flex gap-2 items-center"
            :to="item.path"
            v-for="item in group.children"
            :key="item.path"
          >
            <i class="fa-regular fa-file-lines text-[var(--text-gray)]"></i>
            <div class="text-sm">{{ item.title }}</div>
          </NuxtLink>
        </div>
      </div>
      <div
        v-if="!filteredNavigation || filteredNavigation.length === 0"
        class="px-4 py-2 text-gray-500"
      >
        No results found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// 1. Use queryCollectionNavigation for structured data
// This will return the hierarchical structure you showed earlier (Docs -> Getting Started/Components -> articles)
const { data: navigationData } = await useAsyncData(
  "full-navigation",
  () => queryCollectionNavigation("docs"), // Replace 'docs' if your collection name is different
);

const searchQuery = ref("");

// Helper function for recursive filtering
const filterNavigation = (items, query) => {
  if (!items) return [];

  return items
    .map((item) => {
      // Check if the item itself matches
      const itemMatches =
        item.title?.toLowerCase().includes(query) || item.path?.toLowerCase().includes(query);

      // Recursively filter children
      const filteredChildren = filterNavigation(item.children, query);

      // If the item or any of its children match, include it
      if (itemMatches || filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren, // Keep only matching children
        };
      }
      return null; // Exclude this item if no match
    })
    .filter(Boolean); // Remove null entries
};

const filteredNavigation = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) {
    // If search query is empty, return the full navigation (excluding the top 'Docs' wrapper if desired)
    return navigationData.value?.[0]?.children || [];
  }

  // Filter starting from the children of the top 'Docs' node
  return filterNavigation(navigationData.value?.[0]?.children, query);
});

// The `formatTitle` function is generally not needed if `queryCollectionNavigation`
// is already providing properly formatted titles from your content files/folders.
// const formatTitle = title => {
//   if (!title) return '';
//   return title.charAt(0).toUpperCase() + title.slice(1);
// };

// onMounted is no longer strictly necessary for initial filtering as computed property handles it.
// onMounted(() => {
//   // filteredNavigation is already computed reactively
// });
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

.group-title-link {
  color: var(--text-color);
  text-decoration: none;
  &:hover {
    color: var(--primary);
  }
}
</style>
