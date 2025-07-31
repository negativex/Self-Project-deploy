import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    currentOrder: null,
    orderHistory: [],
    loading: false,
    trackingInfo: null,
    orderStatuses: [
      'pending',
      'confirmed',
      'processing',
      'packed',
      'shipped',
      'delivered',
      'cancelled'
    ]
  }),

  getters: {
    getOrderById: (state) => {
      return (id) => state.orders.find(order => order.id === id)
    },

    getPendingOrders: (state) => {
      return state.orders.filter(order => order.status === 'pending')
    },

    getCompletedOrders: (state) => {
      return state.orders.filter(order => order.status === 'delivered')
    },

    getOrdersByStatus: (state) => {
      return (status) => state.orders.filter(order => order.status === status)
    },

    getTotalOrderValue: (state) => {
      return state.orders.reduce((total, order) => total + order.total, 0)
    },

    getRecentOrders: (state) => {
      return state.orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    }
  },

  actions: {
    async createOrder(orderData) {
      this.loading = true
      try {
        const authStore = useAuthStore()
        const currentUserId = authStore.user?.id || 'demo-user'
        
        // Create order with proper structure
        const newOrder = {
          id: Date.now().toString(), // Simple ID generation for demo
          ...orderData,
          userId: currentUserId,
          createdAt: orderData.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: orderData.status || 'pending'
        }
        
        // Save to both API and localStorage for persistence
        if (process.client) {
          // Get user-specific orders key
          const ordersKey = `pharmacy-orders-${currentUserId}`
          const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]')
          existingOrders.push(newOrder)
          localStorage.setItem(ordersKey, JSON.stringify(existingOrders))
          
          // Also update global orders list for backward compatibility
          const globalOrders = JSON.parse(localStorage.getItem('pharmacy-orders') || '[]')
          globalOrders.push(newOrder)
          localStorage.setItem('pharmacy-orders', JSON.stringify(globalOrders))
        }
        
        this.orders.push(newOrder)
        this.currentOrder = newOrder
        
        // Try to create order via API as well
        try {
          await $fetch('/api/orders', {
            method: 'POST',
            body: newOrder,
            headers: authStore.token ? {
              Authorization: `Bearer ${authStore.token}`
            } : {}
          })
        } catch (apiError) {
          console.warn('API order creation failed, but order saved locally:', apiError)
        }
        
        return newOrder
      } catch (error) {
        console.error('Error creating order:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrders(params = {}) {
      this.loading = true
      try {
        // Get auth store safely
        let authStore
        let currentUserId = 'demo-user'
        
        try {
          authStore = useAuthStore()
          currentUserId = authStore.user?.id || 'demo-user'
        } catch (authError) {
          console.warn('Auth store not available, using demo user:', authError)
        }
        
        // Try to fetch from API first
        let apiOrders = []
        try {
          apiOrders = await $fetch('/api/orders', {
            headers: (authStore && authStore.token) ? {
              Authorization: `Bearer ${authStore.token}`
            } : {}
          })
        } catch (apiError) {
          console.warn('API orders fetch failed, loading from localStorage:', apiError)
        }
        
        // Load from user-specific localStorage as fallback
        if (process.client) {
          const ordersKey = `pharmacy-orders-${currentUserId}`
          const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]')
          
          console.log('Loading orders for user:', currentUserId)
          console.log('Orders key:', ordersKey)
          console.log('Existing orders found:', existingOrders.length)
          
          // If API failed, use localStorage orders
          if (apiOrders.length === 0) {
            this.orders = existingOrders.filter(order => 
              order.userId === currentUserId
            )
          } else {
            // Merge API orders with local orders (prefer API)
            const localOrderIds = existingOrders.map(o => o.id)
            const newApiOrders = apiOrders.filter(o => !localOrderIds.includes(o.id))
            this.orders = [...existingOrders, ...newApiOrders].filter(order => 
              order.userId === currentUserId
            )
          }
          
          console.log('Final orders loaded:', this.orders.length)
        } else {
          this.orders = apiOrders
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        this.orders = []
      } finally {
        this.loading = false
      }
    },

    async fetchOrderById(id) {
      this.loading = true
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        this.currentOrder = response.order || response
        return this.currentOrder
      } catch (error) {
        console.error('Error fetching order:', error)
        this.currentOrder = null
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(id, status) {
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/orders/${id}/status`, {
          method: 'PATCH',
          body: { status },
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        const orderIndex = this.orders.findIndex(order => order.id === id)
        if (orderIndex !== -1) {
          this.orders[orderIndex] = response.order || response
        }
        
        if (this.currentOrder && this.currentOrder.id === id) {
          this.currentOrder = response.order || response
        }
        
        return response
      } catch (error) {
        console.error('Error updating order status:', error)
        throw error
      }
    },

    async cancelOrder(id, reason = '') {
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/orders/${id}/cancel`, {
          method: 'POST',
          body: { reason },
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        const orderIndex = this.orders.findIndex(order => order.id === id)
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = 'cancelled'
          this.orders[orderIndex].cancelReason = reason
        }
        
        return response
      } catch (error) {
        console.error('Error cancelling order:', error)
        throw error
      }
    },

    async fetchOrderHistory(userId) {
      this.loading = true
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/users/${userId}/orders`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        this.orderHistory = response.orders || response.data || []
      } catch (error) {
        console.error('Error fetching order history:', error)
        this.orderHistory = []
      } finally {
        this.loading = false
      }
    },

    async trackOrder(orderId) {
      this.loading = true
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/orders/${orderId}/tracking`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        this.trackingInfo = response.tracking || response
        return this.trackingInfo
      } catch (error) {
        console.error('Error tracking order:', error)
        this.trackingInfo = null
        throw error
      } finally {
        this.loading = false
      }
    },

    async processPayment(orderId, paymentData) {
      this.loading = true
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/orders/${orderId}/payment`, {
          method: 'POST',
          body: paymentData,
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        // Update order status after successful payment
        const orderIndex = this.orders.findIndex(order => order.id === orderId)
        if (orderIndex !== -1) {
          this.orders[orderIndex].paymentStatus = 'paid'
          this.orders[orderIndex].status = 'confirmed'
        }
        
        return response
      } catch (error) {
        console.error('Error processing payment:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async reorderItems(orderId) {
      try {
        const authStore = useAuthStore()
        const cartStore = useCartStore()
        
        const response = await $fetch(`/api/orders/${orderId}/reorder`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        // Add items to cart
        response.items.forEach(item => {
          cartStore.addItem(item.product, item.quantity)
        })
        
        return response
      } catch (error) {
        console.error('Error reordering items:', error)
        throw error
      }
    },

    async downloadInvoice(orderId) {
      try {
        const authStore = useAuthStore()
        const response = await $fetch(`/api/orders/${orderId}/invoice`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
        
        // Handle PDF download
        if (process.client && response.downloadUrl) {
          const link = document.createElement('a')
          link.href = response.downloadUrl
          link.download = `invoice-${orderId}.pdf`
          link.click()
        }
        
        return response
      } catch (error) {
        console.error('Error downloading invoice:', error)
        throw error
      }
    },

    clearCurrentOrder() {
      this.currentOrder = null
    },

    clearTrackingInfo() {
      this.trackingInfo = null
    }
  }
})
