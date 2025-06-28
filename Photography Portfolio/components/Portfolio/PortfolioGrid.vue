<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(photo, index) in displayedPhotos" 
        :key="photo.id"
        class="gallery-img-container group aspect-[3/4] rounded-sm overflow-hidden cursor-pointer"
        @click="openGallery(index)"
        v-motion
        :initial="{ opacity: 0, y: 30, scale: 0.9 }"
        :visibleOnce="{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: 100 * (index % 6), 
            duration: 600,
            ease: 'easeOut'
          } 
        }"
        @mouseenter="handleImageHover(true, index)"
        @mouseleave="handleImageHover(false, index)"
      >
        <img 
          :src="photo.image" 
          :alt="photo.title" 
          class="gallery-img"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-white transform translate-y-4 group-hover:translate-y-0">
          <h3 
            class="text-xl font-serif mb-2 transform transition-all duration-300 delay-100 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {{ photo.title }}
          </h3>
          <p 
            class="text-sm transform transition-all duration-300 delay-200 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-80"
          >
            {{ photo.category }}
          </p>
          <div 
            class="mt-3 transform transition-all duration-300 delay-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <span class="inline-flex items-center text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Gallery Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isGalleryOpen" 
          class="fixed inset-0 bg-black z-50 flex flex-col justify-between"
          @click.self="closeGallery"
        >
          <!-- Close button with animation -->
          <div class="absolute top-4 right-4 z-10">
            <button 
              @click="closeGallery" 
              class="text-white hover:text-accent-500 transition-all duration-300 p-2 rounded-full hover:bg-white/10 transform hover:scale-110"
              v-motion
              :initial="{ opacity: 0, scale: 0.8, rotate: -90 }"
              :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 200, duration: 400 } }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Navigation buttons with enhanced animations -->
          <div class="flex items-center justify-between px-4 py-2 text-white">
            <button 
              @click="prevImage" 
              class="p-3 text-white hover:text-accent-500 transition-all duration-300 rounded-full hover:bg-white/10 transform hover:scale-110 hover:-translate-x-1"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 400 } }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              @click="nextImage" 
              class="p-3 text-white hover:text-accent-500 transition-all duration-300 rounded-full hover:bg-white/10 transform hover:scale-110 hover:translate-x-1"
              v-motion
              :initial="{ opacity: 0, x: 30 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 400 } }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- Main image container with slide transition -->
          <div class="flex-1 flex items-center justify-center p-4">
            <Transition
              name="slide"
              mode="out-in"
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 transform scale-95"
              enter-to-class="opacity-100 transform scale-100"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 transform scale-100"
              leave-to-class="opacity-0 transform scale-95"
            >
              <img 
                :key="currentGalleryIndex"
                :src="displayedPhotos[currentGalleryIndex]?.image" 
                :alt="displayedPhotos[currentGalleryIndex]?.title"
                class="max-w-full max-h-full object-contain"
              />
            </Transition>
          </div>
          
          <!-- Image info with staggered animation -->
          <div 
            class="text-center text-white p-6 bg-gradient-to-t from-black/50 to-transparent"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 500 } }"
          >
            <h3 class="text-2xl font-serif mb-2">{{ displayedPhotos[currentGalleryIndex]?.title }}</h3>
            <p class="text-accent-300 mb-2">{{ displayedPhotos[currentGalleryIndex]?.category }}</p>
            <p class="text-sm opacity-80">{{ currentGalleryIndex + 1 }} of {{ displayedPhotos.length }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  photos: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    default: 'all'
  }
});

const isGalleryOpen = ref(false);
const currentGalleryIndex = ref(0);

const displayedPhotos = computed(() => {
  if (props.category === 'all') {
    return props.photos;
  }
  return props.photos.filter(photo => photo.category === props.category);
});

const openGallery = (index) => {
  currentGalleryIndex.value = index;
  isGalleryOpen.value = true;
  document.body.classList.add('overflow-hidden');
};

const closeGallery = () => {
  isGalleryOpen.value = false;
  document.body.classList.remove('overflow-hidden');
};

const prevImage = () => {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--;
  } else {
    currentGalleryIndex.value = displayedPhotos.value.length - 1;
  }
};

const nextImage = () => {
  if (currentGalleryIndex.value < displayedPhotos.value.length - 1) {
    currentGalleryIndex.value++;
  } else {
    currentGalleryIndex.value = 0;
  }
};

const handleImageHover = (isHovering, index) => {
  const imageContainer = document.querySelector(`.gallery-img-container:nth-child(${index + 1})`);
  if (imageContainer) {
    const title = imageContainer.querySelector('h3');
    const category = imageContainer.querySelector('p');
    if (isHovering) {
      title.classList.remove('translate-y-4', 'opacity-0');
      title.classList.add('translate-y-0', 'opacity-100');
      category.classList.remove('translate-y-4', 'opacity-0');
      category.classList.add('translate-y-0', 'opacity-80');
    } else {
      title.classList.add('translate-y-4', 'opacity-0');
      title.classList.remove('translate-y-0', 'opacity-100');
      category.classList.add('translate-y-4', 'opacity-0');
      category.classList.remove('translate-y-0', 'opacity-80');
    }
  }
};
</script>

<style scoped>
.gallery-img-container {
  position: relative;
  overflow: hidden;
  border-radius: 0.375rem;
}

.gallery-img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.gallery-img-container:hover .gallery-img {
  transform: scale(1.05);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>