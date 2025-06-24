<template>
  <div class="py-8 md:py-12">
    <div class="container-custom">
      <!-- Breadcrumb -->
      <nav class="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/" class="text-neutral-500 hover:text-primary-600">
              Home
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <span class="mx-2 text-neutral-400">/</span>
              <NuxtLink :to="`/category/${product.categorySlug}`" class="text-neutral-500 hover:text-primary-600">
                {{ product.category }}
              </NuxtLink>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <span class="mx-2 text-neutral-400">/</span>
              <span class="text-neutral-700">{{ product.name }}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <!-- Product Detail -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Product Images -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
            <img :src="product.image" :alt="product.name" class="w-full h-auto object-cover">
          </div>
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(image, index) in product.gallery" :key="index" class="bg-white rounded border border-neutral-200 cursor-pointer hover:border-primary-500 transition-colors">
              <img :src="image" :alt="`${product.name} - View ${index + 1}`" class="w-full h-auto object-cover">
            </div>
          </div>
          
          <!-- Product Trust Badges -->
          <div class="mt-6 border-t border-neutral-200 pt-6">
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center justify-center p-3 bg-primary-50 rounded-md">
                <span class="i-iconify-ph-shield-check-fill text-xl text-primary-600 mr-2"></span>
                <span class="text-xs font-medium">Genuine Products</span>
              </div>
              <div class="flex items-center justify-center p-3 bg-primary-50 rounded-md">
                <span class="i-iconify-ph-truck-fill text-xl text-primary-600 mr-2"></span>
                <span class="text-xs font-medium">Fast Delivery</span>
              </div>
              <div class="flex items-center justify-center p-3 bg-primary-50 rounded-md">
                <span class="i-iconify-ph-currency-circle-dollar-fill text-xl text-primary-600 mr-2"></span>
                <span class="text-xs font-medium">Secure Payment</span>
              </div>
              <div class="flex items-center justify-center p-3 bg-primary-50 rounded-md">
                <span class="i-iconify-ph-phone-fill text-xl text-primary-600 mr-2"></span>
                <span class="text-xs font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Product Information -->
        <div class="lg:col-span-2">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{{ product.name }}</h1>
            
            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex text-warning-500">
                <span v-for="n in 5" :key="n" :class="[n <= Math.floor(product.rating) ? 'i-iconify-ph-star-fill' : 'i-iconify-ph-star text-neutral-300']"></span>
              </div>
              <span class="text-sm text-neutral-600 ml-2">{{ product.rating }} ({{ product.reviews }} reviews)</span>
              <span class="mx-2 text-neutral-300">|</span>
              <span class="text-sm" :class="product.inStock ? 'text-success-500' : 'text-accent-600'">
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
            
            <!-- Price -->
            <div class="mb-6">
              <div class="flex items-center">
                <span v-if="product.discount > 0" class="text-neutral-500 text-lg line-through mr-3">
                  ${{ (product.price * (1 + product.discount / 100)).toFixed(2) }}
                </span>
                <span class="text-2xl font-bold text-neutral-900">${{ product.price.toFixed(2) }}</span>
                <span v-if="product.discount > 0" class="ml-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {{ product.discount }}% OFF
                </span>
              </div>
              <p class="text-sm text-neutral-500 mt-1" v-if="product.tax">
                + {{ product.tax }} tax
              </p>
            </div>
            
            <!-- Short Description -->
            <div class="mb-6 text-neutral-700">
              <p>{{ product.shortDescription }}</p>
            </div>
            
            <!-- Prescription Notice -->
            <div v-if="product.isRx" class="bg-primary-50 border border-primary-100 rounded-md p-4 mb-6">
              <div class="flex">
                <span class="i-iconify-ph-prescription-fill text-xl text-primary-600 mr-2 mt-0.5"></span>
                <div>
                  <h3 class="font-medium text-primary-700 mb-1">Prescription Required</h3>
                  <p class="text-sm text-primary-600">
                    This medication requires a valid prescription from a healthcare provider. 
                    You can upload your prescription during checkout.
                  </p>
                  <NuxtLink to="/upload-prescription" class="text-sm font-medium text-primary-700 hover:text-primary-800 mt-2 inline-block">
                    Learn more about our prescription policy
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- Variants (if applicable) -->
            <div v-if="product.variants && product.variants.length > 0" class="mb-6">
              <h3 class="font-medium text-neutral-700 mb-2">{{ product.variantLabel || 'Select Option' }}</h3>
              <div class="flex flex-wrap gap-2">
                <button v-for="(variant, index) in product.variants" 
                        :key="index"
                        class="px-4 py-2 rounded-md border transition-colors"
                        :class="selectedVariantIndex === index 
                                ? 'border-primary-500 bg-primary-50 text-primary-700' 
                                : 'border-neutral-300 hover:border-primary-300 text-neutral-700'"
                        @click="selectedVariantIndex = index">
                  {{ variant.name }}
                </button>
              </div>
            </div>
            
            <!-- Quantity -->
            <div class="mb-6">
              <h3 class="font-medium text-neutral-700 mb-2">Quantity</h3>
              <div class="flex items-center">
                <button @click="decreaseQuantity" 
                        :disabled="quantity <= 1"
                        class="px-3 py-2 border border-neutral-300 rounded-l-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                        :class="{'opacity-50 cursor-not-allowed': quantity <= 1}">
                  <span class="i-iconify-ph-minus-bold"></span>
                </button>
                <input type="number" v-model.number="quantity" min="1" :max="product.maxQuantity || 10" 
                       class="w-16 text-center border-y border-neutral-300 py-2 focus:outline-none">
                <button @click="increaseQuantity" 
                        :disabled="quantity >= (product.maxQuantity || 10)"
                        class="px-3 py-2 border border-neutral-300 rounded-r-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                        :class="{'opacity-50 cursor-not-allowed': quantity >= (product.maxQuantity || 10)}">
                  <span class="i-iconify-ph-plus-bold"></span>
                </button>
              </div>
            </div>
            
            <!-- Add to Cart -->
            <div class="flex flex-col sm:flex-row gap-3 mb-8">
              <template v-if="product.isRx">
                <button class="btn-primary px-8 py-3" @click="addToCart" :disabled="!product.inStock">
                  Add to Cart with Prescription
                </button>
                <NuxtLink to="/upload-prescription" class="btn-outline px-6">
                  Upload Prescription
                </NuxtLink>
              </template>
              <template v-else-if="product.inStock">
                <button class="btn-primary px-8 py-3" @click="addToCart">
                  Add to Cart
                </button>
                <button class="btn-outline px-6" @click="buyNow">
                  Buy Now
                </button>
                <button class="btn-ghost px-4" @click="addToWishlist">
                  <span class="i-iconify-ph-heart text-xl"></span>
                </button>
              </template>
              <template v-else>
                <button class="btn-primary px-8 py-3 opacity-50 cursor-not-allowed" disabled>
                  Out of Stock
                </button>
                <button class="btn-outline px-6" @click="notifyWhenAvailable">
                  Notify When Available
                </button>
              </template>
            </div>
            
            <!-- Product Details Tabs -->
            <div class="border rounded-lg overflow-hidden">
              <div class="flex border-b">
                <button v-for="(tab, index) in tabs" 
                        :key="tab.id"
                        class="px-4 py-3 font-medium text-sm flex-1 text-center transition-colors"
                        :class="activeTab === index 
                                ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-500' 
                                : 'text-neutral-600 hover:bg-neutral-50'"
                        @click="activeTab = index">
                  {{ tab.name }}
                </button>
              </div>
              
              <!-- Tab Content -->
              <div class="p-4 md:p-6">
                <!-- Description -->
                <div v-if="activeTab === 0" class="prose max-w-none">
                  <p class="mb-4">{{ product.description }}</p>
                  
                  <h4 class="font-semibold text-lg mb-2">Key Benefits:</h4>
                  <ul class="list-disc pl-5 mb-4">
                    <li v-for="(benefit, index) in product.benefits" :key="index" class="mb-1">
                      {{ benefit }}
                    </li>
                  </ul>
                </div>
                
                <!-- Ingredients -->
                <div v-if="activeTab === 1" class="prose max-w-none">
                  <template v-if="product.ingredients">
                    <p class="mb-4">{{ product.ingredientsDescription }}</p>
                    
                    <div v-if="Array.isArray(product.ingredients)" class="mb-4">
                      <h4 class="font-semibold text-lg mb-2">Active Ingredients:</h4>
                      <ul class="list-disc pl-5">
                        <li v-for="(ingredient, index) in product.ingredients" :key="index" class="mb-1">
                          {{ ingredient }}
                        </li>
                      </ul>
                    </div>
                    <div v-else class="mb-4">
                      <p>{{ product.ingredients }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <p>Information about the ingredients is currently not available for this product.</p>
                  </template>
                </div>
                
                <!-- Directions -->
                <div v-if="activeTab === 2" class="prose max-w-none">
                  <template v-if="product.directions">
                    <p class="mb-4">{{ product.directions }}</p>
                    
                    <div v-if="product.dosage" class="mb-4">
                      <h4 class="font-semibold text-lg mb-2">Recommended Dosage:</h4>
                      <p>{{ product.dosage }}</p>
                    </div>
                    
                    <div v-if="product.warnings && product.warnings.length > 0" class="bg-warning-50 border border-warning-100 rounded-md p-4 mt-4">
                      <h4 class="font-semibold text-warning-700 mb-2">Important Warnings:</h4>
                      <ul class="list-disc pl-5 text-warning-700">
                        <li v-for="(warning, index) in product.warnings" :key="index" class="mb-1">
                          {{ warning }}
                        </li>
                      </ul>
                    </div>
                  </template>
                  <template v-else>
                    <p>Detailed usage directions are currently not available for this product.</p>
                  </template>
                </div>
                
                <!-- Reviews -->
                <div v-if="activeTab === 3">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <p class="text-3xl font-bold text-neutral-900">{{ product.rating }}<span class="text-lg text-neutral-500">/5</span></p>
                      <div class="flex text-warning-500 mt-1">
                        <span v-for="n in 5" :key="n" :class="[n <= Math.floor(product.rating) ? 'i-iconify-ph-star-fill' : 'i-iconify-ph-star text-neutral-300']"></span>
                      </div>
                      <p class="text-sm text-neutral-500 mt-1">Based on {{ product.reviews }} reviews</p>
                    </div>
                    <button class="btn-outline">Write a Review</button>
                  </div>
                  
                  <div v-if="product.reviewList && product.reviewList.length > 0" class="space-y-4">
                    <div v-for="(review, index) in product.reviewList" :key="index" class="border-b border-neutral-200 pb-4 last:border-b-0">
                      <div class="flex justify-between mb-2">
                        <div class="flex items-center">
                          <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-lg mr-3">
                            {{ review.name.charAt(0) }}
                          </div>
                          <div>
                            <p class="font-medium text-neutral-800">{{ review.name }}</p>
                            <p class="text-xs text-neutral-500">{{ review.date }}</p>
                          </div>
                        </div>
                        <div class="flex text-warning-500">
                          <span v-for="n in 5" :key="n" :class="[n <= review.rating ? 'i-iconify-ph-star-fill' : 'i-iconify-ph-star text-neutral-300']"></span>
                        </div>
                      </div>
                      <p class="text-neutral-700">{{ review.comment }}</p>
                    </div>
                  </div>
                  <div v-else class="text-center py-8">
                    <p class="text-neutral-500 mb-3">No reviews yet</p>
                    <button class="btn-outline">Be the first to write a review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <section class="mt-12 md:mt-16">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="relatedProduct" 
            @add-to-cart="addRelatedToCart"
          />
        </div>
      </section>
      
      <!-- Recently Viewed Products -->
      <section class="mt-12 md:mt-16">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">Recently Viewed</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard 
            v-for="recentProduct in recentlyViewed" 
            :key="recentProduct.id" 
            :product="recentProduct" 
            @add-to-cart="addRelatedToCart"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

// Get route parameters
const route = useRoute()
const { slug } = route.params

// Import cart store
const cartStore = useCartStore()

// State variables
const quantity = ref(1)
const selectedVariantIndex = ref(0)
const activeTab = ref(0)

// Tabs configuration
const tabs = [
  { id: 'description', name: 'Description' },
  { id: 'ingredients', name: 'Ingredients' },
  { id: 'directions', name: 'Directions & Warnings' },
  { id: 'reviews', name: 'Reviews' }
]

// Product data (in a real application, this would be fetched from an API)
const product = {
  id: 101,
  name: 'Advanced Pain Relief Ibuprofen 200mg Tablets',
  slug: 'advanced-pain-relief-ibuprofen-200mg-tablets',
  category: 'Pain Relief',
  categorySlug: 'pain-relief',
  price: 12.99,
  discount: 0,
  tax: 'Includes VAT',
  rating: 4.8,
  reviews: 124,
  inStock: true,
  isRx: false,
  maxQuantity: 5,
  shortDescription: 'Fast-acting ibuprofen tablets for effective relief from headaches, back pain, period pain, dental pain, and the symptoms of cold and flu.',
  image: 'https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg',
  gallery: [
    'https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg',
    'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg',
    'https://images.pexels.com/photos/208513/pexels-photo-208513.jpeg',
    'https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg'
  ],
  variants: [
    { name: '24 Tablets', price: 12.99 },
    { name: '48 Tablets', price: 19.99 },
    { name: '96 Tablets', price: 34.99 }
  ],
  variantLabel: 'Package Size',
  description: 'These Advanced Pain Relief Tablets contain ibuprofen, which belongs to a group of medicines called Non-Steroidal Anti-Inflammatory Drugs (NSAIDs). These medicines work by changing how the body responds to pain and swelling. The tablets are used for the relief of headaches, migraine, backache, period pain, dental pain, neuralgia, rheumatic pain, muscular pain, and the symptoms of colds and flu, including fever.',
  benefits: [
    'Fast-acting relief for headaches and migraines',
    'Reduces inflammation for back, muscle, and joint pain',
    'Helps reduce fever associated with colds and flu',
    'Easy to swallow tablets with a smooth coating',
    'Begins working in as little as 15-20 minutes'
  ],
  ingredients: [
    'Active Ingredient: Ibuprofen 200mg per tablet',
    'Inactive Ingredients: Microcrystalline cellulose, croscarmellose sodium, lactose monohydrate, silica, sodium lauryl sulfate, magnesium stearate, hypromellose, talc, titanium dioxide'
  ],
  ingredientsDescription: 'Each tablet contains 200mg of the active ingredient Ibuprofen, along with several inactive ingredients that help form the tablet and facilitate its absorption.',
  directions: 'For oral administration and short-term use only. Adults, the elderly and children & adolescents between 12 and 18 years: Take 1 or 2 tablets up to three times a day as required. Leave at least four hours between doses. Do not take more than 6 tablets in any 24-hour period.',
  dosage: 'Adults and children over 12 years: 1-2 tablets every 4-6 hours as needed, not exceeding 6 tablets in 24 hours. Children under 12 years: Not recommended unless directed by a doctor.',
  warnings: [
    'Do not use if you have a history of stomach ulcers or bleeding, severe heart failure, or severe kidney or liver problems.',
    'Consult a doctor before use if you are pregnant, breastfeeding, have asthma, or are taking other medications.',
    'Stop use and seek medical help if you experience stomach bleeding, allergic reactions, or worsening symptoms.',
    'Keep out of reach of children.',
    'Do not use after the expiry date stated on the packaging.'
  ],
  reviewList: [
    {
      name: 'Michael Johnson',
      date: 'May 12, 2025',
      rating: 5,
      comment: 'These tablets work so quickly for my tension headaches. I always keep a pack in my bag and at home.'
    },
    {
      name: 'Sarah Williams',
      date: 'April 29, 2025',
      rating: 4,
      comment: 'Good pain relief for my back pain. The tablets are easy to swallow and don\'t have a strong aftertaste like some other brands.'
    },
    {
      name: 'David Chen',
      date: 'April 15, 2025',
      rating: 5,
      comment: 'Very effective for my arthritis pain. I\'ve tried several OTC pain relievers, and this one provides the best relief with minimal side effects.'
    }
  ]
}

// Related products
const relatedProducts = [
  {
    id: 102,
    name: 'Extra Strength Acetaminophen 500mg',
    slug: 'extra-strength-acetaminophen-500mg',
    category: 'Pain Relief',
    price: 9.99,
    image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg',
    rating: 4.6,
    reviews: 98,
    inStock: true,
    isRx: false,
    discount: 0
  },
  {
    id: 103,
    name: 'Advanced Migraine Relief Formula',
    slug: 'advanced-migraine-relief-formula',
    category: 'Pain Relief',
    price: 15.99,
    image: 'https://images.pexels.com/photos/360622/pexels-photo-360622.jpeg',
    rating: 4.7,
    reviews: 54,
    inStock: true,
    isRx: false,
    discount: 10
  },
  {
    id: 104,
    name: 'Muscle & Joint Pain Relief Gel',
    slug: 'muscle-joint-pain-relief-gel',
    category: 'Pain Relief',
    price: 11.49,
    image: 'https://images.pexels.com/photos/208513/pexels-photo-208513.jpeg',
    rating: 4.5,
    reviews: 65,
    inStock: true,
    isRx: false,
    discount: 0
  },
  {
    id: 105,
    name: 'Naproxen Sodium 220mg Tablets',
    slug: 'naproxen-sodium-220mg-tablets',
    category: 'Pain Relief',
    price: 13.99,
    image: 'https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg',
    rating: 4.4,
    reviews: 42,
    inStock: false,
    isRx: false,
    discount: 0
  }
]

// Recently viewed products
const recentlyViewed = [
  {
    id: 201,
    name: 'Digital Infrared Thermometer',
    slug: 'digital-infrared-thermometer',
    category: 'Medical Devices',
    price: 29.99,
    image: 'https://images.pexels.com/photos/3987152/pexels-photo-3987152.jpeg',
    rating: 4.8,
    reviews: 112,
    inStock: true,
    isRx: false,
    discount: 15
  },
  {
    id: 202,
    name: 'Premium Vitamin D3 5000 IU',
    slug: 'premium-vitamin-d3-5000-iu',
    category: 'Vitamins',
    price: 24.99,
    image: 'https://images.pexels.com/photos/5528884/pexels-photo-5528884.jpeg',
    rating: 4.9,
    reviews: 87,
    inStock: true,
    isRx: false,
    discount: 0
  },
  {
    id: 203,
    name: 'Immune Support Zinc Lozenges',
    slug: 'immune-support-zinc-lozenges',
    category: 'Cold & Flu',
    price: 8.99,
    image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg',
    rating: 4.3,
    reviews: 56,
    inStock: true,
    isRx: false,
    discount: 0
  },
  {
    id: 204,
    name: 'Allergy Relief Cetirizine 10mg',
    slug: 'allergy-relief-cetirizine-10mg',
    category: 'Allergy',
    price: 14.99,
    image: 'https://images.pexels.com/photos/139398/himalayas-mountains-nepal-himalaya-139398.jpeg',
    rating: 4.7,
    reviews: 76,
    inStock: true,
    isRx: false,
    discount: 5
  }
]

// Methods
const increaseQuantity = () => {
  if (quantity.value < (product.maxQuantity || 10)) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  // Get the selected variant if applicable
  const selectedVariant = product.variants && product.variants.length > 0 
    ? product.variants[selectedVariantIndex.value] 
    : null
  
  // Create the cart item
  const cartItem = {
    id: product.id + (selectedVariant ? `-${selectedVariantIndex.value}` : ''),
    name: `${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''}`,
    price: selectedVariant ? selectedVariant.price : product.price,
    image: product.image,
    quantity: quantity.value
  }
  
  // Add to cart
  cartStore.addItem(cartItem, quantity.value)
  
  // Show success message (in a real app, you might use a notification system)
  alert('Product added to cart')
}

const buyNow = () => {
  // Add to cart first
  addToCart()
  
  // Then redirect to checkout
  navigateTo('/checkout')
}

const addToWishlist = () => {
  // In a real app, you would use a wishlist store
  alert('Product added to wishlist')
}

const notifyWhenAvailable = () => {
  // In a real app, you would implement an email notification system
  alert('You will be notified when this product is back in stock')
}

const addRelatedToCart = (product) => {
  cartStore.addItem(product)
  alert('Product added to cart')
}

// On component mount
onMounted(() => {
  // In a real app, you would fetch the product data based on the slug
  console.log(`Fetching product with slug: ${slug}`)
  
  // Track the product view (for analytics)
  // This would typically send an event to your analytics service
})
</script>