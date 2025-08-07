import { defineNuxtModule, createResolver } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'form-assets',
    configKey: 'formAssets'
  },
  defaults: {},
  async setup(_options, _nuxt) {
    console.info('Setting up **form** assets module')
    const resolver = createResolver(import.meta.url)

    _nuxt.options.css.push(resolver.resolve('./runtime/assets/connect-form-tw.css'))
  }
})
