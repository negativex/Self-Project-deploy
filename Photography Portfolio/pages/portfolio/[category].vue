<template>
  <div>
    <section class="pt-32 pb-12 bg-primary-50 dark:bg-primary-800">
      <div class="container-custom">
        <div 
          class="max-w-3xl mx-auto text-center"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          <h1 class="font-serif text-4xl md:text-5xl mb-6 capitalize">{{ category }} Photography</h1>
          <p class="text-lg mb-8">
            {{ getCategoryDescription(category) }}
          </p>
          <NuxtLink to="/portfolio" class="btn btn-outline">
            View All Categories
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container-custom">
        <PortfolioGrid 
          :photos="filteredPhotos" 
          :category="category"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'default'
});

const route = useRoute();
const category = computed(() => route.params.category);

useHead({
  title: computed(() => `${category.value.charAt(0).toUpperCase() + category.value.slice(1)} Photography - LensCraft Photography`),
  meta: [
    { 
      name: 'description', 
      content: computed(() => `Browse our ${category.value} photography portfolio showcasing our finest work.`)
    }
  ]
});

const photos = [
  {
    id: 1,
    title: 'Eternal Love',
    category: 'wedding',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'A beautiful moment captured during a garden wedding in springtime.'
  },
  {
    id: 2,
    title: 'First Dance',
    category: 'wedding',
    image: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The magical first dance between newlyweds under a canopy of lights.'
  },
  {
    id: 3,
    title: 'Wedding Details',
    category: 'wedding',
    image: 'https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The intricate details that make each wedding unique and personal.'
  },
  {
    id: 13,
    title: 'Wedding Preparation',
    category: 'wedding',
    image: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The emotional moments of preparation before the ceremony.'
  },
  {
    id: 14,
    title: 'Ceremony Moments',
    category: 'wedding',
    image: 'https://images.pexels.com/photos/1427266/pexels-photo-1427266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Capturing the intimate and solemn moments of the wedding ceremony.'
  },
  {
    id: 4,
    title: 'Urban Portrait',
    category: 'portrait',
    image: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Urban portrait session with natural lighting in the city.'
  },
  {
    id: 5,
    title: 'Creative Self',
    category: 'portrait',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Artistic portrait capturing personality and emotion.'
  },
  {
    id: 6,
    title: 'Professional Headshot',
    category: 'portrait',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Professional portrait for business and branding purposes.'
  },
  {
    id: 15,
    title: 'Natural Light Portrait',
    category: 'portrait',
    image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Portrait using only natural lighting to create a soft, flattering look.'
  },
  {
    id: 16,
    title: 'Expressive Portrait',
    category: 'portrait',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Capturing the subject\'s unique personality and expression.'
  },
  {
    id: 7,
    title: 'Mountain Majesty',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Breathtaking mountain landscape at golden hour.'
  },
  {
    id: 8,
    title: 'Ocean Sunset',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1553454/pexels-photo-1553454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Dramatic sunset over the ocean captured with long exposure.'
  },
  {
    id: 9,
    title: 'Desert Tranquility',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1089298/pexels-photo-1089298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'The stark beauty and minimalist aesthetic of desert landscapes.'
  },
  {
    id: 17,
    title: 'Forest Mist',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Atmospheric forest scene with morning mist creating a magical mood.'
  },
  {
    id: 18,
    title: 'Mountain Lake Reflection',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Perfectly still mountain lake reflecting the surrounding peaks.'
  },
  {
    id: 10,
    title: 'Product Showcase',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/4041188/pexels-photo-4041188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Professional product photography with careful attention to detail and lighting.'
  },
  {
    id: 11,
    title: 'Brand Story',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/1667071/pexels-photo-1667071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Lifestyle commercial photography that tells a brand\'s story.'
  },
  {
    id: 12,
    title: 'Workspace Culture',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Corporate photography capturing company culture and workplace environment.'
  },
  {
    id: 19,
    title: 'Food Photography',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Appetizing food photography for restaurants and culinary brands.'
  },
  {
    id: 20,
    title: 'Architectural Photography',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Highlighting architectural details and spaces for real estate and design clients.'
  }
];

const filteredPhotos = computed(() => {
  return photos.filter(photo => photo.category === category.value);
});

const getCategoryDescription = (category) => {
  const descriptions = {
    wedding: 'Capturing the joy, emotion, and unique moments of your special day with an artistic approach that preserves memories for a lifetime.',
    portrait: 'Creating compelling portraits that reveal personality and emotion, whether for personal, family, or professional purposes.',
    landscape: 'Showcasing the breathtaking beauty of natural environments through carefully composed and atmospheric landscape photography.',
    commercial: 'Professional photography services for businesses, including product, branding, and corporate imagery that elevates your brand.'
  };
  
  return descriptions[category] || 'Our photography portfolio showcasing our finest work.';
};
</script>