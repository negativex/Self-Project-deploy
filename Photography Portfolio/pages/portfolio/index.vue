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
          <h1 class="font-serif text-4xl md:text-5xl mb-6">Portfolio Gallery</h1>
          <p class="text-lg mb-8">
            A curated collection of my finest work across various photography genres, 
            showcasing my unique style and artistic vision.
          </p>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container-custom">
        <PortfolioCategoryList 
          :categories="categories" 
          :active-category="activeCategory"
          @filter-change="handleFilterChange"
        />
        
        <PortfolioGrid 
          :photos="photos" 
          :category="activeCategory"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Portfolio Gallery - LensCraft Photography',
  meta: [
    { name: 'description', content: 'Browse our photography portfolio showcasing weddings, portraits, landscapes, and commercial photography work.' }
  ]
});

const activeCategory = ref('all');

const handleFilterChange = (category) => {
  activeCategory.value = category;
};

const categories = [
  { id: 1, name: 'Wedding', slug: 'wedding' },
  { id: 2, name: 'Portrait', slug: 'portrait' },
  { id: 3, name: 'Landscape', slug: 'landscape' },
  { id: 4, name: 'Commercial', slug: 'commercial' },
];

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
];
</script>