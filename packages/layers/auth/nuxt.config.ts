// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  compatibilityDate: '2025-07-10',

  extends: ['@sbc-connect/nuxt-base'],

  alias: {
    '#auth': resolve('./')
  },

  css: [
    resolve('./app/assets/css/tw-auth.css')
  ],

  runtimeConfig: {
    public: {
      // Should in alphabetical order
      appName: process.env.npm_package_name || '',
      version: `Connect Auth Layer v${process.env.npm_package_version || ''}`
    }
  }
})
