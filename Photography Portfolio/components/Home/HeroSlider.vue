<template>
  <div class="relative h-screen overflow-hidden">
    <div class="absolute inset-0 bg-black/40 z-10"></div>
    
    <Transition name="fade" mode="out-in">
      <div 
        :key="currentSlide"
        class="absolute inset-0"
      >
        <img 
          :src="slides[currentSlide].image"
          :alt="slides[currentSlide].alt"
          class="w-full h-full object-cover"
        />
      </div>
    </Transition>
    
    <div class="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4">
      <h1 
        class="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 tracking-wider"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 800 } }"
      >
        CAPTURING LIFE'S<br />PRECIOUS MOMENTS
      </h1>
      <p 
        class="max-w-2xl text-lg md:text-xl opacity-90 mb-8"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
      >
        Through the lens of artistry and emotion, we create timeless memories that will last forever.
      </p>
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <NuxtLink to="/portfolio" class="btn btn-primary mr-4 pulse-glow">
          View Portfolio
        </NuxtLink>
        <NuxtLink to="/about" class="btn btn-primary mr-4 pulse-glow">
          About Me
        </NuxtLink>
      </div>
    </div>
    
    <div class="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
      <button 
        v-for="(slide, index) in slides" 
        :key="slide.id"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'"
        aria-label="Go to slide"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Beautiful landscape photography'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Portrait photography'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1820567/pexels-photo-1820567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Wedding photography'
  }
];

const currentSlide = ref(0);
let slideInterval;

const startSlideshow = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 6000);
};

onMounted(() => {
  startSlideshow();
});

onBeforeUnmount(() => {
  clearInterval(slideInterval);
});
</script>