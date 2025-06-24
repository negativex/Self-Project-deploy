<template>
  <div class="card group relative animate-fade-in">
    <!-- Badges -->
    <div class="absolute top-2 left-2 z-10 flex flex-col gap-1">
      <span v-if="product.discount > 0" class="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded">
        {{ product.discount }}% OFF
      </span>
      <span v-if="product.isRx" class="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded">
        Prescription
      </span>
    </div>
    
    <!-- Quick view button -->
    <div class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <button @click.prevent="$emit('quick-view', product)" 
              class="bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white text-neutral-700 hover:text-primary-600 transition-colors"
              title="Quick view">
        <span class="i-iconify-ph-eye-fill text-lg"></span>
      </button>
    </div>
    
    <!-- Product Image -->
    <NuxtLink :to="`/product/${product.slug}`">
      <div class="aspect-square overflow-hidden">
        <img :src="product.image" 
             :alt="product.name" 
             class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105">
      </div>
    </NuxtLink>
    
    <!-- Product Info -->
    <div class="p-4">
      <!-- Category -->
      <p class="text-xs text-neutral-500 mb-1">{{ product.category }}</p>
      
      <!-- Product Name -->
      <NuxtLink :to="`/product/${product.slug}`">
        <h3 class="font-medium text-neutral-800 hover:text-primary-600 transition-colors line-clamp-2 mb-2">
          {{ product.name }}
        </h3>
      </NuxtLink>
      
      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex text-warning-500">
          <span v-for="n in 5" :key="n" 
                :class="[n <= Math.floor(product.rating) ? 'i-iconify-ph-star-fill' : 'i-iconify-ph-star text-neutral-300']"></span>
        </div>
        <span class="text-xs text-neutral-500 ml-1">({{ product.reviews }})</span>
      </div>
      
      <!-- Price -->
      <div class="flex items-center justify-between mb-3">
        <div>
          <span v-if="product.discount > 0" class="text-neutral-500 text-sm line-through mr-2">
            ${{ (product.price * (1 + product.discount / 100)).toFixed(2) }}
          </span>
          <span class="font-semibold text-neutral-900">${{ product.price.toFixed(2) }}</span>
        </div>
        <span v-if="!product.inStock" class="text-xs text-accent-600 font-medium">Out of Stock</span>
        <span v-else-if="product.isRx" class="text-xs text-primary-600 font-medium">Rx Required</span>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-2">
        <template v-if="product.isRx">
          <NuxtLink :to="`/product/${product.slug}`" class="btn-primary py-1.5 flex-grow text-center text-sm">
            View Details
          </NuxtLink>
        </template>
        <template v-else-if="product.inStock">
          <button @click="$emit('add-to-cart', product)" 
                  class="btn-primary py-1.5 flex-grow text-sm">
            Add to Cart
          </button>
        </template>
        <template v-else>
          <button disabled class="btn-primary py-1.5 flex-grow text-sm opacity-50 cursor-not-allowed">
            Out of Stock
          </button>
        </template>
        <button @click="$emit('add-to-wishlist', product)" 
                class="btn-ghost py-1.5 px-3 text-sm">
          <span class="i-iconify-ph-heart text-lg"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart', 'add-to-wishlist', 'quick-view'])
</script>