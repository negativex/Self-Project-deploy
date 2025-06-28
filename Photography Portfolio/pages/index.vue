<template>
  <div>
    <HomeHeroSlider />
    
    <HomeFeaturedWork />

    <!-- <section class="section bg-white dark:bg-primary-900">
      <div class="container-custom">
        <div 
          class="max-w-3xl mx-auto text-center"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'backOut', delay: 800 } }"
        >
          <h2 class="section-title">Capturing Life's Beautiful Moments</h2>
          <p class="text-lg mb-8">
            Specializing in weddings, portraits, and landscapes, I bring a keen artistic eye and technical expertise 
            to every shoot. My passion is creating timeless images that tell your unique story.
          </p>
          <NuxtLink to="/about" class="btn btn-primary">
            Learn About My Approach
          </NuxtLink>
        </div>
      </div>
    </section> -->

    <section class="section bg-primary-50 dark:bg-primary-900">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <div 
            class="text-center md:text-center"
            v-motion
            :initial="{ opacity: 0, x: -60 }"
            :visibleOnce="{ 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1000,
                ease: 'easeOut',
                delay: 200
              } 
            }"
          >
            <h2 class="section-title">Capturing Life's Beautiful Moments</h2>
            <p class="text-lg mb-8">
              Specializing in weddings, portraits, and landscapes, I bring a keen artistic eye and technical expertise to every shoot. My passion is creating timeless images that tell your unique story.
            </p>
            
            <!-- Enhanced button animations with stagger effect -->
            <div class="flex justify-center">
              <NuxtLink 
                to="/about" 
                class="btn btn-primary transform transition-all pulse-glow duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/25"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visibleOnce="{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 800,
                    ease: 'backOut',
                    delay: 800
                  } 
                }"
              >
                Learn about my approach
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <HomeTestimonials />
    
    <section class="section bg-primary-50 dark:bg-primary-800">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            class="text-center md:text-left"
            v-motion
            :initial="{ opacity: 0, x: -60 }"
            :visibleOnce="{ 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 1000,
                ease: 'easeOut',
                delay: 200
              } 
            }"
          >
            <h2 class="section-title">Ready to Create Something Beautiful?</h2>
            <p class="text-lg mb-8">
              Let's work together to capture your special moments. Whether you're planning a wedding, 
              need portraits, or want to showcase your products, I'm here to bring your vision to life.
            </p>
            
            <!-- Enhanced button animations with stagger effect -->
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink 
                to="/about" 
                class="btn btn-primary transform transition-all pulse-glow duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/25"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visibleOnce="{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 800,
                    ease: 'backOut',
                    delay: 800
                  } 
                }"
              >
                Get in Touch
              </NuxtLink>
              
              <NuxtLink 
                to="/portfolio" 
                class="btn btn-primary transform transition-all pulse-glow duration-500 hover:scale-110 hover:shadow-2xl"
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visibleOnce="{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 800,
                    ease: 'backOut',
                    delay: 1000
                  } 
                }"
              >
                Browse Portfolio
              </NuxtLink>
            </div>
          </div>
          
          <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800 } }"
          >
            <img 
              src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Beautiful portrait photography" 
              class="w-full h-auto rounded-sm shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'LensCraft Photography - Capturing Life\'s Beautiful Moments',
  meta: [
    { name: 'description', content: 'Professional photography services specializing in weddings, portraits, and landscapes. Creating timeless images that tell your unique story.' }
  ]
});
</script>