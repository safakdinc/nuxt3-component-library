<template>
  <div ref="container" class="w-full h-full">
    <!-- 3D scene will be rendered here -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = ref(null);
let scene, camera, renderer, controls;

const props = defineProps({
  elements: {
    type: Array,
    required: true
  }
});

onMounted(() => {
  initScene();
  animate();
  window.addEventListener('resize', onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  controls.dispose();
});

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 500;

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  addElementsToScene();
}

function addElementsToScene() {
  props.elements.forEach(element => {
    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = element.html;
    const cssObject = new CSS3DObject(htmlElement);
    cssObject.position.set(element.position.x, element.position.y, element.position.z);
    scene.add(cssObject);
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
</script>
