// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  compatibilityDate: '2025-06-10',

  extends: ['@sbc-connect/nuxt-auth'],

  imports: {
    dirs: ['interfaces', 'enums', 'stores', 'services']
  },

  alias: {
    '#pay': resolve('./')
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
      payApiUrl: '',
      payApiVersion: '',
      paymentPortalUrl: ''
    }
  },

  // Nuxt 4 tsconfig `references` context workaround for type augmentation
  // Forces type augmentations into the correct context
  // https://nuxt.com/docs/4.x/guide/modules/recipes-advanced#extend-typescript-config
  // Can also force sharedReferences, nodeReferences - and nitro references using the 'nitro:prepare:types' hook
  hooks: {
    'prepare:types': ({ references }) => {
      references.push(
        { path: resolve('./app/types/pay-plugins.d.ts') }
      )
    }
  }
})
