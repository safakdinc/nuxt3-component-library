<template>
  <div class="p-8 flex-1 px-[16px] lg:px-[180px] flex flex-col gap-[16px]">
    <ExpandableCard v-for="card in cards" :card-info="card">
      <div style="color: var(--text-gray)" class="text" v-html="card.content"></div>
    </ExpandableCard>
  </div>
</template>

<script setup>
const cards = [
  {
    title: "Explore New York City",
    description: "The Big Apple awaits",
    ctaText: "Book Now",
    src: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
    content:
      "New York City, the city that never sleeps, is a vibrant metropolis filled with iconic landmarks, world-class museums, diverse neighborhoods, and a thriving food scene. From the towering skyscrapers of Manhattan to the artistic enclaves of Brooklyn, there's something for everyone in this bustling urban playground. Must-visit attractions include the Statue of Liberty, Central Park, Times Square, and the Metropolitan Museum of Art. Don't forget to catch a Broadway show and indulge in the city's famous pizza and bagels!",
  },
  {
    title: "Discover Ancient Rome",
    description: "Walk through history",
    ctaText: "Learn More",
    src: "https://static.wixstatic.com/media/e41b5c_8e39787f991543fd97451f50d467ae01~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/e41b5c_8e39787f991543fd97451f50d467ae01~mv2.jpg",
    content:
      "Step back in time and explore the wonders of Ancient Rome. This historic city is a living museum, showcasing the grandeur of one of the world's greatest civilizations. Marvel at the iconic Colosseum, where gladiators once battled, and wander through the Roman Forum, the heart of ancient Roman life. Visit the Pantheon, an architectural marvel that has stood for nearly two millennia, and toss a coin into the Trevi Fountain to ensure your return to the Eternal City. Don't miss the Vatican City, home to St. Peter's Basilica and the awe-inspiring Sistine Chapel.",
  },
  {
    title: "Safari Adventure in Kenya",
    description: "Witness the Great Migration",
    ctaText: "Reserve",
    src: "https://amazingmemoriessafaris.com/wp-content/uploads/2016/11/amboseli-safaris.jpg",
    content:
      "Embark on an unforgettable safari adventure in Kenya, home to some of Africa's most spectacular wildlife and landscapes. Witness the awe-inspiring Great Migration in the Masai Mara, where millions of wildebeest and zebra traverse the savanna in search of fresh grazing lands. Spot the 'Big Five' - lion, leopard, elephant, rhino, and buffalo - in their natural habitats. Visit traditional Maasai villages to learn about local cultures and customs. From hot air balloon rides over the plains to guided bush walks, Kenya offers a truly immersive and exhilarating safari experience.",
  },
  {
    title: "Culinary Tour of Japan",
    description: "Savor authentic flavors",
    ctaText: "Taste Now",
    src: "https://www.agoda.com/wp-content/uploads/2019/05/Tokyo-food-Japanese-food-variety-of-food.jpg",
    content:
      "Embark on a gastronomic journey through Japan, a country renowned for its exquisite cuisine and culinary traditions. From the bustling fish markets of Tokyo to the traditional tea houses of Kyoto, immerse yourself in the diverse flavors and techniques of Japanese cooking. Sample fresh sushi and sashimi, slurp ramen in cozy neighborhood shops, and indulge in perfectly grilled Kobe beef. Learn the art of making soba noodles, participate in a traditional tea ceremony, and discover the subtle flavors of sake. This culinary adventure will tantalize your taste buds and provide insight into Japan's rich food culture.",
  },
  {
    title: "Northern Lights in Iceland",
    description: "Chase the aurora borealis",
    ctaText: "Explore",
    src: "https://www.heyiceland.is/asset/17999/northern-lights-dancing-over-kirkjufell-mountain",
    content:
      "Experience the magic of the Northern Lights in Iceland, one of the best places on Earth to witness this breathtaking natural phenomenon. Watch in awe as the night sky comes alive with dancing curtains of green, pink, and purple light. Beyond the aurora, Iceland offers a landscape of otherworldly beauty, from thundering waterfalls and vast glaciers to black sand beaches and bubbling hot springs. Soak in the famous Blue Lagoon, explore the vibrant capital of Reykjavik, and embark on thrilling adventures like glacier hiking and ice cave exploration. Iceland is a land of fire and ice that promises unforgettable experiences and stunning natural wonders.",
  },
];
</script>
