import { defineVitestConfig } from '@nuxt/test-utils/config'

const SUPPRESSED_WARNINGS = [
  'No match found for location with path "/"',
  '<Suspense> is an experimental feature',
  'has already been registered in target app.',
]

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    dir: './tests/unit',
    include: ['**/*.test.ts'],
    globals: true,
    setupFiles: ['./tests/unit/setup.ts'],
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom', // 'happy-dom' causing issues with reka-ui portal elements
        overrides: {
          // other Nuxt config you want to pass
        }
      }
    },
    onConsoleLog(log: string) {
      if (SUPPRESSED_WARNINGS.some((msg) => log.includes(msg))) {
        return false
      }
    }
  }
})
