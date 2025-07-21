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

  compatibilityDate: '2025-07-10'
})
