<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-primary-50 overflow-hidden">
      <div class="container-custom py-12 md:py-16 lg:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              Your Trusted Online <span class="text-primary-600">Pharmacy</span>
            </h1>
            <p class="text-lg text-neutral-600 mb-6 max-w-lg">
              Quality medications and medical equipment delivered to your doorstep with the highest standards of safety and care.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <NuxtLink to="/category/otc-medicines" class="btn-primary">
                Shop Medicines
              </NuxtLink>
              <NuxtLink to="/upload-prescription" class="btn-outline">
                Upload Prescription
              </NuxtLink>
            </div>
            <div class="flex items-center gap-6 flex-wrap">
              <div class="flex items-center">
                <span class="i-iconify-ph-truck-fill text-2xl text-primary-600 mr-2"></span>
                <span class="text-sm font-medium">Free Delivery</span>
              </div>
              <div class="flex items-center">
                <span class="i-iconify-ph-clock-fill text-2xl text-primary-600 mr-2"></span>
                <span class="text-sm font-medium">24/7 Support</span>
              </div>
              <div class="flex items-center">
                <span class="i-iconify-ph-shield-check-fill text-2xl text-primary-600 mr-2"></span>
                <span class="text-sm font-medium">Verified Products</span>
              </div>
            </div>
          </div>
          <div class="relative">
            <img src="https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg" alt="Online Pharmacy" class="rounded-lg shadow-lg object-cover w-full h-auto max-h-[500px]">
            <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div class="flex items-center">
                <span class="i-iconify-ph-star-fill text-warning-500 text-2xl"></span>
                <div class="ml-3">
                  <p class="font-semibold text-neutral-800">Trusted by 2M+ customers</p>
                  <p class="text-sm text-neutral-500">4.9/5 average rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Background decorative elements -->
      <div class="absolute -bottom-8 -right-8 w-64 h-64 bg-primary-100 rounded-full opacity-70"></div>
      <div class="absolute -top-12 -left-12 w-40 h-40 bg-secondary-100 rounded-full opacity-50"></div>
    </section>
    
    <!-- Categories Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Shop by Category</h2>
          <p class="text-neutral-600 max-w-2xl mx-auto">Browse our wide range of medications and medical equipment categorized for easy navigation.</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <NuxtLink v-for="category in featuredCategories" :key="category.slug" 
                   :to="`/category/${category.slug}`"
                   class="group">
            <div class="card p-4 text-center transition-all hover:border-primary-300 h-full flex flex-col justify-between">
              <div class="mb-4 mx-auto p-3 rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors w-16 h-16 flex items-center justify-center">
                <span :class="`text-3xl ${category.icon}`"></span>
              </div>
              <div>
                <h3 class="font-medium text-lg text-neutral-800 mb-2">{{ category.name }}</h3>
                <p class="text-sm text-neutral-500">{{ category.description }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
        
        <!-- <div class="text-center mt-10">
          <NuxtLink to="/categories" class="btn-outline">View All Categories</NuxtLink>
        </div> -->
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="py-12 md:py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Popular Products</h2>
            <p class="text-neutral-600">Top-selling medications and health products our customers love.</p>
          </div>
          <div class="hidden md:block">
            <NuxtLink to="/products" class="btn-outline">View All</NuxtLink>
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
            @add-to-cart="addToCart"
          />
        </div>
        
        <div class="text-center mt-8 md:hidden">
          <NuxtLink to="/products" class="btn-outline">View All Products</NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Why Choose MediPharm?</h2>
          <p class="text-neutral-600 max-w-2xl mx-auto">We're committed to providing the highest quality healthcare products with exceptional service.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div class="card p-6">
            <div class="mb-4 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <span class="i-iconify-ph-certificate-fill text-2xl text-primary-600"></span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-2">Genuine Products</h3>
            <p class="text-neutral-600">All our medicines and equipment are sourced from authorized distributors and manufacturers.</p>
          </div>
          
          <div class="card p-6">
            <div class="mb-4 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <span class="i-iconify-ph-truck-fill text-2xl text-primary-600"></span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-2">Fast Delivery</h3>
            <p class="text-neutral-600">Quick and reliable delivery to ensure you never run out of essential medications.</p>
          </div>
          
          <div class="card p-6">
            <div class="mb-4 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <span class="i-iconify-ph-user-focus-fill text-2xl text-primary-600"></span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-2">Expert Consultation</h3>
            <p class="text-neutral-600">Our qualified pharmacists are available to provide guidance and answer your questions.</p>
          </div>
          
          <div class="card p-6">
            <div class="mb-4 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <span class="i-iconify-ph-shield-check-fill text-2xl text-primary-600"></span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-2">Secure Checkout</h3>
            <p class="text-neutral-600">Your personal and payment information is protected with advanced encryption technology.</p>
          </div>
          
          <div class="card p-6">
            <div class="mb-4 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <span class="i-iconify-ph-currency-circle-dollar-fill text-2xl text-primary-600"></span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-2">Competitive Pricing</h3>
            <p class="text-neutral-600">We offer the best prices on medications and medical equipment without compromising quality.</p>
          </div>
          
          <div class="card p-6">
            <div class="mb-4 w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <span class="i-iconify-ph-headset-fill text-2xl text-primary-600"></span>
            </div>
            <h3 class="text-xl font-semibold text-neutral-800 mb-2">24/7 Customer Support</h3>
            <p class="text-neutral-600">Our dedicated customer service team is always available to assist you.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="py-12 md:py-16 bg-primary-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">What Our Customers Say</h2>
          <p class="text-neutral-600 max-w-2xl mx-auto">Thousands of satisfied customers trust MediPharm for their healthcare needs.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="card p-6">
            <div class="flex text-warning-500 mb-4">
              <span v-for="n in 5" :key="n" class="i-iconify-ph-star-fill"></span>
            </div>
            <p class="text-neutral-700 mb-6 text-lg italic">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover mr-4">
              <div>
                <h4 class="font-medium text-neutral-800">{{ testimonial.name }}</h4>
                <p class="text-sm text-neutral-500">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container-custom">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Health Tips</h2>
              <p class="text-primary-100 mb-6">Subscribe to our newsletter and receive health tips, exclusive offers, and updates on new products.</p>
              <div class="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Your email address" class="input bg-white/10 text-white placeholder:text-primary-200 border-primary-400 focus:ring-white flex-grow" />
                <button class="btn bg-white text-primary-700 hover:bg-primary-50">Subscribe</button>
              </div>
              <p class="text-xs text-primary-200 mt-3">By subscribing, you agree to our Privacy Policy and consent to receive updates from MediPharm.</p>
            </div>
            <div class="hidden md:flex justify-end">
              <img src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg" alt="Health Newsletter" class="w-48 h-48 object-cover rounded-full">
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Health Articles Preview -->
    <section class="py-12 md:py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Health & Wellness Articles</h2>
            <p class="text-neutral-600">Expert advice and information to help you stay healthy.</p>
          </div>
          <div class="hidden md:block">
            <NuxtLink to="/blog" class="btn-outline">View All Articles</NuxtLink>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="(article, index) in articles" :key="index" 
                   :to="`/blog/${article.slug}`"
                   class="card group overflow-hidden">
            <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover transition-transform group-hover:scale-105">
            <div class="p-6">
              <p class="text-sm text-primary-600 mb-2">{{ article.category }}</p>
              <h3 class="font-semibold text-lg text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">{{ article.title }}</h3>
              <p class="text-neutral-600 mb-4 line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img :src="article.authorAvatar" :alt="article.author" class="w-8 h-8 rounded-full object-cover mr-2">
                  <span class="text-sm text-neutral-600">{{ article.author }}</span>
                </div>
                <span class="text-sm text-neutral-500">{{ article.date }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
        
        <div class="text-center mt-8 md:hidden">
          <NuxtLink to="/blog" class="btn-outline">View All Articles</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

// Import cart store
const cartStore = useCartStore()

// Featured Categories
const featuredCategories = [
  {
    name: 'Allergy',
    slug: 'allergy',
    description: 'Products to help manage allergy symptoms.',
    icon: 'i-iconify-ph-sun-fill'
  },
  // add for me 10 left categories for to complete the tasks: cold-flu, diabetes-care, first-aid, heart-health, medical-devices, otc-medicines, pain-relief, personal-care, skin-care, vitamins-supplyments
  {
    name: 'Cold & Flu',
    slug: 'cold-flu',
    description: 'Relief for cold and flu symptoms.',
    icon: 'i-iconify-ph-thermometer-fill'
  },
  {
    name: 'Diabetes Care',
    slug: 'diabetes-care',
    description: 'Essential products for diabetes management.',
    icon: 'i-iconify-ph-blood-drop-fill'
  },
  {
    name: 'First Aid',
    slug: 'first-aid',
    description: 'Complete first aid kits and supplies.',
    icon: 'i-iconify-ph-first-aid-kit-fill'
  },
  {
    name: 'Heart Health',
    slug: 'heart-health',
    description: 'Medications and devices for heart health.',
    icon: 'i-iconify-ph-heart-fill'
  },
  {
    name: 'Medical Devices',
    slug: 'medical-devices',
    description: 'Quality medical devices for home use.',
    icon: 'i-iconify-ph-stethoscope-fill'
  },
  {
    name: 'OTC Medicines',
    slug: 'otc-medicines',
    description: 'Over-the-counter medications for common ailments.',
    icon: 'i-iconify-ph-pills-fill'
  },
  {
    name: 'Pain Relief',
    slug: 'pain-relief',
    description: 'Effective pain relief solutions.',
    icon: 'i-iconify-ph-clipboard-heart-fill'
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Personal care products for everyday needs.',
    icon: 'i-iconify-ph-shower-fill'
  },
  {
    name: 'Skin Care',
    slug: 'skin-care',
    description: 'Skincare products for all skin types.',
    icon: 'i-iconify-ph-skin-care-fill'
  },
  {
    name: 'Vitamins & Supplements',
    slug: 'vitamins-supplements',
    description: 'Vitamins and supplements to boost your health.',
    icon: 'i-iconify-ph-vitamin-fill'
  }
]

// Featured Products
const featuredProducts = [
  {
    id: 1,
    name: 'Advanced Pain Relief Tablets',
    slug: 'advanced-pain-relief-tablets',
    category: 'Pain Relief',
    price: 12.99,
    image: 'https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isRx: false,
    discount: 0
  },
  {
    id: 2,
    name: 'Premium Digital Blood Pressure Monitor',
    slug: 'premium-digital-blood-pressure-monitor',
    category: 'Medical Devices',
    price: 49.99,
    image: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isRx: false,
    discount: 10
  },
  {
    id: 3,
    name: 'Cold & Flu Relief Combo Pack',
    slug: 'cold-flu-relief-combo-pack',
    category: 'Cold & Flu',
    price: 19.99,
    image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    isRx: false,
    discount: 0
  },
  {
    id: 4,
    name: 'Daily Multivitamin Complex',
    slug: 'daily-multivitamin-complex',
    category: 'Vitamins',
    price: 24.99,
    image: 'https://images.pexels.com/photos/5528884/pexels-photo-5528884.jpeg',
    rating: 4.6,
    reviews: 94,
    inStock: true,
    isRx: false,
    discount: 15
  }
]

// Testimonials
const testimonials = [
  {
    name: 'Emily Johnson',
    location: 'New York, USA',
    content: 'MediPharm has made managing my chronic condition so much easier. The automatic refills and fast delivery ensure I never miss a dose. Their customer service is exceptional!',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
  },
  {
    name: 'Michael Patel',
    location: 'Chicago, USA',
    content: "I've been using MediPharm for over a year now and couldn't be happier. Their prices are competitive, and the prescription upload process is incredibly simple.",
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  },
  {
    name: 'Sarah Richardson',
    location: 'Boston, USA',
    content: 'As someone who takes multiple medications, MediPharm has been a lifesaver. Their pharmacists are always available to answer questions about potential drug interactions.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  }
]

// Health Articles
const articles = [
  {
    title: 'Understanding Blood Pressure: What the Numbers Mean',
    slug: 'understanding-blood-pressure',
    excerpt: 'Learn about the importance of monitoring your blood pressure and what the readings actually indicate for your health.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
    date: 'May 15, 2025',
    author: 'Dr. James Wilson',
    authorAvatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
    category: 'Heart Health'
  },
  {
    title: 'The Importance of Vitamin D: Are You Getting Enough?',
    slug: 'importance-of-vitamin-d',
    excerpt: 'Vitamin D deficiency is common, especially in winter months. Discover how to ensure you\'re getting adequate levels.',
    image: 'https://images.pexels.com/photos/4046767/pexels-photo-4046767.jpeg',
    date: 'May 10, 2025',
    author: 'Dr. Lisa Chen',
    authorAvatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
    category: 'Nutrition'
  },
  {
    title: 'Managing Seasonal Allergies: Tips and Treatments',
    slug: 'managing-seasonal-allergies',
    excerpt: 'Seasonal allergies affect millions. Here are effective strategies to minimize symptoms and enjoy the outdoors again.',
    image: 'https://images.pexels.com/photos/5938360/pexels-photo-5938360.jpeg',
    date: 'May 5, 2025',
    author: 'Dr. Robert Taylor',
    authorAvatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg',
    category: 'Allergy'
  }
]

// Add product to cart
const addToCart = (product) => {
  cartStore.addItem(product)
}
</script>