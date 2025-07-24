<template></template>
<script setup lang="ts">
// In your Vue component or main application file

const cardData = {
  title: "My Awesome Card",
  badge: "New",
  description: "This is a description of my card.",
  tags: ["threejs", "konva", "webworker"],
  date: "2025-06-20",
  image: "https://images.pexels.com/photos/29214035/pexels-photo-29214035.jpeg",
};

async function createCard() {
  try {
    const { foreground, background } = await generateCardTextures(cardData);
    console.log("Foreground Texture:", foreground);
    console.log("Background Texture:", background);
    // Now you can use these `foreground` and `background` textures with your Three.js materials
    // For example:
    // const material = new THREE.MeshBasicMaterial({ map: foreground, transparent: true });
    // const backgroundMaterial = new THREE.MeshBasicMaterial({ map: background });
  } catch (error) {
    console.error("Failed to create card textures:", error);
  }
}

createCard();
</script>
