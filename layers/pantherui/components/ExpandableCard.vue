<template>
  <div ref="container">
    <div
      @click="openExpandable"
      class="flex gap-[16px] max-w-full w-full items-center cursor-pointer rounded-xl relative p-2 originalBackgroundSlot group">
      <div
        :class="
          twMerge(
            'absolute top-0 left-0 w-full h-full rounded-[inherit] background bg-[var(--background-fade)] transition-colors duration-300 group-hover:bg-[#2e2e33] z-[-1]',
            props.backgroundClass
          )
        "></div>
      <div class="w-[56px] h-[56px] aspect-square rounded-lg overflow-hidden originalImageSlot">
        <img :src="props.cardInfo.src" class="w-full h-full object-cover object-center image rounded-t-[inherit]" />
      </div>
      <div class="flex-1 flex originalTitleSlot">
        <div class="flex-1 flex items-center title z-[100] relative">
          <div class="flex-1 flex flex-col justify-center w-full">
            <div class="text-[10px] lg:text-[12px] xl:text-[14px]">{{ props.cardInfo.title }}</div>
            <div class="text-[10px] lg:text-[12px] xl:text-[14px]" style="color: var(--text-gray)">{{ props.cardInfo.description }}</div>
          </div>
          <button
            @click="handleButtonClick"
            :class="
              twMerge(
                'rounded-full h-fit px-[8px] py-[4px] md:px-4 md:py-2 bg-white text-black transition-colors duration-300 hover:bg-green-600 hover:text-white',
                props.buttonClass
              )
            ">
            <div class="text-[10px] lg:text-[12px] xl:text-[14px]">{{ props.cardInfo.ctaText }}</div>
          </button>
        </div>
      </div>
    </div>

    <Transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <div v-show="open" class="w-full h-full fixed top-0 left-0 z-[1001]">
        <div class="w-full h-full relative flex justify-center items-center z-[100]">
          <div v-show="open" @click="closeExpandable" class="absolute top-0 left-0 bg-black w-full h-full opacity-50 z-[-1]"></div>
          <div class="rounded-xl background-slot relative w-[95%] max-w-[500px]">
            <div class="h-[80vh] w-full flex flex-col items-start gap-[16px] customScroll overflow-y-auto">
              <div class="w-full h-[320px] image-slot rounded-t-xl"></div>
              <div class="w-full h-fit flex flex-wrap gap-[24px] px-[16px] pb-[16px]">
                <div class="w-full flex justify-around title-slot"></div>

                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import Flip from 'gsap/dist/Flip';
import { twMerge } from 'tailwind-merge';
gsap.registerPlugin(Flip);

const props = defineProps({
  cardInfo: {
    type: Object,
    required: true
  },
  buttonClass: {
    type: String,
    default: ''
  },
  backgroundClass: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['handleClick']);

const open = ref(false);
const container = ref();

function handleButtonClick() {
  if (open.value) {
    emits('handleClick');
  }
}

const beforeEnter = el => {
  let text = container.value.querySelector('.text');
  if (text) {
    gsap.set(text, { opacity: 0, y: 20 });
  }
};

const enter = el => {
  let text = container.value.querySelector('.text');
  gsap.to(el, {
    duration: 0.2,
    onComplete: (el, done) => {
      if (text) {
        gsap.to(text, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          onComplete: done
        });
      }
    }
  });
};

const leave = (el, done) => {
  let text = container.value.querySelector('.text');
  if (text) {
    gsap.to(text, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: done
    });
  }
};

function changeState(element, slot, scale = true, absolute = true) {
  let flipElement = container.value.querySelector(element);
  let target = container.value.querySelector(slot);
  let state = Flip.getState(flipElement);
  setTimeout(() => {
    target.appendChild(flipElement);
    Flip.from(state, {
      duration: 0.4,
      ease: 'power2.out',
      scale: scale,
      absolute: absolute
    });
  }, 50);
}

function openExpandable() {
  open.value = true;
  container.value.querySelector('.title-slot').style.height = container.value.querySelector('.title').offsetHeight + 'px';

  changeState('.image', '.image-slot', true);
  changeState('.title', '.title-slot', false);
  changeState('.background', '.background-slot', false);
}

function closeExpandable() {
  open.value = false;
  changeState('.image', '.originalImageSlot', true);
  changeState('.title', '.originalTitleSlot', false);
  changeState('.background', '.originalBackgroundSlot', false);
}
</script>

<style lang="scss" scoped>
.customScroll {
  &:hover::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.customScroll::-webkit-scrollbar {
  transition: all 0.2s;
  width: 0px;
  height: 0px;
}

/* Track */
.customScroll::-webkit-scrollbar-track {
  background: #212121;
}

/* Handle */
.customScroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
.customScroll::-webkit-scrollbar-thumb:hover {
  background: rgb(255, 255, 255);
}

.customScroll::-webkit-scrollbar-thumb:horizontal {
  background: #888;
  border-radius: 10px;
}
</style>
