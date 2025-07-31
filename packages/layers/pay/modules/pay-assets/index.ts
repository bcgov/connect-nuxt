import { defineNuxtModule, createResolver } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'pay-assets',
    configKey: 'payAssets'
  },
  defaults: {},
  async setup(_options, _nuxt) {
    console.info('Setting up **pay** assets module')
    const resolver = createResolver(import.meta.url)

    _nuxt.options.css.push(resolver.resolve('./runtime/assets/connect-pay-tw.css'))
  }
})
