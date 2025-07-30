<template>
  <div ref="itemsContainer" class="absolute top-0 left-0 opacity-0">
    <TracingCurveItem
      v-for="(data, index) in props.curveData"
      :key="index"
      :title="data.item.title"
      :subtitle="data.item.subtitle"
      :texts="data.item.texts"
    ></TracingCurveItem>
  </div>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from "vue";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

interface CurveLine {
  start: { x: number; y: number; z: number };
  end: { x: number; y: number; z: number };
  curvature: { x: number; y: number };
}

interface CurveItem {
  title: string;
  subtitle: string;
  texts: string[];
}

interface CurveData {
  line: CurveLine;
  item: CurveItem;
}

const props = defineProps<{
  curveData: CurveData[];
  triggerElement?: any;
}>();

const threeContainer = ref<HTMLElement | null>(null);
const itemsContainer = ref<HTMLElement | null>(null);

const scene = new THREE.Scene();
const renderer = new CSS3DRenderer();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const lines: Ref<CurveLine[]> = ref([]);

const ANIMATION_DURATION = 0.15;
const SCROLL_TRIGGER_HEIGHT = 800;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// Initialize Three.js components
function initializeThreeJS() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.rotation.x = Math.PI / -2;

  camera.position.set(window.innerWidth / 10, window.innerWidth / 3.5, 0);
  camera.rotation.x = Math.PI / -4;
}

// Process curve data into line objects
function processCurveData(): void {
  lines.value = props.curveData.map((data) => ({
    start: { ...data.line.start },
    end: { ...data.line.end },
    curvature: { ...data.line.curvature },
  }));
}

// Calculate curved path for SVG
function calculateCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  curvature: { x: number; y: number },
): string {
  const midX = (start.x + end.x) / 2;
  const controlX = midX + curvature.x;
  const controlY = start.y - curvature.y;
  return `M ${start.x},${start.y} Q ${controlX},${controlY} ${end.x},${end.y}`;
}

// Create SVG element with path
function createSVGElement(
  start: { x: number; y: number },
  end: { x: number; y: number },
  curvature: { x: number; y: number },
  index: number,
): { svgElement: SVGSVGElement; bbox: DOMRect } {
  const svgElement = document.createElementNS(SVG_NAMESPACE, "svg");
  configureSVGElement(svgElement);

  const pathData = calculateCurvedPath(start, end, curvature);

  // Create white base path
  const basePath = createSVGPath(pathData, "white", "4");
  svgElement.appendChild(basePath);

  // Create orange animated path
  const orangePath = createSVGPath(pathData, "orange", "4");
  orangePath.classList.add(`orange-path-${index}`);
  svgElement.appendChild(orangePath);

  // Get bounding box
  document.body.appendChild(svgElement);
  const bbox = orangePath.getBBox();
  svgElement.remove();

  return { svgElement, bbox };
}

// Configure SVG element properties
function configureSVGElement(svgElement: SVGSVGElement): void {
  svgElement.classList.add("overflow-visible");
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");

  Object.assign(svgElement.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  });
}

// Create SVG path element
function createSVGPath(pathData: string, color: string, strokeWidth: string): SVGPathElement {
  const path = document.createElementNS(SVG_NAMESPACE, "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", strokeWidth);
  path.setAttribute("fill", "none");
  return path;
}

// Position CSS3D object for items
function createCSS3DObjectForItem(
  line: CurveLine,
  item: Element | null | undefined,
): CSS3DObject | null {
  if (!item || !threeContainer.value) return null;
  // Cast to HTMLElement for CSS3DObject
  const cssObject = new CSS3DObject(item as HTMLElement);
  const itemRect = (item as HTMLElement).getBoundingClientRect();
  const containerRect = threeContainer.value.getBoundingClientRect();
  // Base position
  cssObject.position.x = line.start.x - containerRect.width / 2;
  cssObject.position.y = -(line.start.y - containerRect.height / 2);
  cssObject.position.z = 0;
  cssObject.rotation.x = Math.PI / 4;
  // Adjust for item dimensions
  cssObject.position.x += itemRect.width / 2;
  cssObject.position.y += (itemRect.height / 2) * Math.sin(Math.PI / 4);
  cssObject.position.z += (itemRect.height / 2) * Math.cos(Math.PI / 4);
  return cssObject;
}

// Create and add all curved lines to scene
function createCurvedLines(): void {
  const items = itemsContainer.value?.querySelectorAll(".item") ?? [];
  lines.value.forEach((line, index) => {
    const { svgElement } = createSVGElement(line.start, line.end, line.curvature, index);
    // Cast svgElement to HTMLElement for CSS3DObject
    const svgObject = new CSS3DObject(svgElement as unknown as HTMLElement);
    const itemObject = createCSS3DObjectForItem(line, items[index]);
    scene.add(svgObject);
    if (itemObject) scene.add(itemObject);
  });
}

// Calculate cumulative camera position
function calculateCumulativePosition(index: number): { x: number; y: number } {
  const totalMovement = { x: 0, y: 0 };
  for (let i = 0; i <= index; i++) {
    const data = props.curveData[i];
    if (!data) continue;
    totalMovement.x += data.line.end.x - data.line.start.x;
    totalMovement.y += data.line.end.y - data.line.start.y;
  }
  return {
    x: totalMovement.x / 1.4,
    y: totalMovement.y,
  };
}

// Create custom ease for animation
function createCustomEase(
  index: number,
  totalX: number,
  totalY: number,
  curvature: { x: number; y: number },
): { customEaseXName: string; customEaseYName: string } {
  const customEaseXName = `customX-${index}`;
  const customEaseYName = `customY-${index}`;
  let xPath = "M0,0 L1,1";
  if (Math.abs(totalX) > 10) {
    const normalizedControlX = Math.max(0.1, Math.min(0.9, curvature.x / totalX + 0.5));
    xPath = `M0,0 Q${normalizedControlX},0.3 1,1`;
  }
  let yPath = "M0,0 L1,1";
  if (Math.abs(totalY) > 10) {
    const normalizedControlY = Math.max(0.1, Math.min(0.9, curvature.y / totalY + 0.5));
    yPath = `M0,0 Q${normalizedControlY},0.3 1,1`;
  }
  if (!CustomEase.get(customEaseXName)) {
    CustomEase.create(customEaseXName, xPath);
  }
  if (!CustomEase.get(customEaseYName)) {
    CustomEase.create(customEaseYName, yPath);
  }
  return { customEaseXName, customEaseYName };
}

// Animate item opening
function animateItemOpen(item: Element): void {
  const elements = getItemElements(item);
  const tl = gsap.timeline();
  tl.to(elements.container, { translateY: 0, duration: ANIMATION_DURATION })
    .to(elements.circle, { scale: 1, duration: ANIMATION_DURATION }, "<")
    .to(elements.line, { maxHeight: 170, duration: ANIMATION_DURATION }, "<")
    .to(elements.text, { opacity: 1, duration: ANIMATION_DURATION }, "<")
    .to(
      elements.paragraphs,
      {
        opacity: 1,
        translateX: 0,
        duration: ANIMATION_DURATION,
      },
      "<+=0.1",
    );
}

// Animate item closing
function animateItemClose(item: Element): void {
  const elements = getItemElements(item);
  const tl = gsap.timeline();
  const lineHeight = elements.line.getBoundingClientRect().height / 2;
  tl.to(elements.container, { translateY: lineHeight, duration: ANIMATION_DURATION })
    .to(elements.circle, { scale: 0, duration: ANIMATION_DURATION }, "<")
    .to(elements.line, { maxHeight: 0, duration: ANIMATION_DURATION }, "<")
    .to(elements.text, { opacity: 0, duration: 0.02 }, "<")
    .to(
      elements.paragraphs,
      {
        opacity: 0,
        translateX: -20,
        duration: 0.02,
      },
      "<+=0.1",
    );
}

// Get item DOM elements
function getItemElements(item: Element): {
  container: Element;
  circle: Element;
  line: Element;
  text: Element;
  paragraphs: NodeListOf<Element>;
} {
  return {
    container: item.querySelector(".container")!,
    circle: item.querySelector(".circle")!,
    line: item.querySelector(".line")!,
    text: item.querySelector(".text")!,
    paragraphs: item.querySelectorAll(".paragraph"),
  };
}

// Initialize item states
function initializeItemStates(): void {
  const items = threeContainer.value?.querySelectorAll(".item") ?? [];
  items.forEach((item) => {
    const elements = getItemElements(item);
    gsap.set(elements.container, { translateY: 85 });
    gsap.set(elements.circle, { scale: 0 });
    gsap.set(elements.line, { maxHeight: 0 });
    gsap.set(elements.text, { opacity: 0 });
    gsap.set(elements.paragraphs, { opacity: 0, translateX: -20 });
  });
}

// Create scroll trigger for individual line
function createLineScrollTrigger(index: number): void {
  const items = threeContainer.value?.querySelectorAll(".item") ?? [];
  const orangeLine = document.querySelector(`.orange-path-${index}`) as SVGPathElement | null;
  if (!orangeLine) return;
  const length = orangeLine.getTotalLength();
  const lineData = props.curveData[index]?.line;
  const totalMovement = calculateCumulativePosition(index);
  gsap.set(orangeLine, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: threeContainer.value,
      start: `top+=${index * SCROLL_TRIGGER_HEIGHT} top`,
      end: `top+=${(index + 1) * SCROLL_TRIGGER_HEIGHT}`,
      scrub: true,
      scroller: props.triggerElement,
      onEnter: () => items[index] && animateItemOpen(items[index]),
      onEnterBack: () => items[index] && animateItemOpen(items[index]),
      onLeaveBack: () => items[index] && animateItemClose(items[index]),
      onLeave: () => items[index] && animateItemClose(items[index]),
    },
  });
  tl.to(orangeLine, { strokeDashoffset: 0, ease: "none" });
  tl.to(
    camera.position,
    {
      x: totalMovement.x,
      ease: "power2.out",
    },
    "<",
  ).to(
    camera.position,
    {
      z: totalMovement.y,
      ease: "power2.out",
    },
    "<",
  );
}

// Setup all scroll triggers
function setupScrollTriggers(): void {
  initializeItemStates();
  lines.value.forEach((_, index) => {
    createLineScrollTrigger(index);
  });
}

// Create main scroll trigger for pinning
function createMainScrollTrigger(): void {
  const tl = gsap.timeline();
  tl.pause();
  ScrollTrigger.create({
    animation: tl,
    trigger: threeContainer.value,
    start: "top top",
    end: `+=${(lines.value.length + 1) * SCROLL_TRIGGER_HEIGHT}`,
    scrub: 1,
    pin: true,
    pinSpacing: true,
    scroller: props.triggerElement,
  });
}

// Handle window resize
function handleResize(): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  ScrollTrigger.refresh();
}

// Animation loop
function animate(): void {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Component lifecycle

onMounted(() => {
  initializeThreeJS();
  processCurveData();
  if (threeContainer.value) {
    threeContainer.value.appendChild(renderer.domElement);
  }
  setTimeout(() => {
    setupScrollTriggers();
    createMainScrollTrigger();
  }, 100);
  createCurvedLines();
  animate();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
