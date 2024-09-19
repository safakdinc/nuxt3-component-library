<template>
  <div class="relative main" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="w-full h-full absolute top-0 left-0 flex flex-col items-center pin-container">
      <div class="pin">
        <slot name="pin"></slot>
      </div>
      <div class="w-full flex-1 flex flex-col items-center z-[2] pin-accesories pointer-events-none">
        <div class="stripe"></div>
        <div class="dot"></div>
        <div class="box">
          <div class="circle delay1"></div>
          <div class="circle delay2"></div>
          <div class="circle delay3"></div>
        </div>
      </div>
    </div>
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const isHovered = ref(false);
provide('isHovered', isHovered);
function handleMouseEnter() {
  isHovered.value = true;
}
function handleMouseLeave() {
  isHovered.value = false;
}
</script>

<style lang="scss" scoped>
.main {
  perspective-origin: bottom;
  perspective: 1000px;
  &:hover {
    .card {
      transform: scale(0.8) rotateX(40deg);
    }
    .pin {
      opacity: 1;
    }
    .pin-accesories {
      opacity: 1;
    }

    .delay1 {
      animation: waves 4s linear infinite;
      animation-delay: 0.1s;
    }

    .delay2 {
      animation: waves 4s linear 1s forwards infinite;
    }

    .delay3 {
      animation: waves 4s linear 2s forwards infinite;
    }
  }
}
.pin {
  transition: opacity 0.7s ease;
  opacity: 0;
}
.pin-accesories {
  transition: opacity 0.7s ease;
  opacity: 0;
}
.stripe {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(59, 214, 178, 0.7) 40%);
  height: 45%;
  width: 1px;
}

.dot {
  background-color: rgba(59, 214, 178, 0.7);
  box-shadow: 0px 0px 5px 1px rgba(59, 214, 178, 1);
  width: 3px;
  aspect-ratio: 1/1;
}

.box {
  width: 25%;
  aspect-ratio: 1/1;
  transform: translateY(-50%);
  position: relative;
}

.circle {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
  scale: 0;
  transition: scale 0.7s ease;
  rotate: x 60deg;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 1);
}

.card {
  transition: transform 0.7s ease, opacity 0.7s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
  z-index: 1;
}
@keyframes waves {
  0% {
    scale: 0;
    opacity: 1;
  }

  100% {
    scale: 3;
    opacity: 0;
  }
}
</style>
