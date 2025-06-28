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
          <h1 class="font-serif text-4xl md:text-5xl mb-6">Photography Blog</h1>
          <p class="text-lg mb-8">
            Insights, stories, and behind-the-scenes glimpses from recent photoshoots and adventures.
          </p>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(post, index) in blogPosts" 
            :key="post.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: 100 * (index % 6), duration: 600 } }"
          >
            <BlogCard :post="post" />
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
  title: 'Photography Blog - LensCraft Photography',
  meta: [
    { name: 'description', content: 'Read our latest photography blog posts, featuring behind-the-scenes stories, photography tips, and recent work.' }
  ]
});

const blogPosts = [
  {
    id: 1,
    title: 'Behind the Scenes: A Mountaintop Engagement Session',
    slug: 'mountaintop-engagement-session',
    date: '2023-08-15',
    image: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Engagement',
    excerpt: 'Join me as I take you behind the scenes of a breathtaking mountaintop engagement session at sunrise. Learn about the challenges and rewards of shooting in this dramatic location.'
  },
  {
    id: 2,
    title: 'The Art of Natural Light Portrait Photography',
    slug: 'art-of-natural-light',
    date: '2023-07-28',
    image: 'https://images.pexels.com/photos/2100941/pexels-photo-2100941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Technique',
    excerpt: 'Discover my approach to using natural light for portrait photography, including tips for finding the best light, positioning your subjects, and creating beautiful, flattering images.'
  },
  {
    id: 3,
    title: 'A Spring Garden Wedding: Emma & David',
    slug: 'spring-garden-wedding',
    date: '2023-06-10',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Wedding',
    excerpt: 'Step into the romantic garden wedding of Emma and David, where vintage touches met modern style in a celebration filled with love, laughter, and beautiful details.'
  },
  {
    id: 4,
    title: 'Essential Gear in My Camera Bag',
    slug: 'essential-gear',
    date: '2023-05-22',
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Equipment',
    excerpt: 'A detailed look at the photography equipment I rely on for professional shoots, including my camera bodies, favorite lenses, lighting, and the accessories I never leave behind.'
  },
  {
    id: 5,
    title: 'Capturing Authentic Family Moments',
    slug: 'authentic-family-moments',
    date: '2023-04-18',
    image: 'https://images.pexels.com/photos/1128317/pexels-photo-1128317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Family',
    excerpt: 'How to create a relaxed environment during family photoshoots that results in genuine expressions and authentic interactions rather than stiff, posed portraits.'
  },
  {
    id: 6,
    title: 'The Magic of Golden Hour Photography',
    slug: 'magic-of-golden-hour',
    date: '2023-03-05',
    image: 'https://images.pexels.com/photos/1774389/pexels-photo-1774389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Technique',
    excerpt: 'Why photographers love the golden hour, how to plan your shoots around this magical time of day, and tips for making the most of this beautiful, warm lighting.'
  }
];
</script>