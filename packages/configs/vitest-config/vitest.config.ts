import { defineVitestConfig } from '@nuxt/test-utils/config'

const SUPPRESSED_WARNINGS = [
  'No match found for location with path "/"',
  '<Suspense> is an experimental feature',
  // suppress warnings from i18n package
  'Component "i18n-t"',
  'Component "I18nT"',
  'Component "i18n-n"',
  'Component "I18nN"',
  'Component "i18n-d"',
  'Component "I18nD"',
  'Directive "t"'
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
