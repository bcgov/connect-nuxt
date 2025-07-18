// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  compatibilityDate: '2025-06-10',

  extends: ['@sbc-connect/nuxt-auth']
})
