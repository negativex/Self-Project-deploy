<template>
  <div class="mb-12">
    <div class="flex flex-wrap justify-center gap-4">
      <button 
        @click="$emit('filter-change', 'all')"
        class="px-4 py-2 rounded-sm transition-all duration-300"
        :class="activeCategory === 'all' ? 'bg-primary-800 dark:bg-accent-600 text-white dark:text-primary-900' : 'hover:bg-primary-100 dark:hover:bg-primary-700'"
      >
        All
      </button>
      <button 
        v-for="category in categories" 
        :key="category.id"
        @click="$emit('filter-change', category.slug)"
        class="px-4 py-2 rounded-sm transition-all duration-300"
        :class="activeCategory === category.slug ? 'bg-primary-800 dark:bg-accent-600 text-white dark:text-primary-900' : 'hover:bg-primary-100 dark:hover:bg-primary-700'"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    default: 'all'
  }
});

defineEmits(['filter-change']);
</script>