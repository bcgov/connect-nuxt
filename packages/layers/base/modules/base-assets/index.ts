import { defineNuxtModule, createResolver, installModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'base-assets',
    configKey: 'baseAssets'
  },
  defaults: {},
  async setup(_options, _nuxt) {
    console.info('Setting up assets module')
    const resolver = createResolver(import.meta.url)

    _nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolver.resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365,
      })
    })

    _nuxt.options.css.push(resolver.resolve('./runtime/assets/connect-base-tw.css'))
    _nuxt.options.css.push(resolver.resolve('./runtime/assets/connect-base-layout.css'))
    await installModule('@nuxt/ui')
  }
})
