<template>
  <section class="section bg-primary-50 dark:bg-primary-800">
    <div class="container-custom">
      <h2 
        class="section-title text-center"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        Featured Work
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(item, index) in featuredWork" 
          :key="item.id"
          class="gallery-img-container group aspect-[3/4] rounded-sm overflow-hidden cursor-pointer"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 200 * index, 
              duration: 700,
              ease: 'easeOut'
            } 
          }"
          @mouseenter="handleHover(true, index)"
          @mouseleave="handleHover(false, index)"
        >
          <NuxtLink :to="`/portfolio/${item.category}`" class="block h-full">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="gallery-img transform transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white">
              <h3 
                class="text-xl font-serif mb-2 transform transition-all duration-400 delay-100 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {{ item.title }}
              </h3>
              <p 
                class="text-sm transform transition-all duration-400 delay-200 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-80"
              >
                {{ item.category }}
              </p>
              <div 
                class="mt-3 transform transition-all duration-400 delay-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span class="inline-flex items-center text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 hover:bg-white/30 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Explore {{ item.category }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      
      <div 
        class="text-center mt-12"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'backOut', delay: 1000 } }"
      >
        <NuxtLink 
          to="/portfolio" 
          class="border-2 border-yellow-400 bg-yellow-300 text-black px-6 py-2 font-medium group inline-flex items-center pulse-glow transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/25"
        >
          View All Work
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const featuredWork = [
  {
    id: 1,
    title: 'Desert Tranquility',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Eternal Love',
    category: 'wedding',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Urban Portraits',
    category: 'portrait',
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const handleHover = (isHovering, index) => {
  // This function can be used for additional hover effects if needed
  // Currently, CSS handles the animations via group-hover classes
};
</script>