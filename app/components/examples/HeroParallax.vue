<template>
  <div class="w-full flex flex-col gap-[32px] parallax-container relative z-[10]">
    <div class="h-[80vh] w-full flex flex-col justify-center items-center text-white p-8" style="background-color: rgba(0, 0, 0, 0.6)">
      <h1 class="text-5xl font-bold mb-4">Great way to show of content</h1>
      <p class="text-xl mb-8 text-center max-w-[500px]">
        Discover amazing content and experiences as you scroll through our uniquely designed parallax gallery.
      </p>
      <div class="flex gap-4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Learn More
        </button>
        <button
          class="bg-transparent hover:bg-white hover:text-black text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded transition-colors duration-300">
          Get Started
        </button>
      </div>
    </div>
    <HeroParallax class="w-full z-[-1] h-[250vh] absolute top-0 left-0" :items="items" :trigger-element="'.preview'"> </HeroParallax>
  </div>
</template>

<script setup>
const items = [
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043660/home1_yoxu12.webp',
    name: 'Lorem',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043657/home2_xcbupc.webp',
    name: 'Ipsum',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043659/home3_p2hkbw.webp',
    name: 'Dolor',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043655/home4_wypt74.webp',
    name: 'Sit',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043652/home5_w01yqy.webp',
    name: 'Amet',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043654/home6_q9alqk.webp',
    name: 'Consectetur',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721044200/getpubthumb_msnsgc.webp',
    name: 'Adipisicing',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043662/home8_i0nrxz.webp',
    name: 'Elit',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://res.cloudinary.com/dn5zxeevu/image/upload/v1721043650/home9_ewsddc.webp',
    name: 'Expedita',
    link: 'https://yazilimpanteri.netlify.app'
  }
];
</script>
