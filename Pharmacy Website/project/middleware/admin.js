import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server-side rendering
  if (process.server) return

  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (!authStore.isLoggedIn) {
    authStore.initializeAuth()
  }

  // Check if user is authenticated
  if (!authStore.isLoggedIn) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  // Check if session is valid
  if (!authStore.isSessionValid) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath, message: 'Session expired. Please log in again.' }
    })
  }

  // Check if user has admin role
  if (authStore.getUserRole !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied. Admin privileges required.'
    })
  }
})
