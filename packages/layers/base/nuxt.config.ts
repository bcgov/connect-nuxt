// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  alias: {
    'BCGovFonts': resolve('./public/fonts/BCSans'),
    'BCGovLogoSmEn': resolve('./public/BCGovLogo/gov_bc_logo_vert_en.png'),
    'BCGovLogoSmFr': resolve('./public/BCGovLogo/gov_bc_logo_vert_fr.png'),
    'BCGovLogoLgEn': resolve('./public/BCGovLogo/gov_bc_logo_horiz_en.png'),
    'BCGovLogoLgFr': resolve('./public/BCGovLogo/gov_bc_logo_horiz_fr.png'),
    '#base': resolve('./')
  },

  compatibilityDate: '2025-07-10',

  // For more details on i18n in layers: https://i18n.nuxtjs.org/docs/guide/layers
  // For more details on config: https://i18n.nuxtjs.org/docs/api/options
  i18n: {
    defaultLocale: 'en-CA',
    detectBrowserLanguage: false,
    langDir: 'locales',
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
    ],
    strategy: 'prefix'
  }
})
