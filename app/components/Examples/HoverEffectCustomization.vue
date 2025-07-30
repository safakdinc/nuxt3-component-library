<template>
  <div class="w-full h-full justify-center flex flex-col py-4 lg:p-[64px] space-y-8">
    <!-- Customization Controls -->
    <div class="w-full max-w-4xl mx-auto bg-[var(--background-fade)] p-6 rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Border Intensity -->
        <div>
          <label class="block text-sm font-medium mb-2">Border Intensity</label>
          <input
            v-model.number="customization.borderIntensity"
            type="range"
            min="0"
            max="1"
            step="0.1"
            class="w-full"
          />
          <span class="text-xs text-gray-500">{{ customization.borderIntensity }}</span>
        </div>

        <!-- Glow Intensity -->
        <div>
          <label class="block text-sm font-medium mb-2">Glow Intensity</label>
          <input
            v-model.number="customization.glowIntensity"
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            class="w-full"
          />
          <span class="text-xs text-gray-500">{{ customization.glowIntensity }}</span>
        </div>

        <!-- Border Color -->
        <div>
          <label class="block text-sm font-medium mb-2">Border Color</label>
          <select v-model="customization.borderColor" class="w-full p-2 rounded border">
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="gold">Gold</option>
          </select>
        </div>

        <!-- Glow Color -->
        <div>
          <label class="block text-sm font-medium mb-2">Glow Color</label>
          <select v-model="customization.glowColor" class="w-full p-2 rounded border">
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="gold">Gold</option>
          </select>
        </div>

        <!-- Animation Speed -->
        <div>
          <label class="block text-sm font-medium mb-2">Animation Speed</label>
          <input
            v-model.number="customization.animationSpeed"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            class="w-full"
          />
          <span class="text-xs text-gray-500">{{ customization.animationSpeed }}s</span>
        </div>

        <!-- Border Radius -->
        <div>
          <label class="block text-sm font-medium mb-2">Border Radius</label>
          <input
            v-model.number="customization.borderRadius"
            type="range"
            min="0"
            max="30"
            step="2"
            class="w-full"
          />
          <span class="text-xs text-gray-500">{{ customization.borderRadius }}px</span>
        </div>

        <!-- Effect Size -->
        <div>
          <label class="block text-sm font-medium mb-2">Effect Size</label>
          <input
            v-model.number="customization.effectSize"
            type="range"
            min="300"
            max="800"
            step="50"
            class="w-full"
          />
          <span class="text-xs text-gray-500">{{ customization.effectSize }}px</span>
        </div>

        <!-- Effect Type -->
        <div>
          <label class="block text-sm font-medium mb-2">Effect Type</label>
          <select v-model="customization.effectType" class="w-full p-2 rounded border">
            <option value="radial">Radial</option>
            <option value="linear">Linear</option>
            <option value="spotlight">Spotlight</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div class="flex items-end">
          <button
            @click="resetCustomization"
            class="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded
              transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Hover Effect Demo -->
    <HoverContainer
      :items="frameworks"
      :item-min-width="220"
      :item-max-width="320"
      :row-padding="16"
      :col-padding="16"
    >
      <template #default="{ item, index }">
        <HoverCard
          :customization="customization"
          class="aspect-square p-4 flex flex-col items-center justify-center
            bg-[var(--background-fade)] h-full w-full"
        >
          <div class="flex-1 flex items-center justify-center">
            <img
              :src="item.img"
              :alt="item.name"
              class="h-full max-h-[100px] aspect-square object-center object-contain mb-4"
            />
          </div>
          <div class="text-lg font-bold mb-2">{{ item.name }}</div>
          <div class="text-sm text-gray-500 text-center">{{ item.description }}</div>
        </HoverCard>
      </template>
    </HoverContainer>
  </div>
</template>

<script setup>
const frameworks = [
  {
    name: "React",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "A JavaScript library for building user interfaces.",
  },
  {
    name: "Vue.js",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    description: "The Progressive JavaScript Framework.",
  },
  {
    name: "Angular",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    description: "One framework. Mobile & desktop.",
  },
  {
    name: "Svelte",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg",
    description: "Cybernetically enhanced web apps.",
  },
  {
    name: "Ember.js",
    img: "https://emberjs.com/images/brand/ember-tomster-lockup-4c.svg",
    description: "A framework for ambitious web developers.",
  },
  {
    name: "Solid.js",
    img: "https://www.solidjs.com/img/logo/without-wordmark/logo.png",
    description: "A declarative, efficient, and flexible JavaScript library.",
  },
];

// Customization reactive state
const customization = ref({
  borderIntensity: 0.4,
  glowIntensity: 0.06,
  borderColor: "white",
  glowColor: "white",
  animationSpeed: 0.4,
  borderRadius: 10,
  effectSize: 500,
  effectType: "radial",
});

// Reset function
const resetCustomization = () => {
  customization.value = {
    borderIntensity: 0.4,
    glowIntensity: 0.06,
    borderColor: "white",
    glowColor: "white",
    animationSpeed: 0.4,
    borderRadius: 10,
    effectSize: 500,
    effectType: "radial",
  };
};
</script>
