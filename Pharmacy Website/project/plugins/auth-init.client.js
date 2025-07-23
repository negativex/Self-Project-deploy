import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Initialize authentication on app start
  authStore.initializeAuth()
})
