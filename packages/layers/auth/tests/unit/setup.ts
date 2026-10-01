/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { App } from 'vue'
import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

// Create i18n mock - All translations will return the translation key
const i18n = createI18n({
  legacy: false,
  locale: 'en-CA',
  messages: {
    'en-CA': {},
    'fr-CA': {}
  },
  missing: (_, key) => key
})

// Add to plugins for component tests ($t usage)
config.global.plugins = [i18n]

export const mockTokenParsed: object = {
  firstname: 'John',
  lastname: 'Doe',
  name: 'John Doe',
  username: 'jdoe',
  email: 'john.doe@example.com',
  sub: 'mock-guid',
  loginSource: 'bcsc',
  realm_access: {
    roles: ['user', 'admin']
  }
}

export const mockConnectAuth = {
  login: vi.fn(),
  logout: vi.fn(),
  updateToken: vi.fn(),
  authenticated: true,
  token: 'mock-token',
  tokenParsed: mockTokenParsed
}

export const mockAuthApi = vi.fn() as any
mockAuthApi.raw = vi.fn()

// Default useNuxtApp mock - may still need to overwrite in test file if extra mocks are needed (eg: $authApi)
mockNuxtImport('useNuxtApp', original => () => {
  const orig = typeof original === 'function' ? original() : {}

  // Apply pinia context to app
  // This replaces setActivePinia(createPinia()) in the test files
  const vueApp: App = createApp({})
  const pinia = createPinia()
  vueApp.use(pinia)

  return {
    ...orig,
    $i18n: i18n.global, // add $i18n mock - will return keys instead of translated strings - required when using useNuxtApp().$i18n.t etc
    $connectAuth: mockConnectAuth, // mock keycloak instance
    $authApi: mockAuthApi // mock $authApi plugin
  }
})

// Provide common useRuntimeConfig mock and export to use in tests
// Reactive allows updating the values in test and will be re-evaluated when called
export const mockRtc = reactive({
  appName: 'test-app',
  authWebUrl: 'https://auth.example.com/',
  baseUrl: 'https://app.example.com/',
  ldClientId: 'test-client-id',
  siteminderLogoutUrl: 'https://siteminder.example.com/logout',
  playwright: false
})
mockNuxtImport('useRuntimeConfig', original => () => {
  const orig = typeof original === 'function' ? original() : {}
  return {
    ...orig,
    public: mockRtc
  }
})

mockNuxtImport('useRouter', original => () => {
  const orig = typeof original === 'function' ? original() : {}
  return {
    push: vi.fn().mockResolvedValue(true),
    replace: vi.fn().mockResolvedValue(true),
    back: vi.fn(),
    forward: vi.fn(),
    go: vi.fn(),
    afterEach: vi.fn(),
    beforeEach: vi.fn(),
    beforeResolve: vi.fn(),
    currentRoute: {
      value: { path: '/', fullPath: '/', query: {}, params: {}, meta: {} }
    },
    ...orig
  }
})

// Patch JSDOM EventTarget.addEventListener to accept Node.js AbortSignal.
// Using domEnvironment: 'jsdom' - Libraries use Node's global AbortController
// but JSDOM's addEventListener requires JSDOM's own AbortSignal.
if (typeof window !== 'undefined' && window.EventTarget) {
  const originalAddEventListener = window.EventTarget.prototype.addEventListener

  window.EventTarget.prototype.addEventListener = function addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ) {
    if (typeof options === 'object' && options?.signal != null) {
      const { signal, ...otherOptions } = options
      if (signal.aborted) {
        return
      }

      signal.addEventListener('abort', () => {
        this.removeEventListener(type, callback, otherOptions)
      }, { once: true })

      return originalAddEventListener.call(this, type, callback, otherOptions)
    }
    return originalAddEventListener.call(this, type, callback, options)
  }
}
