import { defineNuxtModule, installModule } from 'nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  someconfig: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'i18n-connect',
    configKey: 'i18n-connect'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup() {
    console.info('Installing i18n module')
    // optionally pass in config options here: https://i18n.nuxtjs.org/docs/guide/install-module
    await installModule('@nuxtjs/i18n')
  }
})
