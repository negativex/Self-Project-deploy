<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Order Management</h1>
              <p class="mt-1 text-sm text-gray-500">View and manage all customer orders</p>
            </div>
            <div class="flex items-center space-x-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ totalOrders }} Total Orders
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="filters.status" class="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <input 
              v-model="filters.dateFrom" 
              type="date" 
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input 
              v-model="filters.dateTo" 
              type="date" 
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div class="flex items-end">
            <button 
              @click="loadOrders"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ order.customerEmail }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(order.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ order.itemCount }} items
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${{ order.total.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(order.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewOrder(order)" class="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    <button @click="updateOrderStatus(order)" class="text-green-600 hover:text-green-900">
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, totalOrders) }} of {{ totalOrders }} orders
          </div>
          <div class="flex space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              @click="currentPage++" 
              :disabled="currentPage * itemsPerPage >= totalOrders"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedOrder = null">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Order #{{ selectedOrder.id }}</h3>
            <button @click="selectedOrder = null" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-900">Customer Information</h4>
              <p class="text-sm text-gray-600">{{ selectedOrder.customerName }} ({{ selectedOrder.customerEmail }})</p>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-900">Order Items</h4>
              <div class="mt-2 space-y-2">
                <div v-for="item in selectedOrder.items" :key="item.id" class="flex justify-between text-sm">
                  <span>{{ item.name }} x {{ item.quantity }}</span>
                  <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
            
            <div class="border-t pt-4">
              <div class="flex justify-between font-medium">
                <span>Total:</span>
                <span>${{ selectedOrder.total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

useHead({
  title: 'Orders - Admin - MediPharm'
})

// Reactive data
const orders = ref([])
const totalOrders = ref(0)
const currentPage = ref(1)
const itemsPerPage = ref(20)
const selectedOrder = ref(null)

const filters = ref({
  status: '',
  dateFrom: '',
  dateTo: ''
})

// Mock data - replace with actual API calls
const loadOrders = async () => {
  // This would typically be an API call
  // For now, using mock data
  const mockOrders = [
    {
      id: 1001,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      createdAt: new Date('2024-01-15'),
      itemCount: 3,
      total: 89.97,
      status: 'pending',
      items: [
        { id: 1, name: 'Aspirin 100mg', quantity: 2, price: 12.99 },
        { id: 2, name: 'Vitamin D3', quantity: 1, price: 24.99 },
        { id: 3, name: 'Blood Pressure Monitor', quantity: 1, price: 39.99 }
      ]
    },
    {
      id: 1002,
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      createdAt: new Date('2024-01-14'),
      itemCount: 2,
      total: 45.98,
      status: 'processing',
      items: [
        { id: 4, name: 'Multivitamin', quantity: 1, price: 19.99 },
        { id: 5, name: 'Omega-3 Fish Oil', quantity: 1, price: 25.99 }
      ]
    },
    {
      id: 1003,
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      createdAt: new Date('2024-01-13'),
      itemCount: 1,
      total: 15.99,
      status: 'shipped',
      items: [
        { id: 6, name: 'Ibuprofen 200mg', quantity: 1, price: 15.99 }
      ]
    },
    {
      id: 1004,
      customerName: 'Alice Brown',
      customerEmail: 'alice@example.com',
      createdAt: new Date('2024-01-12'),
      itemCount: 4,
      total: 127.96,
      status: 'delivered',
      items: [
        { id: 7, name: 'Prescription Medicine A', quantity: 2, price: 35.99 },
        { id: 8, name: 'Prescription Medicine B', quantity: 2, price: 27.99 }
      ]
    }
  ]

  orders.value = mockOrders
  totalOrders.value = mockOrders.length
}

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const viewOrder = (order) => {
  selectedOrder.value = order
}

const updateOrderStatus = (order) => {
  // Implement order status update logic
  console.log('Update order status for:', order.id)
}

// Load orders on mount
onMounted(() => {
  loadOrders()
})
</script>
