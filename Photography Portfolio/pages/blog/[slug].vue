<template>
  <div>
    <div class="pt-24 md:pt-32">
      <div 
        class="w-full h-[40vh] bg-center bg-cover relative"
        :style="{ backgroundImage: `url(${post.image})` }"
      >
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div class="container-custom -mt-20 relative z-10">
        <div class="max-w-3xl mx-auto bg-white dark:bg-primary-800 p-8 md:p-12 rounded-sm shadow-lg">
          <div 
            class="mb-8"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            <div class="flex items-center mb-4 text-sm text-primary-500 dark:text-primary-400">
              <span>{{ formatDate(post.date) }}</span>
              <span class="mx-2">•</span>
              <span>{{ post.category }}</span>
            </div>
            <h1 class="font-serif text-3xl md:text-4xl mb-6">{{ post.title }}</h1>
            <div class="flex items-center">
              <img 
                src="https://images.pexels.com/photos/5691341/pexels-photo-5691341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Author photo" 
                class="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p class="font-medium">Alex Morgan</p>
                <p class="text-sm text-primary-500 dark:text-primary-400">Photographer & Writer</p>
              </div>
            </div>
          </div>
          
          <div 
            class="prose prose-lg max-w-none dark:prose-invert"
            v-motion
            :initial="{ opacity: 0 }"
            :visibleOnce="{ opacity: 1, transition: { duration: 800, delay: 300 } }"
          >
            <p>
              {{ post.content }}
            </p>
            
            <figure class="my-8">
              <img 
                :src="post.contentImage1" 
                :alt="post.title + ' image 1'" 
                class="w-full h-auto rounded-sm"
              />
              <figcaption class="text-center text-sm text-primary-500 dark:text-primary-400 mt-2">
                {{ post.caption1 }}
              </figcaption>
            </figure>
            
            <p>
              {{ post.content2 }}
            </p>
            
            <figure class="my-8">
              <img 
                :src="post.contentImage2" 
                :alt="post.title + ' image 2'" 
                class="w-full h-auto rounded-sm"
              />
              <figcaption class="text-center text-sm text-primary-500 dark:text-primary-400 mt-2">
                {{ post.caption2 }}
              </figcaption>
            </figure>
            
            <p>
              {{ post.content3 }}
            </p>
            
            <div class="mt-12 pt-8 border-t border-primary-200 dark:border-primary-700">
              <h3 class="font-serif text-xl mb-4">Share this post</h3>
              <div class="flex space-x-4">
                <a href="#" class="text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-500">
                  <span class="sr-only">Facebook</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-500">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" class="text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-500">
                  <span class="sr-only">Pinterest</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </a>
                <a href="#" class="text-primary-600 dark:text-primary-300 hover:text-accent-600 dark:hover:text-accent-500">
                  <span class="sr-only">Instagram</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section class="section bg-primary-50 dark:bg-primary-800">
        <div class="container-custom">
          <h2 class="section-title text-center mb-12">More Articles You Might Enjoy</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="(relatedPost, index) in relatedPosts" 
              :key="relatedPost.id"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 * index, duration: 600 } }"
            >
              <BlogCard :post="relatedPost" />
            </div>
          </div>
          
          <div class="text-center mt-12">
            <NuxtLink to="/blog" class="btn btn-primary">
              View All Blog Posts
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'default'
});

const route = useRoute();
const slug = computed(() => route.params.slug);

// This would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'Behind the Scenes: A Mountaintop Engagement Session',
    slug: 'mountaintop-engagement-session',
    date: '2023-08-15',
    image: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Engagement',
    excerpt: 'Join me as I take you behind the scenes of a breathtaking mountaintop engagement session at sunrise. Learn about the challenges and rewards of shooting in this dramatic location.',
    content: 'Last month, I had the incredible opportunity to photograph Sarah and Michael\'s engagement session at Mount Rainier. We woke up at 3 AM to begin our ascent, hoping to catch the first light of dawn breaking over the mountains. The hike was challenging, especially with all my camera gear, but the anticipation of what was to come kept us all motivated.',
    contentImage1: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption1: 'Sarah and Michael watching the sunrise from the mountain ridge',
    content2: 'When we reached our destination, the sky was just beginning to lighten. The soft, diffused light was perfect for creating romantic, atmospheric images. We spent about two hours shooting in various locations, taking advantage of the changing light and spectacular backdrop. One of the challenges of mountaintop photography is the unpredictable weather. We had checked forecasts extensively, but still had to deal with unexpected wind gusts that made holding steady for some shots difficult.',
    contentImage2: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption2: 'The golden light created a magical atmosphere for their portraits',
    content3: 'Despite the challenges, the results were absolutely worth it. There\'s something magical about capturing love stories in vast, majestic landscapes. It creates a beautiful juxtaposition between the intimate connection of two people and the expansive world around them. For photographers considering their own mountaintop sessions, I recommend extensive location scouting beforehand, packing light but bringing backup equipment, and building extra time into your schedule for weather delays. The mountains are unpredictable, but that\'s part of what makes the images so special and unique.'
  },
  {
    id: 2,
    title: 'The Art of Natural Light Portrait Photography',
    slug: 'art-of-natural-light',
    date: '2023-07-28',
    image: 'https://images.pexels.com/photos/2100941/pexels-photo-2100941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Technique',
    excerpt: 'Discover my approach to using natural light for portrait photography, including tips for finding the best light, positioning your subjects, and creating beautiful, flattering images.',
    content: 'Natural light is the most beautiful, versatile, and accessible light source for portrait photography. When mastered, it can produce stunning, dimensional images that feel authentic and timeless. In this article, I\'ll share my approach to working with natural light and how you can achieve beautiful portraits regardless of your equipment or experience level.',
    contentImage1: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption1: 'Example of directional light creating dimension in a portrait',
    content2: 'The golden hours – shortly after sunrise and before sunset – offer the most flattering light for portraits. The low angle of the sun creates soft, directional light that adds dimension to faces and creates a warm, inviting atmosphere. However, don\'t dismiss other times of day! Midday light can be beautiful when diffused through clouds or when shooting in open shade. The key is understanding how to position your subject relative to the light source. Generally, I start by identifying the main light source and then position my subject so that the light illuminates them in a flattering way.',
    contentImage2: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption2: 'Using a building to create open shade for soft, flattering light',
    content3: 'Window light is one of my favorite light sources for indoor portraits. Position your subject at a 45-degree angle to a large window for beautiful, soft light that wraps around their features. You can modify natural light with simple tools like a white reflector (even a foam board works) to fill in shadows, or a black card to add shadow and increase contrast. The beauty of natural light photography is its simplicity – you don\'t need expensive equipment to create stunning images. By understanding light direction, quality, and how to position your subjects, you can create beautiful portraits anywhere.'
  },
  {
    id: 3,
    title: 'A Spring Garden Wedding: Emma & David',
    slug: 'spring-garden-wedding',
    date: '2023-06-10',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Wedding',
    excerpt: 'Step into the romantic garden wedding of Emma and David, where vintage touches met modern style in a celebration filled with love, laughter, and beautiful details.',
    content: 'Emma and David\'s spring garden wedding was a perfect blend of romance, elegance, and personal touches. Held at the historic Rosewood Gardens, their celebration incorporated vintage elements with modern styling to create a truly unique atmosphere. The couple chose a color palette of dusty blue, sage green, and soft peach that complemented the natural beauty of the garden setting.',
    contentImage1: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption1: 'Emma\'s gown featured delicate lace detailing and a classic silhouette',
    content2: 'The ceremony took place under a century-old oak tree, adorned with hanging glass terrariums filled with air plants and delicate blooms. Emma walked down an aisle scattered with rose petals to a string quartet playing their favorite classical pieces. One of my favorite details was the custom-built wooden arch, which Emma\'s father had crafted by hand and was decorated with lush greenery and garden roses.',
    contentImage2: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption2: 'Their first dance took place as the golden hour light streamed through the reception tent',
    content3: 'The reception was held in a clear-top tent that allowed guests to dine under the stars. Tables were adorned with mismatched vintage china, crystal glassware, and centerpieces featuring locally grown flowers in antique brass vessels. Personal touches were evident throughout – from the signature cocktails named after their pets to the display of family wedding photos spanning four generations. As the sun set, the garden was transformed with thousands of fairy lights, creating a magical atmosphere for dancing that continued well into the night. It was truly a privilege to document such a thoughtfully designed celebration that perfectly reflected Emma and David\'s personalities and love story.'
  },
  {
    id: 4,
    title: 'Essential Gear in My Camera Bag',
    slug: 'essential-gear',
    date: '2023-05-22',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Equipment',
    excerpt: 'A detailed look at the photography equipment I rely on for professional shoots, including my camera bodies, favorite lenses, lighting, and the accessories I never leave behind.',
    content: 'I\'m often asked about the photography gear I use for professional shoots. While I firmly believe that the photographer\'s vision and skill are more important than equipment, having reliable tools that suit your style is certainly important. In this post, I\'ll share the contents of my camera bag and why each piece earns its place.',
    contentImage1: 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption1: 'My primary camera setup with my most-used lens',
    content2: 'For camera bodies, I currently use two full-frame DSLRs – one as my primary camera and one as backup. Having two bodies also allows me to keep different lenses mounted, reducing the need to switch lenses in dynamic shooting environments. My most-used lenses include a 24-70mm f/2.8 for versatility, a 70-200mm f/2.8 for portraits and compression, and a 50mm f/1.4 for low light situations and beautiful bokeh. For lighting, I bring a combination of speedlights with modifiers for on-location lighting, as well as a reflector and diffuser for shaping natural light.',
    contentImage2: 'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption2: 'My lighting setup for an on-location portrait session',
    content3: 'The accessories that round out my kit include extra batteries and memory cards, a sturdy tripod for long exposures or video work, lens cleaning supplies, and gaffer tape (which has saved many shoots in unexpected ways!). I also always carry a colorchecker passport for accurate color reproduction and a small LED light that\'s helpful for focusing in dim conditions or adding a creative accent light. My bag itself is a backpack-style camera bag that distributes weight evenly and allows me to carry everything comfortably for long shooting days. Remember that the best gear setup is one that supports your specific photographic style and the types of shoots you typically do – there\'s no one-size-fits-all solution in photography equipment.'
  },
  {
    id: 5,
    title: 'Capturing Authentic Family Moments',
    slug: 'authentic-family-moments',
    date: '2023-04-18',
    image: 'https://images.pexels.com/photos/1128317/pexels-photo-1128317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Family',
    excerpt: 'How to create a relaxed environment during family photoshoots that results in genuine expressions and authentic interactions rather than stiff, posed portraits.',
    content: 'Family photography is about so much more than getting everyone to smile at the camera. It\'s about capturing the genuine connections, personalities, and love that make each family unique. After years of specializing in family photography, I\'ve developed approaches that help create an environment where authentic moments can unfold naturally.',
    contentImage1: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption1: 'Unposed moments often capture the true essence of family relationships',
    content2: 'The session begins before I even pick up my camera. I spend time talking with family members, asking questions about their interests and dynamics, and generally helping everyone feel comfortable. For families with young children, I never pressure kids to pose or smile on command. Instead, I suggest activities the family can do together – walking along a path, having a picnic, playing a simple game – and photograph the natural interactions that occur. Parents are often surprised when I tell them it\'s perfectly fine if their children aren\'t "behaving" or looking at the camera – some of the most treasured images come from kids just being themselves.',
    contentImage2: 'https://images.pexels.com/photos/1449791/pexels-photo-1449791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption2: 'Encouraging playful interactions leads to joyful, authentic expressions',
    content3: 'From a technical perspective, I prepare by choosing locations with beautiful, even light and minimal distractions. I use a longer lens (often my 70-200mm) to give families some space while still capturing intimate moments. I shoot with a wide aperture for beautiful background blur, and I keep my shutter speed high to freeze any quick movements. Most importantly, I maintain a positive, patient attitude throughout the session. Family photography requires flexibility and the ability to go with the flow. By creating a relaxed environment and focusing on connections rather than perfection, I\'m able to deliver images that authentically represent each family\'s unique story and relationships.'
  },
  {
    id: 6,
    title: 'The Magic of Golden Hour Photography',
    slug: 'magic-of-golden-hour',
    date: '2023-03-05',
    image: 'https://images.pexels.com/photos/1774389/pexels-photo-1774389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Technique',
    excerpt: 'Why photographers love the golden hour, how to plan your shoots around this magical time of day, and tips for making the most of this beautiful, warm lighting.',
    content: 'The golden hour – that magical time shortly after sunrise or before sunset when the light is soft, warm, and dimensional – is beloved by photographers for good reason. This quality of light can transform an ordinary scene into something extraordinary and make portrait subjects glow with a natural radiance that\'s difficult to replicate with artificial lighting.',
    contentImage1: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption1: 'The warm glow of golden hour creates a magical atmosphere',
    content2: 'Planning for golden hour requires some preparation. I use apps like PhotoPills or The Photographer\'s Ephemeris to predict exactly when and where the sun will be at any location. This helps me plan the timing and positioning for shoots to make the most of the available light. During golden hour, I often shoot with the sun behind my subjects (backlighting), which creates a beautiful rim light and prevents squinting. This approach requires exposing for the subjects\' faces and allowing the background to be brighter, sometimes even creating artistic flare effects.',
    contentImage2: 'https://images.pexels.com/photos/848573/pexels-photo-848573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    caption2: 'Backlit portraits during golden hour create a dreamy, romantic feel',
    content3: 'The qualities that make golden hour special – directional light, warm color temperature, and soft shadows – can be emphasized or modified with simple techniques. Using a reflector can bounce golden light back onto a subject\'s face when shooting backlit. Adjusting white balance slightly cooler in camera can prevent images from becoming too yellow, while still preserving the warm atmosphere. And don\'t pack up right when the sun dips below the horizon! The blue hour that follows golden hour offers its own magical quality with deep blue skies and a peaceful ambiance. By understanding and planning for these special lighting conditions, you can create images with mood, dimension, and a timeless quality that\'s difficult to achieve at other times of day.'
  }
];

const post = computed(() => {
  return blogPosts.find(post => post.slug === slug.value) || blogPosts[0];
});

useHead({
  title: computed(() => `${post.value.title} - LensCraft Photography Blog`),
  meta: [
    { 
      name: 'description', 
      content: computed(() => post.value.excerpt)
    }
  ]
});

// Exclude the current post and get 3 related posts
const relatedPosts = computed(() => {
  return blogPosts
    .filter(p => p.id !== post.value.id)
    .slice(0, 3);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>