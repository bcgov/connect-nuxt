import { defineNuxtModule, createResolver, installModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  someconfig: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'assets',
    configKey: 'assets'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    console.info('setting up assets module')
    const resolver = createResolver(import.meta.url)

    // _nuxt.options.css.push(resolver.resolve('./runtime/assets/core-main.css'))
    _nuxt.options.css.push(resolver.resolve('./runtime/assets/core-tw.css'))
    _nuxt.options.css.push(resolver.resolve('./runtime/assets/core-layout.css'))
    await installModule('@nuxt/ui')
  }
})
