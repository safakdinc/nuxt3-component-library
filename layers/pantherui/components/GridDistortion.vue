<!-- components/ThreeScene.vue -->
<template>
  <div ref="container" class="h-full relative flex justtify-center items-center">
    <img ref="image" class="h-full opacity-0 pointer-events-none" :src="props.src" />
  </div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const container = ref(null);
const image = ref(null);

let scene, camera, renderer, planeMesh, texture;

let easeFactor = 0.02;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let mouseStopTimeout;
let aberrationIntensity = 0.0;
let lastPosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
`;

const init = () => {
  // Create scene
  scene = new THREE.Scene();

  // Get container dimensions
  const width = container.value.offsetWidth;
  const height = container.value.offsetHeight;

  // Create camera
  camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10);
  camera.position.z = 1;

  // Create renderer with container dimensions
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);
  renderer.domElement.style.position = "absolute";

  // Create texture loader
  const textureLoader = new THREE.TextureLoader();

  // Load texture
  // Note: Replace this URL with your actual image URL
  texture = textureLoader.load(props.src, (loadedTexture) => {
    // Calculate aspect ratio of the loaded texture
    const imageAspect = loadedTexture.image.width / loadedTexture.image.height;
    const containerAspect = width / height;

    // Adjust plane size to maintain image aspect ratio
    let planeWidth = 2;
    let planeHeight = 2;

    if (imageAspect > containerAspect) {
      // Image is wider than container
      planeHeight = planeWidth / imageAspect;
    } else {
      // Image is taller than container
      planeWidth = planeHeight * imageAspect;
    }

    // Create plane with calculated dimensions
    let shaderUniforms = {
      u_mouse: { type: "v2", value: new THREE.Vector2() },
      u_prevMouse: { type: "v2", value: new THREE.Vector2() },
      u_aberrationIntensity: { type: "f", value: 0.0 },
      u_texture: { type: "t", value: texture },
    };

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

    planeMesh = new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader,
        fragmentShader,
      }),
    );
    scene.add(planeMesh);

    // Render the scene
    renderer.render(scene, camera);
  });
};

function animateScene() {
  requestAnimationFrame(animateScene);
  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);

  planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

  aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);

  planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

  renderer.render(scene, camera);
}

// Handle window resize
const handleResize = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);

  // Update plane size if texture is loaded
  if (plane && texture) {
    const imageAspect = texture.image.width / texture.image.height;
    const containerAspect = width / height;

    let planeWidth = 2;
    let planeHeight = 2;

    if (imageAspect > containerAspect) {
      planeHeight = planeWidth / imageAspect;
    } else {
      planeWidth = planeHeight * imageAspect;
    }

    plane.geometry.dispose();
    plane.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  }

  renderer.render(scene, camera);
};

onMounted(() => {
  setTimeout(() => {
    init();
    animateScene();
  }, 500);
  window.addEventListener("resize", handleResize);
  container.value.addEventListener("mousemove", handleMouseMove);
  container.value.addEventListener("mouseenter", handleMouseEnter);
  container.value.addEventListener("mouseleave", handleMouseLeave);
});

function handleMouseMove(event) {
  easeFactor = 0.02;
  let rect = container.value.getBoundingClientRect();
  prevPosition = { ...targetMousePosition };

  targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  targetMousePosition.y = (event.clientY - rect.top) / rect.height;

  aberrationIntensity = 1;
}

function handleMouseEnter(event) {
  easeFactor = 0.02;
  let rect = image.value.getBoundingClientRect();

  mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
  mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
}

function handleMouseLeave() {
  easeFactor = 0.02;
  targetMousePosition = { ...prevPosition };
}

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  // Clean up Three.js resources
  if (planeMesh) {
    scene.remove(planeMesh);
    planeMesh.geometry.dispose();
    planeMesh.material.dispose();
  }
  if (texture) {
    texture.dispose();
  }
  if (renderer) {
    renderer.dispose();
  }
});
</script>
