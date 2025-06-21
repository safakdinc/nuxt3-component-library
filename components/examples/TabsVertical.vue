<template>
  <div class="flex p-[16px] md:p-[64px] text-[12px] md:text-[14px] lg:text-[16px]">
    <TabsVertical
      :tabs="['Dashboard', 'Analytics', 'Reports', 'Users']"
      :active="activeTab"
      background="lightgreen"
      class="my-custom-class"
      @handleClick="handleTabClick" />
    <div class="content ml-4">
      <h2>{{ tabContents[activeTab].title }}</h2>
      <p>{{ tabContents[activeTab].content }}</p>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref(0);
const tabContents = [
  { title: 'Dashboard', content: 'Overview of your main metrics and KPIs.' },
  { title: 'Analytics', content: 'Detailed analysis of your data and trends.' },
  { title: 'Reports', content: 'Generate and view various reports here.' },
  { title: 'Users', content: 'Manage user accounts and permissions.' }
];

const handleTabClick = index => {
  activeTab.value = index;
};
</script>

<style scoped>
.flex {
  display: flex;
}
.content {
  flex-grow: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
