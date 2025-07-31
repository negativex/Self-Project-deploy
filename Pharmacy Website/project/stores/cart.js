import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  
  getters: {
    itemCount: (state) => state.items.length,
    
    total: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
  },
  
  actions: {
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        })
      }
      this.saveToLocalStorage()
    },
    
    updateQuantity(index, quantity) {
      if (this.items[index]) {
        this.items[index].quantity = quantity
        this.saveToLocalStorage()
      }
    },
    
    removeItem(index) {
      this.items.splice(index, 1)
      this.saveToLocalStorage()
    },
    
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    // Get current user ID from auth store
    getCurrentUserId() {
      if (process.client) {
        const { useAuthStore } = require('~/stores/auth')
        const authStore = useAuthStore()
        return authStore.user?.id || 'guest'
      }
      return 'guest'
    },

    // Get user-specific cart key
    getCartKey() {
      const userId = this.getCurrentUserId()
      return `pharmacy-cart-${userId}`
    },
    
    saveToLocalStorage() {
      if (process.client) {
        const cartKey = this.getCartKey()
        localStorage.setItem(cartKey, JSON.stringify(this.items))
      }
    },
    
    loadFromLocalStorage() {
      if (process.client) {
        const cartKey = this.getCartKey()
        const saved = localStorage.getItem(cartKey)
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (error) {
            console.error('Error loading cart from localStorage:', error)
            this.items = []
          }
        } else {
          this.items = []
        }
      }
    },

    // Clear cart for specific user
    clearUserCart(userId = null) {
      if (process.client) {
        const userIdToUse = userId || this.getCurrentUserId()
        const cartKey = `pharmacy-cart-${userIdToUse}`
        localStorage.removeItem(cartKey)
        this.items = []
      }
    },

    // Load cart for specific user (called when user logs in/out)
    loadUserCart(userId = null) {
      if (process.client) {
        const userIdToUse = userId || this.getCurrentUserId()
        const cartKey = `pharmacy-cart-${userIdToUse}`
        const saved = localStorage.getItem(cartKey)
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (error) {
            console.error('Error loading user cart from localStorage:', error)
            this.items = []
          }
        } else {
          this.items = []
        }
      }
    },
    
    async addToCart(product, quantity) {
      if (!product) return
      
      this.addItem(product, quantity)
      
      // Use toast notification instead of alert
      const { useNotificationsStore } = await import('~/stores/notifications')
      const notifications = useNotificationsStore()
      notifications.success(`${product.name} added to cart!`)
    }
  },
})