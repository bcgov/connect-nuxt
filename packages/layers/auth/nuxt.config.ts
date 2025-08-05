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
    'pinia-plugin-persistedstate/nuxt'
  ],

  alias: {
    '#auth': resolve('./')
  },

  icon: {
    clientBundle: {
      icons: [
        'mdi:bell-outline',
        'mdi:account-outline',
        'mdi:logout-variant',
        'mdi:account-group-outline',
        'mdi:account-card-details-outline',
        'mdi:two-factor-authentication',
        'mdi:new-box'
      ]
    }
  },

  piniaPluginPersistedstate: {
    storage: 'sessionStorage'
  },

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en-CA',
        language: 'en-CA',
        dir: 'ltr',
        file: 'en-CA.ts'
      },
      {
        name: 'Français',
        code: 'fr-CA',
        language: 'fr-CA',
        dir: 'ltr',
        file: 'fr-CA.ts'
      }
    ]
  },

  runtimeConfig: {
    public: {
      idpUrl: '',
      idpRealm: '',
      idpClientid: '',
      siteminderLogoutUrl: '',
      authApiUrl: '',
      authApiVersion: '',
      xApiKey: '',
      authWebUrl: '',
      tokenRefreshInterval: '',
      tokenMinValidity: '',
      sessionInactivityTimeout: '',
      sessionModalTimeout: ''
    }
  }
})
