<template>
  <header class="bg-white shadow-sm sticky top-0 z-50 animate-fade-in">
    <div class="container-custom">
      <!-- Top Bar -->
      <div class="hidden md:flex items-center justify-between py-2 border-b border-neutral-100 text-sm">
        <div class="flex items-center space-x-6">
          <a href="tel:+842873023456" class="flex items-center text-neutral-600 hover:text-primary-600">
            <span class="i-iconify-ph-phone-fill mr-1.5"></span>
            <span>(028) 73023456</span>
          </a>
          <a href="mailto:sale@nhathuoclongchau.com.vn" class="flex items-center text-neutral-600 hover:text-primary-600">
            <span class="i-iconify-ph-envelope-fill mr-1.5"></span>
            <span>sale@nhathuoclongchau.com.vn</span>
          </a>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/shipping-policy" class="text-neutral-600 hover:text-primary-600">Shipping</NuxtLink>
          <NuxtLink to="/faq" class="text-neutral-600 hover:text-primary-600">FAQs</NuxtLink>
          <span class="text-neutral-300">|</span>
          <div v-if="isAuthenticated" class="relative" @mouseleave="accountDropdownOpen = false">
            <button @mouseenter="accountDropdownOpen = true" 
                    class="flex items-center text-neutral-700 hover:text-primary-600">
              <span>{{ authStore.getUserRole === 'ADMIN' ? 'Admin Panel' : 'My Account' }}</span>
              <span v-if="authStore.getUserRole === 'ADMIN'" class="ml-2 px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">ADMIN</span>
              <span class="i-iconify-ph-caret-down-fill ml-1"></span>
            </button>
            <div v-if="accountDropdownOpen" 
                 class="absolute right-0 top-full mt-1 w-48 bg-white shadow-md rounded-md py-2 z-10 animate-slide-up">
              
              <!-- Admin-specific links first -->
              <template v-if="authStore.getUserRole === 'ADMIN'">
                <NuxtLink to="/admin" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 font-medium">Admin Dashboard</NuxtLink>
                <div class="border-t border-neutral-200 my-2"></div>
                <div class="px-4 py-1">
                  <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Admin Functions</span>
                </div>
                <NuxtLink to="/admin/products" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Manage Products</NuxtLink>
                <NuxtLink to="/admin/orders" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Manage Orders</NuxtLink>
                <NuxtLink to="/admin/prescriptions" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Prescriptions</NuxtLink>
                <NuxtLink to="/admin/inventory" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Inventory</NuxtLink>
                <NuxtLink to="/admin/categories" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Categories</NuxtLink>
                <div class="border-t border-neutral-200 my-2"></div>
                <div class="px-4 py-1">
                  <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Personal</span>
                </div>
              </template>
              
              <!-- Regular user links (shown for both admin and customer) -->
              <NuxtLink :to="authStore.getUserRole === 'ADMIN' ? '/account' : '/account'" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">My Profile</NuxtLink>
              <NuxtLink to="/account/orders" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">My Orders</NuxtLink>
              <NuxtLink to="/account/prescriptions" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">My Prescriptions</NuxtLink>
              <NuxtLink to="/account/medication-reminders" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Med Reminders</NuxtLink>
              <NuxtLink to="/health-assessment" class="block px-4 py-2 hover:bg-neutral-50 text-neutral-700">Health Assessment</NuxtLink>
              
              <div class="border-t border-neutral-200 my-2"></div>
              <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700">Logout</button>
            </div>
          </div>
          <template v-else>
            <NuxtLink to="/login" class="text-neutral-600 hover:text-primary-600">Login</NuxtLink>
            <span class="text-neutral-300">|</span>
            <NuxtLink to="/register" class="text-neutral-600 hover:text-primary-600">Register</NuxtLink>
          </template>
        </div>
      </div>
      
      <!-- Main Header -->
      <div class="flex items-center justify-between py-4">
        <div class="flex items-center">
          <NuxtLink to="/" class="mr-8">
            <img src="https://placehold.co/200x50?text=Long%20Châu" alt="Long Châu Logo" class="h-10">
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-8">
            <NuxtLink v-for="item in mainNavItems" :key="item.path" 
                     :to="item.path" 
                     class="font-medium text-neutral-700 hover:text-primary-600">
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Cart -->
          <div class="relative" @mouseleave="cartDropdownOpen = false">
            <button @mouseenter="cartDropdownOpen = true" class="flex items-center justify-center h-10 w-10 rounded-full hover:bg-neutral-100 relative">
              <span class="i-iconify-ph-shopping-cart-fill text-2xl"></span>
              <span v-if="cartItemCount > 0" class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {{ cartItemCount }}
              </span>
            </button>
            
            <!-- Cart Dropdown -->
            <div v-if="cartDropdownOpen" class="absolute right-0 top-full mt-1 w-80 bg-white shadow-md rounded-md py-3 z-10 animate-slide-up">
              <div v-if="cartItemCount === 0" class="px-4 py-6 text-center text-neutral-500">
                Your cart is empty
              </div>
              <template v-else>
                <div class="max-h-60 overflow-y-auto px-4">
                  <div v-for="(item, index) in cartItems" :key="index" class="flex items-center py-2 border-b border-neutral-100 last:border-b-0">
                    <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-md">
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium text-neutral-800 line-clamp-1">{{ item.name }}</p>
                      <div class="flex items-center justify-between mt-1">
                        <p class="text-sm text-neutral-500">{{ item.quantity }} × ${{ item.price.toFixed(2) }}</p>
                        <button @click="removeFromCart(index)" class="text-neutral-400 hover:text-error-500">
                          <span class="i-iconify-ph-trash text-lg"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 border-t border-neutral-100">
                  <div class="flex items-center justify-between mb-3">
                    <span class="font-medium">Subtotal:</span>
                    <span class="font-medium">${{ cartTotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex space-x-2">
                    <NuxtLink to="/cart" class="btn-outline text-sm py-1.5 flex-1">View Cart</NuxtLink>
                    <NuxtLink to="/checkout" class="btn-primary text-sm py-1.5 flex-1">Checkout</NuxtLink>
                  </div>
                </div>
              </template>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-neutral-100">
            <span v-if="!mobileMenuOpen" class="i-iconify-ph-list-bold text-2xl"></span>
            <span v-else class="i-iconify-ph-x-bold text-2xl"></span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-neutral-100 animate-slide-up">
      <div class="container-custom py-4">
        <nav class="space-y-2">
          <NuxtLink v-for="item in mainNavItems" :key="item.path" 
                   :to="item.path" 
                   class="block py-2 font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100 last:border-b-0">
            {{ item.name }}
          </NuxtLink>
        </nav>
        
        <div class="mt-4 pt-4 border-t border-neutral-100 flex flex-col space-y-2">
          <template v-if="isAuthenticated">
            <NuxtLink to="/account" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-user-circle-fill mr-2 text-xl"></span>
              <span>My Account</span>
            </NuxtLink>
            <NuxtLink to="/account/prescriptions" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-prescription-fill mr-2 text-xl"></span>
              <span>Prescriptions</span>
            </NuxtLink>
            <NuxtLink to="/account/medication-reminders" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-bell-fill mr-2 text-xl"></span>
              <span>Med Reminders</span>
            </NuxtLink>
            <NuxtLink to="/health-assessment" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-clipboard-fill mr-2 text-xl"></span>
              <span>Health Assessment</span>
            </NuxtLink>
            <button @click="logout" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-sign-out-fill mr-2 text-xl"></span>
              <span>Logout</span>
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-sign-in-fill mr-2 text-xl"></span>
              <span>Login</span>
            </NuxtLink>
            <NuxtLink to="/register" class="flex items-center py-2 text-neutral-700 hover:text-primary-600">
              <span class="i-iconify-ph-user-plus-fill mr-2 text-xl"></span>
              <span>Register</span>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
    
    <!-- Category Navigation -->
    <div class="hidden lg:block bg-neutral-50 border-t border-b border-neutral-200">
      <div class="container-custom">
        <nav class="flex items-center space-x-8 py-2 overflow-x-auto">
          <NuxtLink to="/book-consultation" 
                   class="whitespace-nowrap text-sm font-medium text-primary-600 hover:text-primary-700 py-1">
            Book Consultation
          </NuxtLink>
          <NuxtLink to="/blog" 
                   class="whitespace-nowrap text-sm font-medium text-green-600 hover:text-green-700 py-1">
            Health Blog
          </NuxtLink>
          <NuxtLink v-for="category in categories" :key="category.slug" 
                   :to="`/category/${category.slug}`" 
                   class="whitespace-nowrap text-sm text-neutral-600 hover:text-primary-600 py-1">
            {{ category.name }}
          </NuxtLink>
          <NuxtLink to="/drug-info" 
                   class="whitespace-nowrap text-sm text-neutral-600 hover:text-primary-600 py-1">
            Drug Information
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

// State
const mobileMenuOpen = ref(false)
const cartDropdownOpen = ref(false)
const accountDropdownOpen = ref(false)

// Get authentication status from store
const isAuthenticated = computed(() => authStore.isLoggedIn)

// Navigation items
const mainNavItems = [
  { name: 'Home', path: '/' },
  { name: 'OTC Medicines', path: '/category/otc-medicines' },
  { name: 'Prescription', path: '/category/prescription' },
  { name: 'Medical Equipment', path: '/category/medical-devices' },
  { name: 'Health Blog', path: '/blog' },
  { name: 'Book Consultation', path: '/book-consultation' },
  { name: 'Health Assessment', path: '/health-assessment' },
  { name: 'Drug Information', path: '/drug-info' },
  { name: 'Contact', path: '/contact' }
]

// Categories for category navigation
const categories = [
  { name: 'Pain Relief', slug: 'pain-relief' },
  { name: 'Cold & Flu', slug: 'cold-flu' },
  { name: 'Allergy', slug: 'allergy' },
  { name: 'Diabetes Care', slug: 'diabetes-care' },
  { name: 'First Aid', slug: 'first-aid' },
  { name: 'Vitamins & Supplements', slug: 'vitamins-supplements' },
  { name: 'Personal Care', slug: 'personal-care' },
  { name: 'Skin Care', slug: 'skin-care' },
  { name: 'Medical Devices', slug: 'medical-devices' },
  { name: 'Skin care', slug: 'skin-care' },
  { name: 'OTC Medicines', slug: 'otc-medicines' }
]

// Cart computed properties
const cartItems = computed(() => cartStore.items)
const cartItemCount = computed(() => cartStore.itemCount)
const cartTotal = computed(() => cartStore.total)

// Methods
const removeFromCart = (index) => {
  cartStore.removeItem(index)
}

const logout = () => {
  // Use auth store to logout
  authStore.logout()
  accountDropdownOpen.value = false
  // Navigate to home page after logout
  navigateTo('/')
}
</script>