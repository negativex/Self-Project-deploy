<template>
  <div class="payment-form">
    <!-- Payment Method Selection -->
    <div class="mb-6">
      <h3 class="font-medium text-gray-800 mb-4">Payment Method</h3>
      <div class="space-y-3">
        <div 
          v-for="method in paymentMethods" 
          :key="method.id" 
          class="border rounded-lg p-4 flex items-center cursor-pointer transition-all duration-200"
          :class="selectedMethod === method.id ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'"
          @click="selectMethod(method.id)"
        >
          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3"
               :class="selectedMethod === method.id ? 'border-primary-600' : 'border-gray-300'">
            <div v-if="selectedMethod === method.id" class="w-3 h-3 rounded-full bg-primary-600"></div>
          </div>
          <div class="flex-grow flex items-center justify-between">
            <div class="flex items-center">
              <!-- Credit Card Icon -->
              <svg v-if="method.icon === 'credit-card'" class="w-8 h-8 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <!-- Debit Card Icon -->
              <svg v-else-if="method.icon === 'debit-card'" class="w-8 h-8 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p class="font-medium text-gray-800">{{ method.name }}</p>
                <p class="text-sm text-gray-500">{{ method.description }}</p>
              </div>
            </div>
            <div v-if="method.secure" class="flex items-center text-xs text-green-600">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
              </svg>
              Secure
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Credit/Debit Card Form -->
    <div v-if="selectedMethod === 'credit-card'" class="bg-gray-50 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-medium text-gray-800">Card Information</h4>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">We accept:</span>
          <div class="flex space-x-1">
            <img src="/images/visa.svg" alt="Visa" class="h-6" />
            <img src="/images/mastercard.svg" alt="Mastercard" class="h-6" />
            <img src="/images/amex.svg" alt="American Express" class="h-6" />
            <img src="/images/discover.svg" alt="Discover" class="h-6" />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Card Number -->
        <div>
          <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">
            Card Number <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              id="cardNumber"
              v-model="cardDetails.number"
              type="text"
              class="payment-input pl-12"
              :class="{'border-red-500 focus:ring-red-500': errors.number}"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              @input="formatCardNumber"
              @blur="validateCardNumber"
              autocomplete="cc-number"
            />
            
            <!-- Card type icon -->
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img 
                v-if="cardType && cardType !== 'unknown'" 
                :src="`/images/${cardType}.svg`"
                :alt="cardType"
                class="h-6"
                @error="handleImageError"
              />
              <svg v-else class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>

            <!-- Validation indicator -->
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg v-if="cardDetails.number && !errors.number" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <p v-if="errors.number" class="text-red-600 text-sm mt-1">{{ errors.number }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Expiry Date -->
          <div>
            <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date <span class="text-red-500">*</span>
            </label>
            <input
              id="expiryDate"
              v-model="cardDetails.expiry"
              type="text"
              class="payment-input"
              :class="{'border-red-500 focus:ring-red-500': errors.expiry}"
              placeholder="MM/YY"
              maxlength="5"
              @input="formatExpiryDate"
              @blur="validateExpiryDate"
              autocomplete="cc-exp"
            />
            <p v-if="errors.expiry" class="text-red-600 text-sm mt-1">{{ errors.expiry }}</p>
          </div>

          <!-- CVV -->
          <div>
            <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">
              CVV <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="cvv"
                v-model="cardDetails.cvv"
                type="text"
                class="payment-input pr-8"
                :class="{'border-red-500 focus:ring-red-500': errors.cvv}"
                :placeholder="cardType === 'amex' ? '1234' : '123'"
                :maxlength="cardType === 'amex' ? 4 : 3"
                @blur="validateCVV"
                autocomplete="cc-csc"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showCVVHelp = !showCVVHelp"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <p v-if="errors.cvv" class="text-red-600 text-sm mt-1">{{ errors.cvv }}</p>
            
            <!-- CVV Help Tooltip -->
            <div v-if="showCVVHelp" class="absolute z-10 mt-1 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg max-w-xs">
              <p class="mb-1">
                <strong>{{ cardType === 'amex' ? '4-digit code' : '3-digit code' }}</strong>
              </p>
              <p>
                {{ cardType === 'amex' 
                  ? 'Found on the front of your American Express card'
                  : 'Found on the back of your card, usually after your card number'
                }}
              </p>
            </div>
          </div>

          <!-- ZIP Code -->
          <div>
            <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code <span class="text-red-500">*</span>
            </label>
            <input
              id="zipCode"
              v-model="cardDetails.zipCode"
              type="text"
              class="payment-input"
              :class="{'border-red-500 focus:ring-red-500': errors.zipCode}"
              placeholder="12345"
              maxlength="10"
              @blur="validateZipCode"
              autocomplete="postal-code"
            />
            <p v-if="errors.zipCode" class="text-red-600 text-sm mt-1">{{ errors.zipCode }}</p>
          </div>
        </div>

        <!-- Cardholder Name -->
        <div>
          <label for="cardholderName" class="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name <span class="text-red-500">*</span>
          </label>
          <input
            id="cardholderName"
            v-model="cardDetails.name"
            type="text"
            class="payment-input"
            :class="{'border-red-500 focus:ring-red-500': errors.name}"
            placeholder="John Doe"
            @blur="validateCardholderName"
            autocomplete="cc-name"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Save Card Option -->
        <div class="flex items-center">
          <input
            id="saveCard"
            v-model="cardDetails.saveCard"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="saveCard" class="ml-2 text-sm text-gray-700">
            Save this card for future purchases
          </label>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
          </svg>
          <div>
            <p class="text-sm font-medium text-green-800">Your payment is secure</p>
            <p class="text-xs text-green-700">
              Your payment information is encrypted using 256-bit SSL technology
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Debit Card Form -->
    <div v-else-if="selectedMethod === 'debit-card'" class="bg-gray-50 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-medium text-gray-800">Debit Card Information</h4>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">We accept:</span>
          <div class="flex space-x-1">
            <img src="/images/visa.svg" alt="Visa Debit" class="h-6" />
            <img src="/images/mastercard.svg" alt="Mastercard Debit" class="h-6" />
          </div>
        </div>
      </div>

      <!-- Debit card form would be similar to credit card -->
      <div class="text-sm text-gray-600 mb-4">
        <p>Enter your debit card information. Funds will be immediately deducted from your bank account.</p>
      </div>

      <!-- Debit card form fields (same as credit card) -->
      <div class="space-y-4">
        <!-- Card Number -->
        <div>
          <label for="debitCardNumber" class="block text-sm font-medium text-gray-700 mb-1">
            Debit Card Number <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              id="debitCardNumber"
              v-model="cardDetails.number"
              type="text"
              class="payment-input pl-12"
              :class="{'border-red-500 focus:ring-red-500': errors.number}"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              @input="formatCardNumber"
              @blur="validateCardNumber"
              autocomplete="cc-number"
            />
            
            <!-- Card type icon -->
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img 
                v-if="cardType && cardType !== 'unknown'" 
                :src="`/images/${cardType}.svg`"
                :alt="cardType"
                class="h-6"
                @error="handleImageError"
              />
              <svg v-else class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
            </div>

            <!-- Validation indicator -->
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg v-if="cardDetails.number && !errors.number" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <p v-if="errors.number" class="text-red-600 text-sm mt-1">{{ errors.number }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Expiry Date -->
          <div>
            <label for="debitExpiryDate" class="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date <span class="text-red-500">*</span>
            </label>
            <input
              id="debitExpiryDate"
              v-model="cardDetails.expiry"
              type="text"
              class="payment-input"
              :class="{'border-red-500 focus:ring-red-500': errors.expiry}"
              placeholder="MM/YY"
              maxlength="5"
              @input="formatExpiryDate"
              @blur="validateExpiryDate"
              autocomplete="cc-exp"
            />
            <p v-if="errors.expiry" class="text-red-600 text-sm mt-1">{{ errors.expiry }}</p>
          </div>

          <!-- CVV -->
          <div>
            <label for="debitCvv" class="block text-sm font-medium text-gray-700 mb-1">
              CVV <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="debitCvv"
                v-model="cardDetails.cvv"
                type="text"
                class="payment-input pr-8"
                :class="{'border-red-500 focus:ring-red-500': errors.cvv}"
                placeholder="123"
                maxlength="3"
                @blur="validateCVV"
                autocomplete="cc-csc"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showCVVHelp = !showCVVHelp"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <p v-if="errors.cvv" class="text-red-600 text-sm mt-1">{{ errors.cvv }}</p>
          </div>

          <!-- PIN (Optional for debit cards) -->
          <div>
            <label for="debitPin" class="block text-sm font-medium text-gray-700 mb-1">
              PIN (Optional)
            </label>
            <input
              id="debitPin"
              type="password"
              class="payment-input"
              placeholder="••••"
              maxlength="4"
              autocomplete="off"
            />
            <p class="text-xs text-gray-500 mt-1">For online verification if required</p>
          </div>
        </div>

        <!-- Cardholder Name -->
        <div>
          <label for="debitCardholderName" class="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name <span class="text-red-500">*</span>
          </label>
          <input
            id="debitCardholderName"
            v-model="cardDetails.name"
            type="text"
            class="payment-input"
            :class="{'border-red-500 focus:ring-red-500': errors.name}"
            placeholder="John Doe"
            @blur="validateCardholderName"
            autocomplete="cc-name"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Billing Zip Code -->
        <div>
          <label for="debitZipCode" class="block text-sm font-medium text-gray-700 mb-1">
            Billing Zip Code <span class="text-red-500">*</span>
          </label>
          <input
            id="debitZipCode"
            v-model="cardDetails.zipCode"
            type="text"
            class="payment-input"
            :class="{'border-red-500 focus:ring-red-500': errors.zipCode}"
            placeholder="12345"
            maxlength="10"
            @blur="validateZipCode"
            autocomplete="postal-code"
          />
          <p v-if="errors.zipCode" class="text-red-600 text-sm mt-1">{{ errors.zipCode }}</p>
        </div>

        <!-- Save Card Option -->
        <div class="flex items-center">
          <input
            id="saveDebitCard"
            v-model="cardDetails.saveCard"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="saveDebitCard" class="ml-2 block text-sm text-gray-700">
            Save this debit card for future purchases
          </label>
        </div>

        <!-- Security Notice -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-3">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-green-800">Secure debit card processing</p>
              <p class="text-xs text-green-700">
                Funds will be immediately debited from your bank account. Your information is encrypted using 256-bit SSL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotificationsStore } from '~/stores/notifications'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'validation-change'])

const notifications = useNotificationsStore()

// Payment methods (removed PayPal)
const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, American Express, Discover',
    icon: 'credit-card',
    secure: true
  },
  {
    id: 'debit-card', 
    name: 'Debit Card',
    description: 'Direct bank account payment',
    icon: 'debit-card',
    secure: true
  }
]

// Reactive data
const selectedMethod = ref('credit-card')
const showCVVHelp = ref(false)

const cardDetails = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: '',
  zipCode: '',
  saveCard: false
})

const errors = ref({})

// Card type detection
const cardType = computed(() => {
  const number = cardDetails.value.number.replace(/\D/g, '')
  if (!number) return null
  
  if (number.startsWith('4')) return 'visa'
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard'
  if (/^3[47]/.test(number)) return 'amex'
  if (/^6(?:011|5)/.test(number)) return 'discover'
  
  return 'unknown'
})

// Validation computed
const isValid = computed(() => {
  return Object.keys(errors.value).length === 0 && 
         selectedMethod.value &&
         ((!['credit-card', 'debit-card'].includes(selectedMethod.value)) || 
          (cardDetails.value.number && cardDetails.value.expiry && 
           cardDetails.value.cvv && cardDetails.value.name && cardDetails.value.zipCode))
})

// Watch for validation changes
watch(isValid, (newValue) => {
  emit('validation-change', newValue)
})

// Watch for model changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedMethod.value = newValue.method || 'credit-card'
    if (newValue.cardDetails) {
      cardDetails.value = { ...cardDetails.value, ...newValue.cardDetails }
    }
  }
})

// Emit changes
watch([selectedMethod, cardDetails], () => {
  emit('update:modelValue', {
    method: selectedMethod.value,
    cardDetails: cardDetails.value
  })
}, { deep: true })

// Methods
const selectMethod = (methodId) => {
  selectedMethod.value = methodId
  errors.value = {}
}

const handleImageError = (event) => {
  console.warn('Card logo image failed to load:', event.target.src)
  // Hide the image on error so the fallback SVG shows
  event.target.style.display = 'none'
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  let formattedValue = ''
  
  // Format based on card type
  if (cardType.value === 'amex') {
    // American Express: 4-6-5 format
    formattedValue = value.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
  } else {
    // Others: 4-4-4-4 format
    formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  }
  
  cardDetails.value.number = formattedValue
  validateCardNumber()
}

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  cardDetails.value.expiry = value
}

// Validation methods
const validateCardNumber = () => {
  const number = cardDetails.value.number.replace(/\D/g, '')
  
  if (!number) {
    errors.value.number = 'Card number is required'
    return false
  }
  
  if (number.length < 13 || number.length > 19) {
    errors.value.number = 'Please enter a valid card number'
    return false
  }
  
  // Luhn algorithm validation
  if (!luhnCheck(number)) {
    errors.value.number = 'Please enter a valid card number'
    return false
  }
  
  delete errors.value.number
  return true
}

const validateExpiryDate = () => {
  const expiry = cardDetails.value.expiry
  
  if (!expiry) {
    errors.value.expiry = 'Expiry date is required'
    return false
  }
  
  const [month, year] = expiry.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1
  
  if (!month || !year || month < 1 || month > 12) {
    errors.value.expiry = 'Please enter a valid expiry date'
    return false
  }
  
  const expiryYear = parseInt(year)
  const expiryMonth = parseInt(month)
  
  if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
    errors.value.expiry = 'Card has expired'
    return false
  }
  
  delete errors.value.expiry
  return true
}

const validateCVV = () => {
  const cvv = cardDetails.value.cvv
  const expectedLength = cardType.value === 'amex' ? 4 : 3
  
  if (!cvv) {
    errors.value.cvv = 'CVV is required'
    return false
  }
  
  if (cvv.length !== expectedLength) {
    errors.value.cvv = `CVV must be ${expectedLength} digits`
    return false
  }
  
  delete errors.value.cvv
  return true
}

const validateCardholderName = () => {
  const name = cardDetails.value.name.trim()
  
  if (!name) {
    errors.value.name = 'Cardholder name is required'
    return false
  }
  
  if (name.length < 2) {
    errors.value.name = 'Please enter a valid name'
    return false
  }
  
  delete errors.value.name
  return true
}

const validateZipCode = () => {
  const zipCode = cardDetails.value.zipCode
  
  if (!zipCode) {
    errors.value.zipCode = 'ZIP code is required'
    return false
  }
  
  // Basic US ZIP code validation
  if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
    errors.value.zipCode = 'Please enter a valid ZIP code'
    return false
  }
  
  delete errors.value.zipCode
  return true
}

// Luhn algorithm for card validation
const luhnCheck = (number) => {
  let sum = 0
  let alternate = false
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i))
    
    if (alternate) {
      digit *= 2
      if (digit > 9) {
        digit = (digit % 10) + 1
      }
    }
    
    sum += digit
    alternate = !alternate
  }
  
  return sum % 10 === 0
}

// Process payment method
const processPayment = async (orderData) => {
  try {
    if (!isValid.value) {
      throw new Error('Please complete all required payment fields')
    }

    // Simulate payment processing
    notifications.loading('Processing payment...')
    
    // Here you would integrate with a real payment processor like Stripe, Square, etc.
    const paymentData = {
      method: selectedMethod.value,
      cardNumber: cardDetails.value.number.replace(/\D/g, '').slice(-4), // Only store last 4 digits
      cardType: cardType.value,
      amount: orderData.total,
      currency: 'USD',
      orderId: orderData.id
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    notifications.success('Payment processed successfully')
    return paymentData
    
  } catch (error) {
    notifications.error('Payment failed: ' + error.message)
    throw error
  }
}

// Expose methods
defineExpose({
  processPayment,
  validateForm: () => isValid.value
})
</script>

<style scoped>
.payment-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.payment-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.payment-form {
  position: relative;
}
</style>
