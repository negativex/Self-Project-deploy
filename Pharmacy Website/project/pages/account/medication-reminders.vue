<template>
  <div class="py-8 md:py-12">
    <div class="container-custom">
      <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">Medication Reminders</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Add new reminder form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-neutral-800 mb-4">Add New Reminder</h2>
            <form @submit.prevent="addReminder" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Medication Name *</label>
                <input v-model="newReminder.medicationName" type="text" class="input" required placeholder="Enter medication name">
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Dosage</label>
                <input v-model="newReminder.dosage" type="text" class="input" placeholder="e.g., 1 tablet, 5ml">
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Frequency *</label>
                <select v-model="newReminder.frequency" class="input" required>
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="three-times-daily">Three Times Daily</option>
                  <option value="every-8-hours">Every 8 hours</option>
                  <option value="every-12-hours">Every 12 hours</option>
                  <option value="weekly">Weekly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Reminder Times</label>
                <div class="space-y-2">
                  <div v-for="(time, index) in newReminder.timeSlots" :key="index" class="flex items-center gap-2">
                    <input v-model="newReminder.timeSlots[index]" type="time" class="input flex-1">
                    <button type="button" @click="removeTimeSlot(index)" class="text-red-500 hover:text-red-700">
                      <span class="i-iconify-ph-trash text-lg"></span>
                    </button>
                  </div>
                  <button type="button" @click="addTimeSlot" class="text-sm text-primary-600 hover:text-primary-700">
                    + Add Time
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Notes</label>
                <textarea v-model="newReminder.notes" class="input h-20" placeholder="Any additional notes"></textarea>
              </div>
              <button type="submit" class="btn-primary w-full" :disabled="loading">
                <span v-if="loading" class="i-iconify-ph-spinner text-lg animate-spin mr-2"></span>
                Add Reminder
              </button>
            </form>
          </div>
        </div>
        
        <!-- Current reminders -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="p-6 border-b border-neutral-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-neutral-800">Your Active Reminders</h2>
                <div class="flex items-center gap-2">
                  <button 
                    @click="showActive = true" 
                    :class="showActive ? 'btn-primary' : 'btn-outline'"
                    class="text-sm px-3 py-1"
                  >
                    Active
                  </button>
                  <button 
                    @click="showActive = false" 
                    :class="!showActive ? 'btn-primary' : 'btn-outline'"
                    class="text-sm px-3 py-1"
                  >
                    All
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="loading" class="p-6 text-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p class="text-neutral-500 mt-2">Loading reminders...</p>
            </div>
            
            <div v-else-if="filteredReminders.length === 0" class="p-6 text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <span class="i-iconify-ph-bell-slash text-2xl text-neutral-400"></span>
              </div>
              <p class="text-neutral-500">{{ showActive ? 'No active reminders set up yet.' : 'No reminders found.' }}</p>
            </div>
            
            <div v-else class="divide-y divide-neutral-100">
              <div v-for="reminder in filteredReminders" :key="reminder.id" class="p-6">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="font-semibold text-neutral-900">{{ reminder.medicationName }}</h3>
                      <span 
                        :class="reminder.isActive ? 'bg-success-100 text-success-800' : 'bg-neutral-100 text-neutral-800'"
                        class="px-2 py-1 text-xs rounded-full"
                      >
                        {{ reminder.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    
                    <div class="space-y-1 text-sm text-neutral-600">
                      <p v-if="reminder.dosage" class="flex items-center gap-2">
                        <span class="i-iconify-ph-pill text-primary-500"></span>
                        <span>{{ reminder.dosage }}</span>
                      </p>
                      <p class="flex items-center gap-2">
                        <span class="i-iconify-ph-clock text-primary-500"></span>
                        <span>{{ formatFrequency(reminder.frequency) }}</span>
                      </p>
                      <div v-if="reminder.timeSlots && reminder.timeSlots.length > 0" class="flex items-center gap-2">
                        <span class="i-iconify-ph-alarm text-primary-500"></span>
                        <span>{{ reminder.timeSlots.join(', ') }}</span>
                      </div>
                      <p v-if="reminder.nextReminder" class="flex items-center gap-2">
                        <span class="i-iconify-ph-calendar text-primary-500"></span>
                        <span>Next: {{ formatDate(reminder.nextReminder) }}</span>
                      </p>
                      <p v-if="reminder.notes" class="flex items-start gap-2 mt-2">
                        <span class="i-iconify-ph-note text-primary-500 mt-0.5"></span>
                        <span>{{ reminder.notes }}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2 ml-4">
                    <button 
                      @click="toggleReminder(reminder)"
                      :class="reminder.isActive ? 'text-warning-600 hover:text-warning-700' : 'text-success-600 hover:text-success-700'"
                      class="p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                      :title="reminder.isActive ? 'Pause reminder' : 'Resume reminder'"
                    >
                      <span :class="reminder.isActive ? 'i-iconify-ph-pause' : 'i-iconify-ph-play'" class="text-lg"></span>
                    </button>
                    <button 
                      @click="editReminder(reminder)"
                      class="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit reminder"
                    >
                      <span class="i-iconify-ph-pencil-simple text-lg"></span>
                    </button>
                    <button 
                      @click="deleteReminder(reminder.id)"
                      class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete reminder"
                    >
                      <span class="i-iconify-ph-trash text-lg"></span>
                    </button>
                  </div>
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
import { ref, computed, onMounted } from 'vue'
import { useNotificationsStore } from '~/stores/notifications'

definePageMeta({
  middleware: 'auth'
})

const notifications = useNotificationsStore()

const reminders = ref([])
const loading = ref(false)
const showActive = ref(true)

const newReminder = ref({
  medicationName: '',
  dosage: '',
  frequency: 'daily',
  timeSlots: ['08:00'],
  notes: ''
})

const filteredReminders = computed(() => {
  if (showActive.value) {
    return reminders.value.filter(r => r.isActive)
  }
  return reminders.value
})

// Load reminders from API
const loadReminders = async () => {
  try {
    loading.value = true
    const { data } = await $fetch('/api/medication-reminders', {
      query: {
        isActive: showActive.value
      }
    })
    reminders.value = data.reminders || []
  } catch (error) {
    console.error('Error loading reminders:', error)
    notifications.error('Failed to load medication reminders')
  } finally {
    loading.value = false
  }
}

const addReminder = async () => {
  try {
    loading.value = true
    
    if (!newReminder.value.medicationName.trim()) {
      notifications.error('Please enter a medication name')
      return
    }

    const { data } = await $fetch('/api/medication-reminders', {
      method: 'POST',
      body: newReminder.value
    })

    reminders.value.unshift(data.reminder)
    notifications.success('Medication reminder added successfully!')
    
    // Reset form
    newReminder.value = {
      medicationName: '',
      dosage: '',
      frequency: 'daily',
      timeSlots: ['08:00'],
      notes: ''
    }
  } catch (error) {
    console.error('Error adding reminder:', error)
    notifications.error('Failed to add medication reminder')
  } finally {
    loading.value = false
  }
}

const toggleReminder = async (reminder) => {
  try {
    const { data } = await $fetch(`/api/medication-reminders/${reminder.id}`, {
      method: 'PATCH',
      body: {
        isActive: !reminder.isActive
      }
    })
    
    reminder.isActive = data.reminder.isActive
    notifications.success(`Reminder ${reminder.isActive ? 'resumed' : 'paused'} successfully`)
  } catch (error) {
    console.error('Error toggling reminder:', error)
    notifications.error('Failed to update reminder')
  }
}

const deleteReminder = async (reminderId) => {
  if (!confirm('Are you sure you want to delete this reminder?')) {
    return
  }

  try {
    await $fetch(`/api/medication-reminders/${reminderId}`, {
      method: 'DELETE'
    })
    
    reminders.value = reminders.value.filter(r => r.id !== reminderId)
    notifications.success('Reminder deleted successfully')
  } catch (error) {
    console.error('Error deleting reminder:', error)
    notifications.error('Failed to delete reminder')
  }
}

const editReminder = (reminder) => {
  // For now, just populate the form with the existing data
  newReminder.value = {
    medicationName: reminder.medicationName,
    dosage: reminder.dosage || '',
    frequency: reminder.frequency,
    timeSlots: reminder.timeSlots || ['08:00'],
    notes: reminder.notes || ''
  }
  
  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' })
  notifications.info('Edit the reminder details and click "Add Reminder" to update')
}

const addTimeSlot = () => {
  newReminder.value.timeSlots.push('09:00')
}

const removeTimeSlot = (index) => {
  if (newReminder.value.timeSlots.length > 1) {
    newReminder.value.timeSlots.splice(index, 1)
  }
}

const formatFrequency = (frequency) => {
  const frequencies = {
    'daily': 'Once daily',
    'twice-daily': 'Twice daily',
    'three-times-daily': 'Three times daily',
    'every-8-hours': 'Every 8 hours',
    'every-12-hours': 'Every 12 hours',
    'weekly': 'Weekly',
    'as-needed': 'As needed'
  }
  return frequencies[frequency] || frequency
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadReminders()
})

// Watch for showActive changes
watch(showActive, () => {
  loadReminders()
})
</script>