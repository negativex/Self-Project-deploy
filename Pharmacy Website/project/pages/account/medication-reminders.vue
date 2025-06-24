// filepath: c:\Users\Admin\Desktop\project-bolt-sb1-mqqvvjv9\project\pages\account\medication-reminders.vue
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
                <label class="block text-sm font-medium text-neutral-700 mb-1">Medication Name</label>
                <input v-model="newReminder.name" type="text" class="input" required placeholder="Enter medication name">
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Dosage</label>
                <input v-model="newReminder.dosage" type="text" class="input" placeholder="e.g., 1 tablet">
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Frequency</label>
                <select v-model="newReminder.frequency" class="input">
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="every-8-hours">Every 8 hours</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Time</label>
                <input v-model="newReminder.time" type="time" class="input">
              </div>
              <button type="submit" class="btn-primary w-full">Add Reminder</button>
            </form>
          </div>
        </div>
        
        <!-- Current reminders -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="p-6 border-b border-neutral-200">
              <h2 class="text-lg font-semibold text-neutral-800">Your Active Reminders</h2>
            </div>
            
            <div v-if="reminders.length === 0" class="p-6 text-center">
              <p class="text-neutral-500">You don't have any medication reminders set up yet.</p>
            </div>
            
            <div v-else class="divide-y divide-neutral-100">
              <!-- Reminders would be listed here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reminders = ref([])
const newReminder = ref({
  name: '',
  dosage: '',
  frequency: 'daily',
  time: ''
})

function addReminder() {
  // Add the reminder to the list
  reminders.value.push({
    id: Date.now(),
    ...newReminder.value
  })
  
  // Reset the form
  newReminder.value = {
    name: '',
    dosage: '',
    frequency: 'daily',
    time: ''
  }
}
</script>