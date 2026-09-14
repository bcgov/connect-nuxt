import { createResolver } from 'nuxt/kit'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

const { resolve } = createResolver(import.meta.url)

const deviceNames = [
  'Desktop Chrome',
  ...(process.env.CI ? [
    'Desktop Firefox',
    'Desktop Edge',
    'Desktop Safari',
    'iPad (gen 11) landscape',
    'Blackberry PlayBook landscape',
    'Nexus 10 landscape',
    'iPhone 15 Pro',
    'Pixel 7',
    'iPhone 6'
  ] : [])
]

export default defineConfig<ConfigOptions>({
  globalSetup: './tests/e2e/setup',
  testDir: './tests/e2e',
  testMatch: '*.spec.ts',
  workers: process.env.CI ? 2 : 4,
  // retry in CI: WebKit-backed device projects (e.g. iPad) can take longer to
  // load than the default test timeout when the 2 CI workers are contended
  // across this 10-project device matrix — a retry clears those blips.
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,
  // web-first assertions (toBeVisible/toHaveText/...) default to a 5s poll,
  // which is tight for a CPU-constrained CI runner rendering client-side
  // under load — this is what was actually failing fast (not a goto hang)
  // in several of the retried-but-still-failing runs.
  expect: { timeout: 10_000 },
  reporter: [['list'], [process.env.CI ? 'blob' : 'html']],
  use: {
    nuxt: {
      rootDir: resolve('./'),
      runner: 'vitest',
      host: process.env.NUXT_PUBLIC_BASE_URL
    },
    actionTimeout: 15000,
    baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'on-first-failure',
    // do not open browser
    headless: true
  },
  projects: deviceNames.map(name => ({ name, use: devices[name] })),
  webServer: {
    command: 'pnpm build:test',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      playwright: 'true',
      playwrightFetchTestAccount: 'true'
    }
  }
})
