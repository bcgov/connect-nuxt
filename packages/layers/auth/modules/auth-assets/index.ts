import { defineNuxtModule, createResolver } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'auth-assets',
    configKey: 'authAssets'
  },
  defaults: {},
  async setup(_options, _nuxt) {
    console.info('Setting up **auth** assets module')
    const resolver = createResolver(import.meta.url)

    _nuxt.options.css.push(resolver.resolve('./runtime/assets/connect-auth-tw.css'))
  }
})
