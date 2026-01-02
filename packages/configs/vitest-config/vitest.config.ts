// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    dir: './tests/unit',
    include: ['**/*.test.ts'],
    globals: true,
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom', // 'happy-dom' causing issues with reka-ui portal elements
        overrides: {
          // other Nuxt config you want to pass
        }
      }
    }
  }
})
