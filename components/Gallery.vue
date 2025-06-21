<template>
  <div v-if="startPostProcessing" class="infinite-grid-container">
    <div class="vignette-overlay"></div>
    <div class="blur-overlay"></div>
    <TresCanvas v-bind="gl" ref="canvasRef" :outputColorSpace="'srgb'">
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, cameraZ]" :fov="45" :aspect="aspectRatio" :near="1" :far="1000" />

      <TresGroup v-for="(group, index) in tileGroups" :key="index" :ref="el => setGroupRef(el, index)">
        <TresGroup
          v-for="(tile, tileIndex) in tiles"
          :key="tileIndex"
          :position="tile.pos"
          @pointer-enter="handleTilePointerEnter(index, tileIndex)"
          @pointer-leave="handleTilePointerLeave(index, tileIndex)"
          @click="handleTileClick(index, tileIndex)">
          <TresMesh :position="[0, 0, 0]" :ref="el => setBackgroundMeshRef(el, getTileKey(index, tileIndex))">
            <TresPlaneGeometry :args="[TILE_SIZE, TILE_SIZE]" />
            <TresShaderMaterial
              v-if="cardTextures.length > 0"
              :vertex-shader="gaussianBlurVertexShader"
              :fragment-shader="gaussianBlurFragmentShader"
              :uniforms="getStaticBackgroundUniforms(index, tileIndex)"
              :transparent="true" />
          </TresMesh>

          <TresMesh :position="[0, 0, 0]" :ref="el => setForegroundMeshRef(el, getTileKey(index, tileIndex))">
            <TresPlaneGeometry :args="[TILE_SIZE, TILE_SIZE]" />
            <TresMeshBasicMaterial v-if="cardTextures.length > 0" :map="getCardForegroundTexture(index, tileIndex)" :transparent="true" />
          </TresMesh>
        </TresGroup>
      </TresGroup>

      <FishEye v-if="startPostProcessing"></FishEye>
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import { useWindowSize } from '@vueuse/core';
import { CanvasTexture, Mesh, Object3D, ShaderMaterial } from 'three';
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRenderLoop, type TresObject } from '@tresjs/core';
import gsap from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { generateForegroundTexture, generateBackgroundTexture } from '@/utils/createTexture';

import gaussianBlurVertexShader from '@/shaders/gaussianBlurVertex.glsl?raw';
import gaussianBlurFragmentShader from '@/shaders/gaussianBlurFragment.glsl?raw';

gsap.registerPlugin(InertiaPlugin);

interface CardData {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  date: string;
  image?: string;
}

interface Options {
  gridCols?: number;
  gridRows?: number;
  gridGap?: number;
  tileSize?: number;
  baseCameraZ?: number;
  container?: HTMLElement | null;
}

interface Props {
  cardData: CardData[];
  options?: Options;
}

const defaultOptions: Required<Options> = {
  gridCols: 3,
  gridRows: 3,
  gridGap: 0,
  tileSize: 3,
  baseCameraZ: 10,
  container: null
};

const props = withDefaults(defineProps<Props>(), {
  cardData: () => [],
  options: () => ({})
});

const mergedOptions = computed<Required<Options>>(() => ({
  ...defaultOptions,
  ...props.options
}));

// Derive constants from mergedOptions
const GRID_GAP = computed(() => mergedOptions.value.gridGap);
const TILE_SIZE = computed(() => mergedOptions.value.tileSize);
const TILE_SPACE = computed(() => TILE_SIZE.value + GRID_GAP.value);
const GRID_COLS = computed(() => mergedOptions.value.gridCols);
const GRID_ROWS = computed(() => mergedOptions.value.gridRows);
const GRID_WIDTH = computed(() => TILE_SPACE.value * GRID_COLS.value);
const GRID_HEIGHT = computed(() => TILE_SPACE.value * GRID_ROWS.value);
const TOTAL_GRID_WIDTH = computed(() => GRID_WIDTH.value * 3);
const TOTAL_GRID_HEIGHT = computed(() => GRID_HEIGHT.value * 3);

const { width, height } = useWindowSize();

const canvasRef = ref();
const cameraRef = ref<TresObject | null>(null);
const groupRefs = ref<Object3D[]>([]); // Array to store references to TresGroup objects
const foregroundMeshRefs = ref<Map<string, Mesh>>(new Map());
const backgroundMeshRefs = ref<Map<string, Mesh>>(new Map());

interface CardTextureSet {
  foreground: CanvasTexture;
  background: CanvasTexture | null;
}

const cardTextures = ref<CardTextureSet[]>([]);
const currentHoveredTileKey = ref<string>('');

// Store static uniforms to prevent re-creation
const staticUniforms = ref<Map<string, any>>(new Map());

// GSAP Animation Configuration
const hoverTransitionDuration = 0.6;
const hoverEase = 'power2.out';

// Camera and viewport
const aspectRatio = computed(() => width.value / height.value);
const cameraZ = ref(mergedOptions.value.baseCameraZ);
const targetCameraZ = ref(mergedOptions.value.baseCameraZ);

// Direction tracking
const direction = reactive({ x: 1, y: 1 }); // X: 1 for right, -1 for left; Y: 1 for down, -1 for up

// Interaction state
const isDown = ref(false);
const startPosition = reactive({ x: 0, y: 0 });
const scrollPosition = reactive({ x: 0, y: 0 }); // Stores scroll.current when mouse down begins

// Viewport in world units - this is crucial for the infinite scroll logic
const viewport = computed(() => {
  const fov = 45 * (Math.PI / 180);
  const viewHeight = 2 * Math.tan(fov / 2) * cameraZ.value; // Use cameraZ.value for current FOV
  return { width: viewHeight * aspectRatio.value, height: viewHeight };
});

// Dynamically generated tiles
const tiles = computed(() => {
  const generatedTiles = [];
  const startX = -((GRID_COLS.value - 1) / 2) * TILE_SPACE.value;
  const startY = ((GRID_ROWS.value - 1) / 2) * TILE_SPACE.value;

  for (let row = 0; row < GRID_ROWS.value; row++) {
    for (let col = 0; col < GRID_COLS.value; col++) {
      const x = startX + col * TILE_SPACE.value;
      const y = startY - row * TILE_SPACE.value;
      generatedTiles.push({ pos: [x, y, 0] as [number, number, number] });
    }
  }
  return generatedTiles;
});

const tileGroups = ref<Array<{ pos: [number, number, number]; offset: { x: number; y: number } }>>([]);

function initializeTileGroups() {
  const groups = [];
  // Initialize 9 groups (3x3 grid of grids)
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      groups.push({
        pos: [GRID_WIDTH.value * c, GRID_HEIGHT.value * r, 0], // Base position of each group
        offset: { x: 0, y: 0 } // Offset for infinite scrolling, modified in updatePositions
      });
    }
  }
  tileGroups.value = groups;
}

// WebGL rendering config
const gl = {
  antialias: true,
  alpha: true,
  clearColor: '#000000'
};

// Performance optimization state
const isScrolling = ref(false);
const scrollTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const hoverDebounceTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const initialBackgroundOpacity = 0.0;
const hoveredBackgroundOpacity = 1.0;

function setGroupRef(el: any, index: number) {
  if (el) {
    groupRefs.value[index] = el;
  }
}

function setForegroundMeshRef(el: any, key: string) {
  if (el) {
    foregroundMeshRefs.value.set(key, el.parent);
  }
}

function setBackgroundMeshRef(el: any, key: string) {
  if (el) {
    const meshInstance = el as Mesh;
    backgroundMeshRefs.value.set(key, meshInstance);

    if (meshInstance.material instanceof ShaderMaterial && meshInstance.material.uniforms) {
      if (!meshInstance.material.uniforms.uOpacity) {
        meshInstance.material.uniforms.uOpacity = { value: initialBackgroundOpacity };
      }
    }
  }
}

function getTileKey(groupIndex: number, tileIndex: number): string {
  return `${groupIndex}-${tileIndex}`;
}

function getCardTextureIndex(groupIndex: number, tileIndex: number): number {
  const tilesPerGroup = GRID_COLS.value * GRID_ROWS.value;
  return (groupIndex * tilesPerGroup + tileIndex) % props.cardData.length;
}

function getCardForegroundTexture(groupIndex: number, tileIndex: number) {
  if (cardTextures.value.length === 0) return null;
  const textureIndex = getCardTextureIndex(groupIndex, tileIndex);
  return cardTextures.value[textureIndex].foreground;
}

function getCardBackgroundTexture(groupIndex: number, tileIndex: number) {
  if (cardTextures.value.length === 0) return null;
  const textureIndex = getCardTextureIndex(groupIndex, tileIndex);
  return cardTextures.value[textureIndex].background;
}

function getStaticBackgroundUniforms(groupIndex: number, tileIndex: number) {
  const tileKey = getTileKey(groupIndex, tileIndex);

  if (staticUniforms.value.has(tileKey)) {
    return staticUniforms.value.get(tileKey);
  }

  const texture = getCardBackgroundTexture(groupIndex, tileIndex);

  let uniforms;
  if (!texture) {
    uniforms = {
      map: { value: null },
      resolution: { value: [1.0, 1.0] },
      uOpacity: { value: initialBackgroundOpacity }
    };
  } else {
    const texWidth = texture.image?.width || 512;
    const texHeight = texture.image?.height || 512;

    uniforms = {
      map: { value: texture },
      resolution: { value: [texWidth, texHeight] },
      uOpacity: { value: initialBackgroundOpacity }
    };
  }

  staticUniforms.value.set(tileKey, uniforms);
  return uniforms;
}

const scroll = reactive({
  scale: 0.012,
  current: { x: 0, y: 0 },
  last: { x: 0, y: 0 }
});

const scrollTracker = InertiaPlugin.track(scroll.current, 'x,y')[0];

// Position update logic - MODIFIED to use group.offset and directly update groupObject.position
function updatePositions() {
  const scrollX = scroll.current.x;
  const scrollY = scroll.current.y;

  // Update the direction based on current movement
  if (scroll.current.y > scroll.last.y) {
    direction.y = -1; // Moving up (decreasing Y in world space)
  } else if (scroll.current.y < scroll.last.y) {
    direction.y = 1; // Moving down (increasing Y in world space)
  } else {
    direction.y = 0; // Not moving vertically
  }

  if (scroll.current.x > scroll.last.x) {
    direction.x = -1; // Moving left (decreasing X in world space)
  } else if (scroll.current.x < scroll.last.x) {
    direction.x = 1; // Moving right (increasing X in world space)
  } else {
    direction.x = 0; // Not moving horizontally
  }

  tileGroups.value.forEach((group, i) => {
    const groupObject = groupRefs.value[i]; // Get the actual Three.js Object3D

    if (groupObject) {
      // Calculate current position including the group's base position and its infinite scroll offset
      // This `posX`, `posY` is the group's current absolute position
      const posX = group.pos[0] + scrollX + group.offset.x;
      const posY = group.pos[1] + scrollY + group.offset.y;

      const groupOffX = GRID_WIDTH.value / 2; // Half width of a single grid/group
      const groupOffY = GRID_HEIGHT.value / 2; // Half height of a single grid/group
      const viewportOff = {
        x: viewport.value.width / 2,
        y: viewport.value.height / 2
      };

      // Infinite scroll logic:
      // If moving left (dir.x < 0) and the right edge of the group is past the right edge of the viewport,
      // move the group to the left by TOTAL_GRID_WIDTH
      if (direction.x < 0 && posX - groupOffX > viewportOff.x) {
        group.offset.x -= TOTAL_GRID_WIDTH.value;
      }
      // If moving right (dir.x > 0) and the left edge of the group is past the left edge of the viewport,
      // move the group to the right by TOTAL_GRID_WIDTH
      else if (direction.x > 0 && posX + groupOffX < -viewportOff.x) {
        group.offset.x += TOTAL_GRID_WIDTH.value;
      }

      // Same logic for Y-axis
      if (direction.y < 0 && posY - groupOffY > viewportOff.y) {
        group.offset.y -= TOTAL_GRID_HEIGHT.value;
      } else if (direction.y > 0 && posY + groupOffY < -viewportOff.y) {
        group.offset.y += TOTAL_GRID_HEIGHT.value;
      }

      // Apply the final calculated position to the Three.js object
      groupObject.position.x = group.pos[0] + scrollX + group.offset.x;
      groupObject.position.y = group.pos[1] + scrollY + group.offset.y;
      groupObject.position.z = group.pos[2]; // Keep original Z
    }
  });
}

function onPointerMove(e: MouseEvent | TouchEvent) {
  if (!isDown.value) return;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

  const distanceX = (startPosition.x - clientX) * scroll.scale;
  const distanceY = (startPosition.y - clientY) * scroll.scale;

  gsap.to(scroll.current, {
    x: scrollPosition.x - distanceX,
    y: scrollPosition.y + distanceY,
    duration: 0.1, // Animation duration
    ease: 'power1.out',
    overwrite: true,
    onUpdate: updatePositions // Call updatePositions on each GSAP tick
  });

  scroll.last.x = scroll.current.x;
  scroll.last.y = scroll.current.y;
}

function onPointerDown(e: MouseEvent | TouchEvent) {
  currentHoveredTileKey.value = '';
  isDown.value = true;
  // Capture the current scroll values to calculate relative movement
  scrollPosition.x = scroll.current.x;
  scrollPosition.y = scroll.current.y;

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

  startPosition.x = clientX;
  startPosition.y = clientY;

  gsap.to(cameraRef.value?.position, {
    z: mergedOptions.value.baseCameraZ * 1.3,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: true
  });
}

function onPointerUp() {
  isDown.value = false;

  gsap.to(cameraRef.value?.position, {
    z: mergedOptions.value.baseCameraZ,
    duration: 0.3,
    ease: 'power2.out',
    overwrite: true
  });

  // Get the current velocities from the tracker
  const vx = scrollTracker.get('x');
  const vy = scrollTracker.get('y');

  // Call the inertia animation
  animateInertiaScroll(vx, vy);
}

function animateInertiaScroll(vx: number | 'auto' = 'auto', vy: number | 'auto' = 'auto') {
  gsap.to(scroll.current, {
    inertia: {
      x: vx,
      y: vy,
      min: 60,
      resistance: 100
    },
    ease: 'power2.out', // Adjust ease as desired
    onUpdate: updatePositions, // Crucial: Keep updating positions during inertia
    onComplete: () => {
      direction.x = 0; // Reset direction when inertia finishes
      direction.y = 0;
    }
  });
}

// Hover event handlers
function handleTilePointerEnter(groupIndex: number, tileIndex: number) {
  if (isDown.value) return;

  const newTileKey = getTileKey(groupIndex, tileIndex);
  if (currentHoveredTileKey.value === newTileKey) {
    return;
  }
  currentHoveredTileKey.value = newTileKey;
}

function handleTilePointerLeave(groupIndex: number, tileIndex: number) {
  if (isDown.value) return;

  const leavingTileKey = getTileKey(groupIndex, tileIndex);
  if (currentHoveredTileKey.value === leavingTileKey) {
    currentHoveredTileKey.value = '';
  }
}

function fadeInBackground(mesh: Mesh) {
  if (mesh.material instanceof ShaderMaterial && mesh.material.uniforms && mesh.material.uniforms.uOpacity) {
    gsap.to(mesh.material.uniforms.uOpacity, {
      value: hoveredBackgroundOpacity,
      duration: hoverTransitionDuration,
      ease: hoverEase,
      overwrite: true
    });
  }
}

function fadeOutBackground(mesh: Mesh) {
  if (mesh.material instanceof ShaderMaterial && mesh.material.uniforms && mesh.material.uniforms.uOpacity) {
    gsap.to(mesh.material.uniforms.uOpacity, {
      value: initialBackgroundOpacity,
      duration: hoverTransitionDuration,
      ease: hoverEase,
      overwrite: true
    });
  }
}

watch(currentHoveredTileKey, (newTileKey, oldTileKey) => {
  // Animate out the old tile
  if (oldTileKey) {
    const oldMesh = backgroundMeshRefs.value.get(oldTileKey);
    fadeOutBackground(oldMesh);
  }

  // Animate in the new tile
  if (newTileKey) {
    const newMesh = backgroundMeshRefs.value.get(newTileKey);
    fadeInBackground(newMesh);
  }
});

function handleTileClick(groupIndex: number, tileIndex: number) {
  if (isScrolling.value || isDown.value) return;
  console.log(`Tile Clicked: Group ${groupIndex}, Tile ${tileIndex}`);
}

// Texture generation
async function generateTexturesForCardData(data: CardData[]) {
  if (data.length === 0) {
    cardTextures.value = [];
    return;
  }

  const texturePromises = data.map(async card => {
    const foreground = await generateForegroundTexture(card);
    let background: CanvasTexture | null = null;
    background = await generateBackgroundTexture(card);
    return { foreground, background };
  });

  const loadedTextures = await Promise.all(texturePromises);
  cardTextures.value = loadedTextures;
}

const startPostProcessing = ref(false);
const loading = useState('loading', () => false);

// Lifecycle hooks
onMounted(async () => {
  cameraZ.value = mergedOptions.value.baseCameraZ;
  targetCameraZ.value = mergedOptions.value.baseCameraZ;

  initializeTileGroups();
  await generateTexturesForCardData(props.cardData);
  startPostProcessing.value = true;
  loading.value = true;
  updatePositions();
  animateInertiaScroll();

  const container = props.options.container || window;

  container.addEventListener('mousedown', onPointerDown);
  container.addEventListener('mousemove', onPointerMove);
  container.addEventListener('mouseup', onPointerUp);
  container.addEventListener('touchstart', onPointerDown, { passive: true });
  container.addEventListener('touchmove', onPointerMove, { passive: true });
  container.addEventListener('touchend', onPointerUp, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('mousedown', onPointerDown);
  window.removeEventListener('mousemove', onPointerMove);
  window.removeEventListener('mouseup', onPointerUp);
  window.removeEventListener('touchstart', onPointerDown);
  window.removeEventListener('touchmove', onPointerMove);
  window.removeEventListener('touchend', onPointerUp);

  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value);
  }
  if (hoverDebounceTimeout.value) {
    clearTimeout(hoverDebounceTimeout.value);
  }

  cardTextures.value.forEach(set => {
    set.foreground.dispose();
    set.background?.dispose();
  });

  // Clear cached uniforms
  staticUniforms.value.clear();
});
</script>

<style scoped>
.infinite-grid-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000;
}

:deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.vignette-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.8) 90%, rgba(0, 0, 0, 1) 100%);
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15; /* This needs to be lower than vignette-overlay but higher than content */
  backdrop-filter: blur(8px); /* Adjust blur amount as needed */
  -webkit-backdrop-filter: blur(8px); /* For Safari support */
  pointer-events: none;
  mask-image: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.8) 90%, rgba(0, 0, 0, 1) 100%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.8) 90%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
