// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  piniaPluginPersistedstate: {
    key: 'study-app_%id',
    storage: 'cookies', // 'localStorage', 'sessionStorage', 'cookies'
    cookieOptions: {
      sameSite: 'lax',
      secure: true, // true on production
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },
  pinia: {
    storesDirs: ['./app/stores/**'], // tuỳ bạn
  },
})
