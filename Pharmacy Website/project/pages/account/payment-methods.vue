<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Payment Methods</h1>
              <p class="mt-1 text-sm text-gray-500">Manage your saved payment cards</p>
            </div>
            <button @click="showAddForm = true" 
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Add/Edit Payment Method Form -->
      <div v-if="showAddForm || editingCard" class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ editingCard ? 'Edit Payment Method' : 'Add New Payment Method' }}
          </h2>
          <button @click="cancelForm" 
                  class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="savePaymentMethod" class="space-y-6">
          <!-- Card Number -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
            <div class="relative">
              <input v-model="cardForm.number" 
                     type="text" 
                     required
                     maxlength="19"
                     placeholder="1234 5678 9012 3456"
                     @input="formatCardNumber"
                     class="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <img v-if="cardType" :src="getCardIcon(cardType)" :alt="cardType" class="h-6 w-10 object-contain">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Cardholder Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
              <input v-model="cardForm.name" type="text" required
                     class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>

            <!-- Expiry Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
              <input v-model="cardForm.expiry" 
                     type="text" 
                     required
                     maxlength="5"
                     placeholder="MM/YY"
                     @input="formatExpiry"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- CVV -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
              <input v-model="cardForm.cvv" 
                     type="text" 
                     required
                     maxlength="4"
                     placeholder="123"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>

            <!-- Billing ZIP -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Billing ZIP Code *</label>
              <input v-model="cardForm.billingZip" 
                     type="text" 
                     required
                     maxlength="10"
                     placeholder="12345"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>

          <!-- Nickname -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Card Nickname (Optional)</label>
            <input v-model="cardForm.nickname" 
                   type="text" 
                   placeholder="e.g., Personal Card, Work Card"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>

          <!-- Default Payment Method -->
          <div>
            <label class="flex items-center">
              <input v-model="cardForm.isDefault" type="checkbox" class="mr-2">
              <span class="text-sm text-gray-700">Set as default payment method</span>
            </label>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button type="button" @click="cancelForm" 
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" :disabled="saving"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
              {{ saving ? 'Saving...' : (editingCard ? 'Update Card' : 'Save Card') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Payment Methods Grid -->
      <div v-if="paymentMethods.length === 0 && !showAddForm" class="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No payment methods yet</h3>
        <p class="text-gray-500 mb-6">Add a payment method for faster checkout.</p>
        <button @click="showAddForm = true" 
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Add Payment Method
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="card in paymentMethods" :key="card.id" 
             class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
          
          <!-- Default Badge -->
          <div v-if="card.isDefault" 
               class="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 z-10">
            Default
          </div>

          <!-- Card Design -->
          <div class="h-48 p-6 relative overflow-hidden"
               :class="getCardGradient(card.type)">
            
            <!-- Card Type Icon -->
            <div class="absolute top-4 left-4">
              <img :src="getCardIcon(card.type)" :alt="card.type" class="h-8 w-12 object-contain">
            </div>

            <!-- Card Number -->
            <div class="absolute bottom-16 left-4 right-4">
              <div class="text-white text-lg font-mono tracking-wider">
                •••• •••• •••• {{ card.lastFour }}
              </div>
            </div>

            <!-- Card Details -->
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <div class="text-white text-xs opacity-75 uppercase">Cardholder</div>
                <div class="text-white text-sm font-medium truncate">{{ card.name }}</div>
              </div>
              <div class="text-right">
                <div class="text-white text-xs opacity-75">Expires</div>
                <div class="text-white text-sm">{{ card.expiry }}</div>
              </div>
            </div>

            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <svg class="w-full h-full" viewBox="0 0 200 120" fill="currentColor">
                <circle cx="20" cy="20" r="40" />
                <circle cx="180" cy="100" r="60" />
                <circle cx="100" cy="60" r="30" />
              </svg>
            </div>
          </div>

          <!-- Card Info & Actions -->
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h3 class="font-medium text-gray-900">
                  {{ card.nickname || `${card.type} ••${card.lastFour}` }}
                </h3>
                <p class="text-sm text-gray-500">{{ card.type }} ending in {{ card.lastFour }}</p>
              </div>
            </div>

            <!-- Billing Info -->
            <div class="text-xs text-gray-500 mb-4">
              Billing ZIP: {{ card.billingZip }}
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-200">
              <div class="flex space-x-2">
                <button @click="editCard(card)" 
                        class="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Edit
                </button>
                <button v-if="!card.isDefault" 
                        @click="setAsDefault(card)" 
                        class="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Set Default
                </button>
              </div>
              <button @click="deleteCard(card)" 
                      class="text-sm text-red-600 hover:text-red-500 font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-blue-900">Your payment information is secure</h3>
            <p class="text-sm text-blue-700 mt-1">
              We use industry-standard encryption to protect your card details. Your full card number is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Payment Methods - MediPharm',
  meta: [
    { name: 'description', content: 'Manage your saved payment methods for faster checkout.' }
  ]
})

const authStore = useAuthStore()

// Reactive data
const showAddForm = ref(false)
const editingCard = ref(null)
const saving = ref(false)

// Card form
const cardForm = ref({
  number: '',
  name: '',
  expiry: '',
  cvv: '',
  billingZip: '',
  nickname: '',
  isDefault: false
})

// Sample payment methods - replace with API data
const paymentMethods = ref([
  {
    id: '1',
    type: 'Visa',
    lastFour: '4242',
    name: 'John Doe',
    expiry: '12/25',
    billingZip: '10001',
    nickname: 'Personal Card',
    isDefault: true
  },
  {
    id: '2',
    type: 'Mastercard',
    lastFour: '8888',
    name: 'John Doe',
    expiry: '08/26',
    billingZip: '10001',
    nickname: 'Work Card',
    isDefault: false
  }
])

// Computed
const cardType = computed(() => {
  const number = cardForm.value.number.replace(/\s/g, '')
  if (number.startsWith('4')) return 'Visa'
  if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard'
  if (number.startsWith('3')) return 'American Express'
  if (number.startsWith('6')) return 'Discover'
  return null
})

// Methods
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  cardForm.value.number = formattedValue
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  cardForm.value.expiry = value
}

const getCardIcon = (type) => {
  const icons = {
    'Visa': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8cGF0aCBkPSJNMTYuOTUgMTguNzVIMTQuM0wxMi4yNSA4LjI1SDE0LjlMMTYuOTUgMTguNzVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjYuMjUgOC40NUMyNS44NSA4LjMgMjUuMTUgOC4xIDI0LjEgOC4xQzIyIDguMSAyMC41IDkuMSAyMC41IDEwLjZDMjAuNSAxMS43IDIxLjMgMTIuMyAyMi40IDEyLjhDMjMuNSAxMy4zIDIzLjkgMTMuNiAyMy45IDE0QzIzLjkgMTQuNiAyMy4yIDE0LjkgMjIuNiAxNC45QzIxLjcgMTQuOSAyMS4yIDE0LjcgMjAuNiAxNC40TDIwLjMgMTQuMkwyMCAxNi4xQzIwLjQgMTYuMyAyMS4yIDE2LjUgMjIuMSAxNi41QzI0LjQgMTYuNSAyNS45IDE1LjUgMjUuOSAxMy45QzI1LjkgMTMuMSAyNS40IDEyLjUgMjQuMyAxMkMyMy4zIDExLjYgMjIuOCAxMS4zIDIyLjggMTAuOEMyMi44IDEwLjQgMjMuMyAxMCAyNC4yIDEwQzI0LjkgMTAgMjUuNSAxMC4yIDI1LjkgMTAuNEwyNi4xIDEwLjVMMjYuMjUgOC40NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMC45NSA4LjI1SDI5QzI4LjQgOC4yNSAyNy45IDguNTUgMjcuNyA5TDI0LjI1IDE4Ljc1SDI2LjU1TDI3LjA1IDE3LjM1SDI5Ljk1TDMwLjI1IDE4Ljc1SDMyLjI1TDMwLjk1IDguMjVaTTI3LjggMTUuNzVMMjguOSAxMi4zTDI5LjQgMTUuNzVIMjcuOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMS4wNSA4LjI1TDguOCAxOC43NUg2LjVMNS4zIDEwLjhDNS4xNSA5Ljk1IDQuOTUgOS41NSA0LjE1IDkuMTVDMy40NSA4Ljc1IDIuMzUgOC4zNSAxLjQgOC4xTDEuNjUgOC4yNUg1LjRDNi4wNSA4LjI1IDYuNiA4LjYgNi43NSA5LjRMNy44NSAxNS40TDEwLjY1IDkuMUMxMC45IDguNSAxMS40IDguMjUgMTEuMDUgOC4yNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    'Mastercard': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0ZGNUYwMCIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSI2IiBmaWxsPSIjRUE0MzM1Ii8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNGRkM1MDAiLz4KPHBhdGggZD0iTTIwIDcuNUE2IDYgMCAwIDAgMTcuNSAxMkE2IDYgMCAwIDAgMjAgMTYuNUE2IDYgMCAwIDAgMjIuNSAxMkE2IDYgMCAwIDAgMjAgNy41WiIgZmlsbD0iI0ZGNUYwMCIvPgo8L3N2Zz4K',
    'American Express': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNjZDQyIvPgo8dGV4dCB4PSIyMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BTUVYPC90ZXh0Pgo8L3N2Zz4K',
    'Discover': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0Y0N0YxQyIvPgo8dGV4dCB4PSIyMCIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRJU0NPVkVSPC90ZXh0Pgo8L3N2Zz4K'
  }
  return icons[type] || ''
}

const getCardGradient = (type) => {
  const gradients = {
    'Visa': 'bg-gradient-to-br from-blue-600 to-blue-800',
    'Mastercard': 'bg-gradient-to-br from-red-500 to-yellow-500',
    'American Express': 'bg-gradient-to-br from-blue-700 to-blue-900',
    'Discover': 'bg-gradient-to-br from-orange-500 to-orange-700'
  }
  return gradients[type] || 'bg-gradient-to-br from-gray-600 to-gray-800'
}

const savePaymentMethod = async () => {
  saving.value = true
  try {
    // Extract last 4 digits and card type
    const cleanNumber = cardForm.value.number.replace(/\s/g, '')
    const lastFour = cleanNumber.slice(-4)
    const type = cardType.value

    if (editingCard.value) {
      // Update existing card
      const index = paymentMethods.value.findIndex(card => card.id === editingCard.value.id)
      if (index !== -1) {
        paymentMethods.value[index] = {
          ...paymentMethods.value[index],
          type,
          lastFour,
          name: cardForm.value.name,
          expiry: cardForm.value.expiry,
          billingZip: cardForm.value.billingZip,
          nickname: cardForm.value.nickname,
          isDefault: cardForm.value.isDefault
        }
      }
    } else {
      // Add new card
      const newCard = {
        id: Date.now().toString(),
        type,
        lastFour,
        name: cardForm.value.name,
        expiry: cardForm.value.expiry,
        billingZip: cardForm.value.billingZip,
        nickname: cardForm.value.nickname,
        isDefault: cardForm.value.isDefault
      }
      paymentMethods.value.push(newCard)
    }

    // If this is set as default, remove default from others
    if (cardForm.value.isDefault) {
      paymentMethods.value.forEach(card => {
        if (card.id !== (editingCard.value?.id || paymentMethods.value[paymentMethods.value.length - 1].id)) {
          card.isDefault = false
        }
      })
    }

    cancelForm()
  } catch (error) {
    console.error('Error saving payment method:', error)
  } finally {
    saving.value = false
  }
}

const editCard = (card) => {
  editingCard.value = card
  cardForm.value = {
    number: `•••• •••• •••• ${card.lastFour}`,
    name: card.name,
    expiry: card.expiry,
    cvv: '',
    billingZip: card.billingZip,
    nickname: card.nickname,
    isDefault: card.isDefault
  }
  showAddForm.value = false
}

const deleteCard = async (card) => {
  if (confirm('Are you sure you want to delete this payment method?')) {
    const index = paymentMethods.value.findIndex(c => c.id === card.id)
    if (index !== -1) {
      paymentMethods.value.splice(index, 1)
    }
  }
}

const setAsDefault = async (card) => {
  // Remove default from all cards
  paymentMethods.value.forEach(c => {
    c.isDefault = c.id === card.id
  })
}

const cancelForm = () => {
  showAddForm.value = false
  editingCard.value = null
  cardForm.value = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    billingZip: '',
    nickname: '',
    isDefault: false
  }
}

// Initialize form with user data
onMounted(() => {
  if (authStore.user) {
    cardForm.value.name = `${authStore.user.firstName} ${authStore.user.lastName}`.trim()
  }
})
</script>
