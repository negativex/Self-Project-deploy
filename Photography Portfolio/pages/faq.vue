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
          <h1 class="font-serif text-4xl md:text-5xl mb-6">Frequently Asked Questions</h1>
          <p class="text-lg mb-8">
            Find answers to common questions about our photography services, booking process, and what to expect.
          </p>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <FaqAccordion :faq-items="faqItems" />
          
          <div class="mt-16 text-center">
            <h3 class="font-serif text-2xl mb-6">Still Have Questions?</h3>
            <p class="mb-8">
              If you couldn't find the answer to your question, feel free to reach out directly.
            </p>
            <NuxtLink 
              to="/about" 
              class="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg pulse-glow transition-colors duration-300 font-medium shadow-md hover:shadow-lg hover:bg-yellow-300 hover:text-black transform hover:scale-105"
            >
              Contact Me
            </NuxtLink>
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
  title: 'FAQ - LensCraft Photography',
  meta: [
    { name: 'description', content: 'Find answers to frequently asked questions about our photography services, booking process, pricing, and what to expect from your photoshoot.' }
  ]
});

const faqItems = [
  {
    question: 'How far in advance should I book my session?',
    answer: 'For portrait sessions, I recommend booking 4-6 weeks in advance to ensure availability. For weddings, most clients book 8-12 months ahead, with popular dates booking up to 18 months in advance. If you have a specific date in mind, especially during peak seasons (spring and fall), earlier booking is recommended.'
  },
  {
    question: 'What is your photography style?',
    answer: 'My style blends documentary and fine art approaches. I focus on capturing authentic moments and emotions as they naturally unfold, while also creating deliberately composed artistic images. I use natural light whenever possible, supplemented by professional lighting when needed. My editing style emphasizes natural skin tones, rich but not oversaturated colors, and timeless processing that won\'t look dated in years to come.'
  },
  {
    question: 'How many photos will I receive?',
    answer: 'The number of final images depends on the type and length of your session. Portrait sessions typically yield 30-50 edited images per hour of shooting time. Weddings generally result in 50-75 images per hour of coverage. I focus on quality over quantity, carefully selecting the strongest images that tell your story rather than delivering every shot taken.'
  },
  {
    question: 'How long until I receive my photos?',
    answer: 'Portrait sessions are typically delivered within 2-3 weeks. Weddings and larger events take 4-6 weeks for complete delivery. During busy seasons, these timeframes may extend slightly. I often provide a small preview gallery within a few days after your session so you can share some highlights while waiting for the complete gallery.'
  },
  {
    question: 'Do you provide both color and black & white photos?',
    answer: 'Yes, your gallery will include both color and black & white versions of select images. Some moments simply shine in black & white, while others are best appreciated in full color. If you have specific preferences for certain images, just let me know and I\'m happy to accommodate.'
  },
  {
    question: 'What happens if there\'s bad weather?',
    answer: 'For outdoor sessions, I monitor weather forecasts closely as your date approaches. If severe weather is predicted, we\'ll reschedule at no additional cost. For weddings, I always have backup plans for portraits and arrive with appropriate gear for various weather conditions. Sometimes, overcast skies or light rain can actually create beautiful, dramatic images!'
  },
  {
    question: 'Do you travel for sessions and weddings?',
    answer: 'Absolutely! I love to travel for photography. Local sessions within 30 miles of my studio are included in the standard session fee. For locations beyond that radius, a travel fee applies based on distance. For destination weddings, I offer special packages that include travel costs - please contact me for a custom quote.'
  },
  {
    question: 'How do I reserve my date?',
    answer: 'A signed contract and retainer fee are required to secure your date. For portrait sessions, the retainer is 50% of the session fee. For weddings, the retainer is typically 30% of the total package price. Both are non-refundable but can be applied to a rescheduled date in case of emergency or with sufficient notice.'
  },
  {
    question: 'What should we wear for our portrait session?',
    answer: 'I provide all clients with a detailed preparation guide that includes clothing recommendations. Generally, I suggest coordinating rather than matching outfits, avoiding loud patterns or logos, and choosing colors that complement your location. Most importantly, wear something that makes you feel comfortable and confident! I\'m always available to review your outfit choices before the session.'
  },
  {
    question: 'Do you offer albums or prints?',
    answer: 'Yes! I believe that photographs deserve to exist in physical form. I offer heirloom-quality albums, fine art prints, and wall art through my professional print partners. While all packages include digital files, I\'m happy to help you select the best images for display and create custom artwork for your home.'
  }
];
</script>