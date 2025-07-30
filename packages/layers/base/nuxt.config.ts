// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: false },

  alias: {
    'BCGovLogoSmEn': resolve('./public/BCGovLogo/gov_bc_logo_vert_en.png'),
    'BCGovLogoSmFr': resolve('./public/BCGovLogo/gov_bc_logo_vert_fr.png'),
    'BCGovLogoLgEn': resolve('./public/BCGovLogo/gov_bc_logo_horiz_en.png'),
    'BCGovLogoLgFr': resolve('./public/BCGovLogo/gov_bc_logo_horiz_fr.png'),
    '#base': resolve('./')
  },

  compatibilityDate: '2025-07-10',

  imports: {
    dirs: ['interfaces', 'types', 'enums']
  },

  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],

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
  },

  ui: {
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'brandDark',
        'brandLight',
        'lineDark',
        'lineLight',
        'lineSpecial',
        'neutral',
        'neutralDark',
        'neutralLight',
        'shadeCaution',
        'shadeLight',
        'shadeNew',
        'shadePrimary',
        'shadeSecondary',
        'shadeSpecial',
        'shadeWarning'
      ]
    }
  },

  icon: {
    clientBundle: {
      icons: [
        'mdi:arrow-left',
        'mdi:arrow-right',
        'mdi:info-outline',
        'mdi:information',
        'mdi:web',
        'mdi:check',
        'mdi:chevron-double-left',
        'mdi:chevron-double-right',
        'mdi:chevron-left',
        'mdi:chevron-right',
        'mdi:menu-down',
        'mdi:menu-left',
        'mdi:menu-right',
        'mdi:menu-up',
        'mdi:close',
        'mdi:dots-horizontal',
        'mdi:open-in-new',
        'mdi:file',
        'mdi:folder',
        'mdi:folder-open',
        'mdi:loading',
        'mdi:minus',
        'mdi:plus',
        'mdi:magnify',
        'mdi:upload',
        'mdi:caret-down',
        'mdi:menu',
        'mdi:file-document-outline',
        'mdi:home',
        'mdi:web'
      ]
    }
  },

  runtimeConfig: {
    public: {
      // Should in alphabetical order
      appName: process.env.npm_package_name || '',
      version: `Connect Base Layer v${process.env.npm_package_version || ''}`,
      baseUrl: '',
      registryHomeUrl: '',
      ldClientId: '',
      statusApiUrl: '',
      statusApiVersion: ''
    }
  }
})
