<template>
  <div ref="container" :class="twMerge('w-full h-[60vh] relative', props.class)">
    <div
      @mousedown="onClick"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @touchmove="onTouchMove"
      :class="twMerge('absolute top-[40%] translate-y-[-50%] left-0 w-full h-[80%] z-[100]', controlContainerClass)"></div>
  </div>
</template>

<script setup>
import { twMerge } from 'tailwind-merge';

import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import gsap from 'gsap';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  class: {
    type: String,
    default: ''
  },
  controlContainerClass: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 450
  },
  height: {
    type: Number,
    default: 600
  }
});

const container = ref(null);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 1, 5000);
let renderer;

const radius = ref(750);

let carousel;

if (process.client) {
  renderer = new CSS3DRenderer();
  camera.aspect = window.innerWidth / window.innerHeight;
}

onMounted(() => {
  if (!process.client) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  camera.position.z = 550;
  camera.position.y = 70;

  carousel = new THREE.Object3D();
  scene.add(carousel);

  props.items.forEach((image, index) => {
    const element = document.createElement('div');
    element.style.width = `${props.width}px`;
    element.style.height = `${props.height}px`;
    element.classList.add('rounded-lg');
    element.style.backgroundImage = `url(${image})`;
    element.style.backgroundSize = 'cover';
    const object = new CSS3DObject(element);
    const angle = (index / props.items.length) * Math.PI * 2;
    object.position.setFromSphericalCoords(radius.value, Math.PI / 2, angle);
    object.lookAt(carousel.position);

    carousel.add(object);
  });

  carousel.rotation.y = THREE.MathUtils.degToRad(-16);

  gsap.set(carousel.rotation, {
    x: THREE.MathUtils.degToRad(20),
    y: 0,
    z: 0
  });
  startContinuousRotation();

  window.addEventListener('resize', onWindowResize);
});

function startContinuousRotation() {
  gsap.to(carousel.rotation, {
    y: carousel.rotation.y + Math.PI * 2,
    duration: 20,
    ease: 'linear',
    repeat: -1,
    onUpdate: () => {
      renderer.render(scene, camera);
    }
  });
}

const mouseDownX = ref(0);
const isClicked = ref(0);

function onClick() {
  if (!process.client) return;
  mouseDownX.value = event.clientX;
  isClicked.value = true;
  gsap.killTweensOf(carousel.rotation);
}

function onMouseUp() {
  if (!process.client) return;
  isClicked.value = false;
  lastPercentage.value = 0;
  startContinuousRotation();
}

const lastPercentage = ref(0);

function onMouseMove() {
  if (!isClicked.value || !process.client) {
    return;
  }
  const mouseDelta = mouseDownX.value - event.clientX;
  const maxDelta = window.innerWidth;
  let percentage = (mouseDelta / maxDelta) * -50;
  gsap.to(carousel.rotation, {
    y: carousel.rotation.y + (lastPercentage.value - percentage),
    ease: 'power2.out',
    onUpdate: () => {
      renderer.render(scene, camera);
    }
  });
  lastPercentage.value = percentage;
}

const touchStartX = ref(0);
const touchMoveX = ref(0);

function onTouchStart(event) {
  if (!process.client) return;
  touchStartX.value = event.touches[0].clientX;
  isClicked.value = true;
  gsap.killTweensOf(carousel.rotation);
}

function onTouchMove(event) {
  if (!isClicked.value || !process.client) return;
  event.preventDefault();
  touchMoveX.value = event.touches[0].clientX;
  const touchDelta = touchStartX.value - touchMoveX.value;
  const maxDelta = window.innerWidth;
  let percentage = (touchDelta / maxDelta) * -15;
  gsap.to(carousel.rotation, {
    y: carousel.rotation.y + (lastPercentage.value - percentage),
    ease: 'power2.out',
    onUpdate: () => {
      renderer.render(scene, camera);
    }
  });
  lastPercentage.value = percentage;
}

function onTouchEnd() {
  if (!process.client) return;
  isClicked.value = false;
  lastPercentage.value = 0;
  startContinuousRotation();
}

function onWindowResize() {
  if (!process.client) return;
  const width = container.value.clientWidth;
  const height = container.value.clientHeight;
  radius.value = width / 3;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

onBeforeUnmount(() => {
  if (container.value && process.client) {
    container.value.removeChild(renderer.domElement);
  }
  if (process.client) {
    window.removeEventListener('resize', onWindowResize);
    gsap.killTweensOf(carousel.rotation);
  }
});
</script>
