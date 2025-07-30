<template>
  <div class="flex-1 flex flex-wrap justify-center gap-6 p-4">
    <BorderGradient
      background="rgba(15, 23, 42, 0.8)"
      class="flex items-center justify-center"
      wrapperClass="custom-wrapper"
    >
      <div class="w-full max-w-[300px] h-[400px] flex flex-col justify-between p-6">
        <h2 class="text-white text-2xl font-bold">Starry Night</h2>
        <p class="text-gray-300">
          A mesmerizing blend of deep blues and vibrant yellows, reminiscent of Van Gogh's
          masterpiece.
        </p>
        <div class="flex justify-between items-center">
          <span class="text-yellow-400 text-lg">$199.99</span>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </BorderGradient>
    <BorderGradient
      background="rgba(255, 255, 255, 0.9)"
      class="flex items-center justify-center light-theme"
      wrapperClass="custom-wrapper light-wrapper"
    >
      <div class="w-full max-w-[300px] h-[400px] flex flex-col justify-between p-6">
        <h2 class="text-gray-800 text-2xl font-bold">Sunrise Serenity</h2>
        <p class="text-gray-600">
          Soft pastels blend together, creating a calming atmosphere that evokes the tranquility of
          a peaceful dawn.
        </p>
        <div class="flex justify-between items-center">
          <span class="text-orange-500 text-lg">$149.99</span>
          <button class="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </BorderGradient>
  </div>
</template>
<style scoped>
.custom-wrapper {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.custom-wrapper:hover {
  transform: translateY(-5px);
}
.light-theme {
  color: #4a5568;
}
</style>
