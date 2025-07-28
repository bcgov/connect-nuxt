// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  compatibilityDate: '2025-07-10',

  extends: ['@sbc-connect/nuxt-base'],

  modules: ['@pinia/nuxt'],

  alias: {
    '#auth': resolve('./')
  },

  css: [
    resolve('./app/assets/css/tw-auth.css')
  ],

  runtimeConfig: {
    public: {
      idpUrl: 'https://dev.loginproxy.gov.bc.ca/auth',
      idpRealm: 'bcregistry',
      idpClientid: 'connect-web'
    }
  }
})
