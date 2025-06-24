<template>
  <div class="py-8 md:py-12">
    <div class="container-custom">
      <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Shopping Cart</h1>
      
      <div v-if="cartItems.length === 0" class="bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
          <span class="i-iconify-ph-shopping-cart-fill text-3xl text-neutral-400"></span>
        </div>
        <h2 class="text-xl font-semibold text-neutral-800 mb-3">Your cart is empty</h2>
        <p class="text-neutral-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <NuxtLink to="/" class="btn-primary">Continue Shopping</NuxtLink>
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div class="p-4 sm:p-6 border-b border-neutral-200">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-neutral-800">Cart Items ({{ cartItemCount }})</h2>
                <button @click="clearCart" class="text-sm text-neutral-500 hover:text-accent-600 flex items-center">
                  <span class="i-iconify-ph-trash text-lg mr-1"></span>
                  Clear Cart
                </button>
              </div>
            </div>
            
            <!-- Cart Item List -->
            <div>
              <div v-for="(item, index) in cartItems" :key="index" class="p-4 sm:p-6 border-b border-neutral-100 last:border-b-0">
                <div class="flex flex-col sm:flex-row gap-4">
                  <!-- Product Image -->
                  <div class="sm:w-20 sm:h-20">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-md">
                  </div>
                  
                  <!-- Product Details -->
                  <div class="flex-grow">
                    <div class="flex flex-col sm:flex-row justify-between">
                      <div>
                        <h3 class="font-medium text-neutral-800 mb-1">{{ item.name }}</h3>
                        <p class="text-sm text-neutral-500 mb-2">Unit Price: ${{ item.price.toFixed(2) }}</p>
                      </div>
                      <div class="flex items-center mt-2 sm:mt-0">
                        <p class="font-medium text-neutral-800">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3">
                      <!-- Quantity Selector -->
                      <div class="flex items-center">
                        <button @click="updateItemQuantity(index, item.quantity - 1)" 
                                :disabled="item.quantity <= 1" 
                                class="px-2 py-1 border border-neutral-300 rounded-l-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                                :class="{'opacity-50 cursor-not-allowed': item.quantity <= 1}">
                          <span class="i-iconify-ph-minus-bold"></span>
                        </button>
                        <input type="number" 
                               v-model.number="item.quantity" 
                               min="1" 
                               max="10" 
                               class="w-12 text-center border-y border-neutral-300 py-1 focus:outline-none"
                               @change="updateItemQuantity(index, item.quantity)">
                        <button @click="updateItemQuantity(index, item.quantity + 1)" 
                                :disabled="item.quantity >= 10" 
                                class="px-2 py-1 border border-neutral-300 rounded-r-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                                :class="{'opacity-50 cursor-not-allowed': item.quantity >= 10}">
                          <span class="i-iconify-ph-plus-bold"></span>
                        </button>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="flex items-center space-x-3 mt-3 sm:mt-0">
                        <button @click="saveForLater(index)" class="text-sm text-neutral-600 hover:text-primary-600">
                          <span class="i-iconify-ph-bookmark-simple text-lg mr-1 align-text-bottom"></span>
                          Save for Later
                        </button>
                        <button @click="removeItem(index)" class="text-sm text-neutral-600 hover:text-accent-600">
                          <span class="i-iconify-ph-trash text-lg mr-1 align-text-bottom"></span>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Saved For Later Items (if you want to implement this feature) -->
          <div v-if="savedItems.length > 0" class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div class="p-4 sm:p-6 border-b border-neutral-200">
              <h2 class="text-lg font-semibold text-neutral-800">Saved For Later ({{ savedItems.length }})</h2>
            </div>
            
            <div v-for="(item, index) in savedItems" :key="index" class="p-4 sm:p-6 border-b border-neutral-100 last:border-b-0">
              <div class="flex flex-col sm:flex-row gap-4">
                <div class="sm:w-20 sm:h-20">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-md">
                </div>
                <div class="flex-grow">
                  <div class="flex flex-col sm:flex-row justify-between">
                    <div>
                      <h3 class="font-medium text-neutral-800 mb-1">{{ item.name }}</h3>
                      <p class="text-sm text-neutral-500">${{ item.price.toFixed(2) }}</p>
                    </div>
                    <div class="flex items-center space-x-3 mt-3 sm:mt-0">
                      <button @click="moveToCart(index)" class="text-sm text-primary-600 hover:text-primary-700">
                        <span class="i-iconify-ph-shopping-cart-fill text-lg mr-1 align-text-bottom"></span>
                        Move to Cart
                      </button>
                      <button @click="removeSavedItem(index)" class="text-sm text-neutral-600 hover:text-accent-600">
                        <span class="i-iconify-ph-trash text-lg mr-1 align-text-bottom"></span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Continue Shopping Button -->
          <div class="flex justify-between">
            <NuxtLink to="/" class="btn-outline">
              <span class="i-iconify-ph-arrow-left text-lg mr-1"></span>
              Continue Shopping
            </NuxtLink>
            <button @click="updateCart" class="btn-primary">
              Update Cart
            </button>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div class="p-4 sm:p-6 border-b border-neutral-200">
              <h2 class="text-lg font-semibold text-neutral-800">Order Summary</h2>
            </div>
            
            <div class="p-4 sm:p-6">
              <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                  <span class="text-neutral-600">Subtotal</span>
                  <span class="font-medium text-neutral-800">${{ cartTotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-600">Shipping</span>
                  <span v-if="cartTotal > 50" class="text-success-500 font-medium">Free</span>
                  <span v-else class="font-medium text-neutral-800">${{ shipping.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-600">Tax (8%)</span>
                  <span class="font-medium text-neutral-800">${{ tax.toFixed(2) }}</span>
                </div>
                
                <!-- Discount Code (if applicable) -->
                <div v-if="discount > 0" class="flex justify-between text-success-600">
                  <span>Discount</span>
                  <span>-${{ discount.toFixed(2) }}</span>
                </div>
                
                <div class="border-t border-neutral-200 pt-3 mt-3">
                  <div class="flex justify-between">
                    <span class="font-semibold text-neutral-800">Total</span>
                    <span class="font-bold text-lg text-neutral-900">${{ orderTotal.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Discount Code Input -->
              <div class="mb-6">
                <div class="flex gap-2">
                  <input type="text" placeholder="Promo code" v-model="promoCode" class="input flex-grow">
                  <button @click="applyPromoCode" class="btn-outline px-4 whitespace-nowrap">Apply</button>
                </div>
                <p v-if="promoError" class="text-sm text-accent-600 mt-1">{{ promoError }}</p>
                <p v-if="promoSuccess" class="text-sm text-success-600 mt-1">{{ promoSuccess }}</p>
              </div>
              
              <!-- Checkout Button -->
              <NuxtLink to="/checkout" class="btn-primary w-full flex justify-center py-3">
                Proceed to Checkout
              </NuxtLink>
              
              <!-- Payment Methods -->
              <div class="mt-6">
                <p class="text-xs text-neutral-500 mb-2">Secure Checkout with:</p>
                <div class="flex space-x-3 justify-center">
                  <img src="https://placehold.co/40x24?text=Visa" alt="Visa" class="h-6">
                  <img src="https://placehold.co/40x24?text=MC" alt="Mastercard" class="h-6">
                  <img src="https://placehold.co/40x24?text=Amex" alt="American Express" class="h-6">
                  <img src="https://placehold.co/40x24?text=PayPal" alt="PayPal" class="h-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '~/stores/cart'

// Import cart store
const cartStore = useCartStore()

// State
const promoCode = ref('')
const promoError = ref('')
const promoSuccess = ref('')
const discount = ref(0)
const savedItems = ref([])

// Get cart items from store
const cartItems = computed(() => cartStore.items)
const cartItemCount = computed(() => cartStore.itemCount)
const cartTotal = computed(() => cartStore.total)

// Calculate shipping, tax, and order total
const shipping = computed(() => cartTotal.value > 50 ? 0 : 5.99)
const tax = computed(() => cartTotal.value * 0.08)
const orderTotal = computed(() => cartTotal.value + shipping.value + tax.value - discount.value)

// Methods
const updateItemQuantity = (index, quantity) => {
  if (quantity > 0 && quantity <= 10) {
    cartStore.updateQuantity(index, quantity)
  }
}

const removeItem = (index) => {
  cartStore.removeItem(index)
}

const clearCart = () => {
  cartStore.clearCart()
}

const saveForLater = (index) => {
  // Add the item to saved items
  savedItems.value.push(cartItems.value[index])
  
  // Remove from cart
  cartStore.removeItem(index)
}

const moveToCart = (index) => {
  // Add the item back to cart
  cartStore.addItem(savedItems.value[index])
  
  // Remove from saved items
  savedItems.value.splice(index, 1)
}

const removeSavedItem = (index) => {
  savedItems.value.splice(index, 1)
}

const updateCart = () => {
  // This function would normally update the cart in the backend
  // For this demo, we'll just show a notification
  alert('Cart updated successfully')
}

const applyPromoCode = () => {
  promoError.value = ''
  promoSuccess.value = ''
  
  if (promoCode.value.trim() === '') {
    promoError.value = 'Please enter a promo code'
    return
  }
  
  // Check for valid promo codes (in a real app, this would be validated against a database)
  if (promoCode.value.toLowerCase() === 'welcome10') {
    discount.value = cartTotal.value * 0.1 // 10% discount
    promoSuccess.value = 'Promo code applied successfully! You saved $' + discount.value.toFixed(2)
  } else if (promoCode.value.toLowerCase() === 'freeship') {
    if (cartTotal.value <= 50) {
      discount.value = shipping.value
      promoSuccess.value = 'Free shipping applied!'
    } else {
      promoError.value = 'Free shipping is already applied to orders over $50'
    }
  } else {
    promoError.value = 'Invalid promo code'
  }
}

// Reset error messages when promo code changes
watch(promoCode, () => {
  promoError.value = ''
  promoSuccess.value = ''
})
</script>