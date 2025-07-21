<template>
  <div class="flex items-center h-full py-[16px]">
    <Popover mode="hover" placement="bottom" :offset="10" :arrow="true" :arrow-class="'bg-gray-600'">
      <template #trigger="{ open }">
        <button>Trigger</button>
      </template>

      <div class="flex w-max px-[16px] h-[250px] justify-center items-center rounded-lg border bg-[var(--background-fade)]">
        Popover content goes here
      </div>
    </Popover>
  </div>
</template>
