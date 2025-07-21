<template>
  <div class="flex items-center flex-col p-[16px] md:p-[64px] text-[12px] md:text-[14px] lg:text-[16px]">
    <TabsHorizontal
      :tabs="['Home', 'Profile', 'Settings', 'Help']"
      :active="activeTab"
      background="lightblue"
      @handleClick="handleTabClick" />
    <div class="content mt-4">
      <p>Active tab content: {{ tabContents[activeTab] }}</p>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref(0);
const tabContents = [
  'Welcome to the Home tab!',
  'This is your Profile information.',
  'Adjust your Settings here.',
  'Need Help? Check this tab.'
];

const handleTabClick = index => {
  activeTab.value = index;
};
</script>

<style scoped>
.content {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
