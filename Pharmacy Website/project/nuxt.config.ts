// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
  ],
  
  app: {
    head: {
      title: 'MediPharm - Online Pharmacy & Medical Equipment',
      meta: [
        { name: 'description', content: 'Your trusted online pharmacy for medications and medical equipment' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  
  colorMode: {
    preference: 'light',
    classSuffix: ''
  },
  
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  
  imports: {
    dirs: ['stores']
  },
  
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: false,
  }
})