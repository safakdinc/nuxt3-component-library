<template>
  <div class="w-full h-[7500px]" ref="scrollContainer">
    <div ref="container" class="w-full h-screen sticky left-0 top-0"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const container = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
const renderer = new CSS3DRenderer();

let cylinder = new THREE.Object3D();

scene.add(cylinder);

const radius = window.innerWidth / 1.8;
const items = [1, 2, 3, 4, 5, 6];
const imageUrl =
  'https://plus.unsplash.com/premium_photo-1677511580659-f5fa0675a547?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

onMounted(() => {
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  camera.position.z = 1800;

  addObjects();
  addScrollTrigger();
  animate();

  window.addEventListener('resize', onWindowResize);
});

function addObjects() {
  items.forEach((_, index) => {
    const element = document.createElement('div');
    element.style.width = '650px';
    element.style.height = '450px';
    element.style.backgroundImage = `url(${imageUrl})`;
    element.style.backgroundSize = 'cover';
    const object = new CSS3DObject(element);
    const angle = (index * Math.PI) / 3;
    console.log(angle);
    object.position.setFromSphericalCoords(radius, Math.PI / 2, angle);
    object.position.y = (450 / 3) * 2 * -index;
    object.lookAt(cylinder.position.x, object.position.y, cylinder.position.z);
    cylinder.add(object);
  });
  cylinder.rotation.y = -Math.PI / 5;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

onBeforeUnmount(() => {
  if (container.value) {
    container.value.removeChild(renderer.domElement);
  }
  window.removeEventListener('resize', onWindowResize);
});

const scrollContainer = ref();

function addScrollTrigger() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollContainer.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: true
    }
  });
  tl.to(cylinder.rotation, {
    y: -Math.PI * 2
  });
  tl.to(
    cylinder.position,
    {
      y: (450 / 3) * 2.5 * items.length
    },
    '<'
  );
}
</script>

<style scoped></style>
