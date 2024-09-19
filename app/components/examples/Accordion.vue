<template>
  <AccordionContainer :openSingle="true" class="py-[32px]">
    <AccordionItem :index="0" :open="true">
      <template #trigger>
        <span class="text-lg font-bold">Getting Started</span>
      </template>
      <div class="p-4 bg-[var(--background-fade)] rounded-md">
        <p>Welcome to the Accordion component! This section is open by default.</p>
        <p>The Accordion is great for organizing content in a compact way.</p>
      </div>
    </AccordionItem>
    <AccordionItem :index="1" :maxHeight="200">
      <template #trigger>
        <span class="text-lg">Features</span>
      </template>
      <div class="p-4 bg-[var(--background-fade)] rounded-md">
        <ul class="list-disc pl-5">
          <li>Collapsible sections</li>
          <li>Customizable max height</li>
          <li>Animated transitions</li>
          <li>Accessible design</li>
        </ul>
      </div>
    </AccordionItem>
    <AccordionItem :index="2" buttonBackground="blue" :duration="0.6">
      <template #trigger>
        <span class="text-lg">Customization</span>
      </template>
      <div class="p-4 bg-[var(--background-fade)] rounded-md">
        <p>This item has a custom button background and animation duration.</p>
        <p>You can easily adjust colors, timing, and other properties.</p>
      </div>
    </AccordionItem>
  </AccordionContainer>
</template>
