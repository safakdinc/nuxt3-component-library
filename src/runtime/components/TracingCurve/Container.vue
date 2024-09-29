<template>
  <div ref="itemsContainer" class="absolute top-0 left-0 opacity-0">
    <TracingCurveItem
      v-for="(data, index) in props.curveData"
      :key="index"
      :title="data.item.title"
      :subtitle="data.item.subtitle"
      :texts="data.item.texts"></TracingCurveItem>
  </div>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const props = defineProps({
  curveData: {
    type: Array,
    required: true
  },
  triggerElement: {
    default: window
  }
});

const threeContainer = ref(null);
const itemsContainer = ref();
const scene = new THREE.Scene();

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(window.innerWidth / 3, window.innerWidth / 3.5, 0);
camera.rotation.x = Math.PI / -4;

const lines = ref([]);

onMounted(() => {
  props.curveData.forEach((data, index) => {
    let object = {
      start: { x: data.line.start.x, y: data.line.start.y, z: data.line.start.z },
      end: { x: data.line.end.x, y: data.line.end.y, z: data.line.end.z },
      curvature: { x: data.line.curvature.x, y: data.line.curvature.y }
    };
    lines.value.push(object);
  });
  threeContainer.value.appendChild(renderer.domElement);
  scene.rotation.x = Math.PI / -2;
  setTimeout(() => {
    setupScrollTrigger();
    createScrollTrigger();
  }, 100);
  createMultipleCurvedLines();
  animate();
});

function addCustomDivsToLines(line, bbox, index, item) {
  const cssObject = new CSS3DObject(item);
  const itemRect = item.getBoundingClientRect();
  const itemWidth = itemRect.width;
  const itemHeight = itemRect.height;
  cssObject.position.x = line.start.x - threeContainer.value.getBoundingClientRect().width / 2;
  cssObject.position.y = -(line.start.y - threeContainer.value.getBoundingClientRect().height / 2);
  cssObject.position.z = 0;
  cssObject.rotation.x = Math.PI / 4;

  cssObject.position.x += itemWidth / 2;
  cssObject.position.y += (itemHeight / 2) * Math.sin(Math.PI / 4);
  cssObject.position.z += (itemHeight / 2) * Math.cos(Math.PI / 4);

  return cssObject;
}

function createMultipleCurvedLines() {
  let items = itemsContainer.value.querySelectorAll('.item');
  let lastBbox = { x: 0, y: 0, width: 900, height: 90 };
  lines.value.forEach((line, index) => {
    const { svgElement, bbox } = createSVGElement(line.start, line.end, line.curvature, index);
    const cssObject = new CSS3DObject(svgElement);
    const group = addCustomDivsToLines(line, lastBbox, index, items[index]);
    lastBbox = bbox;
    scene.add(group);
    scene.add(cssObject);
  });
}

function createSVGElement(start, end, curvature, index) {
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNamespace, 'svg');
  svgElement.classList.add('overflow-visible');
  svgElement.setAttribute('width', '100%');
  svgElement.setAttribute('height', '100%');
  svgElement.style.position = 'absolute';
  svgElement.style.top = '0';
  svgElement.style.left = '0';
  svgElement.style.width = '100%';
  svgElement.style.height = '100%';

  const path = document.createElementNS(svgNamespace, 'path');
  const d = calculateCurvedPath(start, end, curvature);
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'white');
  path.setAttribute('stroke-width', '4');
  path.setAttribute('fill', 'none');

  svgElement.appendChild(path);

  const orangePath = document.createElementNS(svgNamespace, 'path');
  orangePath.classList.add(`orange-path-${index}`);
  orangePath.setAttribute('d', d);
  orangePath.setAttribute('stroke', 'orange');
  orangePath.setAttribute('stroke-width', '4');
  orangePath.setAttribute('fill', 'none');
  svgElement.appendChild(orangePath);

  document.body.appendChild(svgElement);
  let bbox = orangePath.getBBox();
  svgElement.remove();

  return { svgElement, bbox };
}

function calculateCurvedPath(start, end, curvature) {
  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  // Calculate midpoint for x-axis
  const midX = (startX + endX) / 2;

  // Calculate control point
  const controlX = midX + curvature.x;
  const controlY = startY - curvature.y; // You can adjust this if you want the curve to go up or down

  const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
  return d;
}

function setupScrollTrigger() {
  const items = threeContainer.value.querySelectorAll('.item');
  lines.value.forEach((_, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: threeContainer.value,
        start: `top+=${index * 800} top`,
        end: `top+=${(index + 1) * 800}`,
        scrub: true,
        scroller: props.triggerElement,
        onEnter: () => open(items[index]),
        onEnterBack: () => open(items[index]),
        onLeaveBack: () => close(items[index]),
        onLeave: () => close(items[index])
      }
    });

    const orangeLine = document.querySelector(`.orange-path-${index}`);
    if (orangeLine) {
      const length = orangeLine.getTotalLength();

      gsap.set(orangeLine, {
        strokeDasharray: length,
        strokeDashoffset: length
      });

      tl.to(orangeLine, {
        strokeDashoffset: 0,
        ease: 'none'
      });
    }

    let container = items[index].querySelector('.container');
    let circle = items[index].querySelector('.circle');
    let line = items[index].querySelector('.line');
    let text = items[index].querySelector('.text');
    let paragraph = items[index].querySelectorAll('.paragraph');

    gsap.set(container, {
      translateY: 85
    });
    gsap.set(circle, {
      scale: 0
    });
    gsap.set(line, {
      maxHeight: 0
    });
    gsap.set(text, {
      opacity: 0
    });
    gsap.set(paragraph, {
      opacity: 0,
      translateX: -20
    });
  });
}

function open(item) {
  let container = item.querySelector('.container');
  let circle = item.querySelector('.circle');
  let line = item.querySelector('.line');
  let text = item.querySelector('.text');
  let paragraph = item.querySelectorAll('.paragraph');
  const tl = gsap.timeline();
  let duration = 0.15;
  tl.to(container, {
    translateY: 0,
    duration: duration
  });
  tl.to(
    circle,
    {
      scale: 1,
      duration: duration
    },
    '<'
  );
  tl.to(
    line,
    {
      maxHeight: 170,
      duration: duration
    },
    '<'
  );
  tl.to(
    text,
    {
      opacity: 1,
      duration: duration
    },
    '<'
  );
  tl.to(
    paragraph,
    {
      opacity: 1,
      translateX: 0,
      duration: duration
    },
    '<+=0.1'
  );
}

function close(item) {
  let container = item.querySelector('.container');

  let circle = item.querySelector('.circle');
  let line = item.querySelector('.line');
  let text = item.querySelector('.text');
  let paragraph = item.querySelectorAll('.paragraph');
  const tl = gsap.timeline();
  let duration = 0.15;
  tl.to(container, {
    translateY: line.getBoundingClientRect().height / 2,
    duration: duration
  });
  tl.to(
    circle,
    {
      scale: 0,
      duration: duration
    },
    '<'
  );
  tl.to(
    line,
    {
      maxHeight: 0,
      duration: duration
    },
    '<'
  );
  tl.to(
    text,
    {
      opacity: 0,
      duration: 0.02
    },
    '<'
  );
  tl.to(
    paragraph,
    {
      opacity: 0,
      translateX: -20,
      duration: 0.02
    },
    '<+=0.1'
  );
}

function createScrollTrigger() {
  const tl = gsap.timeline();

  tl.fromTo(
    camera.position,
    {
      z: -100
    },
    {
      z: lines.value.length * 600,
      ease: 'none'
    }
  );
  tl.pause();
  setTimeout(() => {
    ScrollTrigger.create({
      animation: tl,
      trigger: threeContainer.value,
      start: 'top top',
      end: `+=${(lines.value.length + 1) * 800}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      scroller: props.triggerElement
    });
  }, 10);
}

onMounted(() => {
  window.addEventListener('resize', updateDimensions);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions);
});

function updateDimensions() {}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
