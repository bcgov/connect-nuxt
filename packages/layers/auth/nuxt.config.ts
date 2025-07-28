// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  compatibilityDate: '2025-07-10',

  extends: ['@sbc-connect/nuxt-base'],

  imports: {
    dirs: ['interfaces', 'types', 'enums', 'stores']
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  alias: {
    '#auth': resolve('./')
  },

  css: [
    resolve('./app/assets/css/tw-auth.css')
  ],

  piniaPluginPersistedstate: {
    storage: 'sessionStorage'
  },

  runtimeConfig: {
    public: {
      idpUrl: '',
      idpRealm: '',
      idpClientid: '',
      siteminderLogoutUrl: '',
      authApiUrl: '',
      authApiVersion: '',
      xApiKey: ''
    }
  }
})
