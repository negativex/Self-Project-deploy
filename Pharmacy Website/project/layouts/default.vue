<template>
  <div class="flex flex-col min-h-screen">
    <SiteHeader />
    
    <main class="flex-grow">
      <slot />
    </main>
    
    <SiteFooter />
  </div>
</template>

<script setup>
// Layout component that wraps all pages
</script>