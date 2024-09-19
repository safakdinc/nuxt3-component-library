<template>
  <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const threeContainer = ref(null);
const scene = new THREE.Scene();

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(window.innerWidth / 4, window.innerWidth / 3.5, 0);
camera.rotation.x = Math.PI / -4;

const svgPaths = [
  { path: "M 0, 0 C 274, 0, 578, 69, 842, 186" },
  {
    path: "M 0, 0 C 157, 81, 409, 347, 522, 603",
  },
  { path: "M 913, 0 C 1014, 268, 791, 453, 454, 585" },
  { path: "M 506, 0 C 284, 37, 290, 523, 584, 688" },
];
const svgWidth = 100;
const svgHeight = 50;

onMounted(() => {
  threeContainer.value.appendChild(renderer.domElement);
  scene.rotation.x = Math.PI / -2;
  placeElements();

  createScrollTrigger();

  animate();
});

function createScrollTrigger() {
  const tl = gsap.timeline();

  tl.fromTo(
    camera.position,
    { z: 0 },
    {
      z: 2500,
      ease: "none", // Ensures linear scaling
    }
  );
  tl.pause();
  setTimeout(() => {
    ScrollTrigger.create({
      animation: tl,
      trigger: threeContainer.value,
      start: "top top",
      end: "+=4000",
      scrub: 2,
      pin: true,
      pinSpacing: true,
    });
  }, 10);
}

function placeElements() {
  let lastEndCoordinates = {
    x: 0,
    y: 0,
  };
  svgPaths.forEach((svgPath, index) => {
    const { svgElement, bbox, pathElement } = createSVGElement(
      svgPath.path,
      "white",
      svgWidth,
      svgHeight
    );
    const dAttribute = svgElement
      .querySelector(".white-path")
      .getAttribute("d");
    const pathCommands = dAttribute.split(" ");
    const startPoint = pathCommands[1].split(",");
    const startX = parseFloat(startPoint[0]);
    const startY = parseFloat(pathCommands[2]);
    const cssObject = new CSS3DObject(svgElement);
    if (index !== 0) {
      cssObject.position.set(
        lastEndCoordinates.x + bbox.width / 2 - startX,
        lastEndCoordinates.y - bbox.height / 2,
        0
      );
    } else {
      cssObject.position.set(0, 0, 0);
    }
    scene.add(cssObject);
    lastEndCoordinates.x = cssObject.position.x + bbox.width / 2;
    lastEndCoordinates.y = cssObject.position.y - bbox.height / 2;
  });
}

const lineIndex = ref(1);

function createLineScrollTrigger(line) {
  const pathLength = line.getTotalLength();
  gsap.fromTo(
    line,
    {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    },
    {
      strokeDasharray: pathLength,
      strokeDashoffset: 0,
      ease: "linear",
      scrollTrigger: {
        trigger: threeContainer.value,
        start: `top+=${window.innerHeight * lineIndex.value + 100} center`,
        end: `top+=${window.innerHeight * (lineIndex.value + 1)} center`,
        scrub: true,
        toggleActions: "play none none reverse",
      },
    }
  );
  lineIndex.value++;
}

const createSVGElement = (pathData, color, width, height) => {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svgElement = document.createElementNS(svgNamespace, "svg");
  svgElement.classList.add("overflow-visible");
  svgElement.classList.add("svgLine");
  svgElement.setAttribute("width", width);
  svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const whitePath = createPath(pathData, "white", "white-path");
  const orangePath = createPath(pathData, "orange", "orange-path");
  createLineScrollTrigger(orangePath);
  svgElement.appendChild(whitePath);
  svgElement.appendChild(orangePath);
  document.body.appendChild(svgElement); // Append temporarily to the DOM
  const bbox = whitePath.getBBox(); // Get bounding box
  svgElement.remove(); // Remove from the DOM
  svgElement.setAttribute("height", bbox.height);
  svgElement.setAttribute("width", bbox.width);
  svgElement.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
  return { svgElement, bbox, whitePath };
};

function createPath(pathData, color, className) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.classList.add(className);
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", color);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-width", 3);
  return path;
}

const animate = () => {
  requestAnimationFrame(animate);
  /*   controls.update(); */

  renderer.render(scene, camera);
};
</script>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
