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
    img: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Lorem',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/16245254/pexels-photo-16245254/free-photo-of-chatgpt-a-chatbot-for-your-website.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Ipsum',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Dolor',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Sit',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Amet',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/604684/pexels-photo-604684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Consectetur',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Adipisicing',
    link: 'https://yazilimpanteri.netlify.app'
  },
  {
    img: 'https://images.pexels.com/photos/2860807/pexels-photo-2860807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Elit',
    link: 'https://yazilimpanteri.netlify.app'
  }
];
</script>
