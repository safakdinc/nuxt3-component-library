<template>
  <div ref="container" @mousemove="mouseMove" @mouseleave="resetPositions" class="scene-container">
    <slot></slot>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

const props = defineProps({
  horizontalMoveMultiplier: {
    type: Number,
    default: 2,
  },
  verticalMoveMultiplier: {
    type: Number,
    default: 2,
  },
});

const container = ref();
const scene = new THREE.Scene();
const width = ref(0);
const height = ref(0);
const radius = ref(0);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.lookAt(0, 0, 0);

const css3DRenderer = new CSS3DRenderer();
css3DRenderer.domElement.classList.add("absolute", "top-0", "left-0");

function updateDimensions() {
  if (container.value) {
    width.value = container.value.clientWidth;
    height.value = container.value.clientHeight;
    radius.value = Math.max(width.value, height.value) * 0.35;

    camera.aspect = width.value / height.value;
    calculateCameraPosition();
    css3DRenderer.setSize(width.value, height.value);
    camera.updateProjectionMatrix();
  }
}

onMounted(() => {
  if (container.value) {
    container.value.appendChild(css3DRenderer.domElement);
    updateDimensions();

    const items = container.value.querySelectorAll(".globe-item");
    items.forEach((item) => {
      const htmlElement = document.createElement("div");
      htmlElement.innerHTML = item.innerHTML;
      const cssObject = new CSS3DObject(htmlElement);
      const positions = getInitialPositions(item);
      cssObject.position.set(
        calculatePosition(positions.x),
        calculatePosition(positions.y),
        calculatePosition(positions.z),
      );
      scene.add(cssObject);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      getCSS3DObjects().forEach((object) => {
        object.lookAt(0, 0, radius.value / 15);
      });
      css3DRenderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", updateDimensions);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateDimensions);
});

function mapRange(value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function calculateCameraPosition() {
  const mappedValue = width.value.map(350, 1268, 3.0, 1.2);
  camera.position.set(0, 0, radius.value * mappedValue);
}

function getInitialPositions(item) {
  const element = item.querySelector(".item");
  return {
    x: parseFloat(element.getAttribute("data-initial-x")),
    y: parseFloat(element.getAttribute("data-initial-y")),
    z: parseFloat(element.getAttribute("data-initial-z")),
  };
}

function calculatePosition(factor) {
  return radius.value * factor;
}

function mouseMove(event) {
  const rect = container.value.getBoundingClientRect();
  const mouseX = ((event.clientX - rect.left) / width.value) * 2 - 1;
  const rotationY = mouseX * (Math.PI / 10) * props.horizontalMoveMultiplier;
  gsap.to(scene.rotation, {
    duration: 2,
    y: rotationY,
    ease: "back.out(1.7)",
  });
  const scaleFactor = (event.clientY - rect.top - height.value / 2) / height.value / 3.5;

  getCSS3DObjects().forEach((object) => {
    const positions = getInitialPositions(object.element);
    gsap.to(object.position, {
      duration: 2,
      y:
        calculatePosition(positions.y) +
        radius.value * (scaleFactor * props.verticalMoveMultiplier),
      ease: "back.out(1.7)",
    });
  });
}

function resetPositions() {
  gsap.to(scene.rotation, {
    duration: 2,
    y: 0,
    ease: "back.out(1.7)",
  });
  getCSS3DObjects().forEach((object) => {
    const positions = getInitialPositions(object.element);
    gsap.to(object.position, {
      duration: 2,
      x: calculatePosition(positions.x),
      y: calculatePosition(positions.y),
      z: calculatePosition(positions.z),
      ease: "back.out(1.7)",
    });
  });
}

function getCSS3DObjects() {
  const css3DObjects = [];
  scene.traverse((object) => {
    if (object instanceof CSS3DObject) {
      css3DObjects.push(object);
    }
  });
  return css3DObjects;
}
</script>

<style scoped>
.scene-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
