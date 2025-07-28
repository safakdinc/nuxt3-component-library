<!-- components/GridDistortion.vue -->
<template>
  <div ref="container" class="h-full relative flex justify-center items-center">
    <img
      ref="image"
      class="h-full opacity-0 pointer-events-none object-cover object-center"
      :src="props.src"
    />
  </div>
</template>

<script setup>
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture, Vec2 } from "ogl";
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const container = ref(null);
const image = ref(null);

let renderer, scene, camera, planeMesh, texture, program;

let easeFactor = 0.02;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let mouseStopTimeout;
let aberrationIntensity = 0.0;
let lastPosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

const vertexShader = `
    attribute vec2 uv;
    attribute vec3 position;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    precision highp float;
    
    varying vec2 vUv;
    uniform sampler2D u_texture;    
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;
    uniform vec2 u_resolution;
    uniform vec2 u_imageResolution;

    void main() {
        // Calculate aspect ratios
        vec2 ratio = vec2(
            min((u_resolution.x / u_resolution.y) / (u_imageResolution.x / u_imageResolution.y), 1.0),
            min((u_resolution.y / u_resolution.x) / (u_imageResolution.y / u_imageResolution.x), 1.0)
        );
        
        // Center and scale UV coordinates to preserve aspect ratio
        vec2 aspectUv = (vUv - 0.5) * ratio + 0.5;
        
        vec2 gridUV = floor(aspectUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
        
        vec2 mouseDirection = u_mouse - u_prevMouse;
        
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
 
        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = aspectUv - uvOffset;

        // Check if UV is within valid range to prevent texture bleeding
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
        }

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
`;

const init = () => {
  // Get container dimensions
  const width = container.value.offsetWidth;
  const height = container.value.offsetHeight;

  // Create renderer
  renderer = new Renderer({ width, height });
  container.value.appendChild(renderer.gl.canvas);
  renderer.gl.canvas.style.position = "absolute";

  // Create camera
  camera = new Camera(renderer.gl, { fov: 80 });
  camera.position.z = 1;

  // Create scene
  scene = new Transform();

  // Load texture
  texture = new Texture(renderer.gl);
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    texture.image = img;

    // Calculate aspect ratio of the loaded texture
    const imageAspect = img.width / img.height;
    const containerAspect = width / height;

    // Always use a square plane and handle aspect ratio in the shader
    const planeWidth = 2;
    const planeHeight = 2;

    // Create plane geometry and program
    const geometry = new Plane(renderer.gl, { width: planeWidth, height: planeHeight });

    program = new Program(renderer.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_mouse: { value: new Vec2(0.5, 0.5) },
        u_prevMouse: { value: new Vec2(0.5, 0.5) },
        u_aberrationIntensity: { value: 0.0 },
        u_texture: { value: texture },
        u_resolution: { value: new Vec2(width, height) },
        u_imageResolution: { value: new Vec2(img.width, img.height) },
      },
    });

    planeMesh = new Mesh(renderer.gl, { geometry, program });
    planeMesh.setParent(scene);

    // Render the scene
    renderer.render({ scene, camera });
  };
  img.src = props.src;
};

function animateScene() {
  requestAnimationFrame(animateScene);

  if (!planeMesh || !program) return;

  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  program.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
  program.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

  aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
  program.uniforms.u_aberrationIntensity.value = aberrationIntensity;

  renderer.render({ scene, camera });
}

// Handle window resize
const handleResize = () => {
  if (!container.value || !renderer) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  // Update renderer
  renderer.setSize(width, height);

  // Update camera
  camera.perspective({ fov: 80, aspect: width / height });

  // Update resolution uniform
  if (program && program.uniforms.u_resolution) {
    program.uniforms.u_resolution.value.set(width, height);
  }

  renderer.render({ scene, camera });
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

  // Clean up OGL resources
  if (planeMesh && planeMesh.geometry) {
    planeMesh.geometry = null;
  }
  if (program) {
    program = null;
  }
  if (texture) {
    texture = null;
  }
  if (renderer) {
    renderer = null;
  }
});
</script>
