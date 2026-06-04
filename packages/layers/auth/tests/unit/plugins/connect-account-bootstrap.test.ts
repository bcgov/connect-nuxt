/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import plugin from '../../../app/plugins/connect-account-bootstrap.client'

const runPlugin = (app: unknown) => plugin.setup!(app as any)

const mockIsAuthenticated = ref(false)
mockNuxtImport('useConnectAuth', () => () => ({
  isAuthenticated: mockIsAuthenticated
}))

const mockStore = {
  initAccountStore: vi.fn(),
  syncUserProfile: vi.fn(),
  switchCurrentAccount: vi.fn()
}
mockNuxtImport('useConnectAccountStore', () => () => mockStore)

let middlewareCallback: ((to: any) => void) | null = null
mockNuxtImport('addRouteMiddleware', () => (name: string, callback: (to: any) => void, options: any) => {
  if (name === 'set-account-from-url-param' && options?.global) {
    middlewareCallback = callback
  }
})

describe('Connect Account Bootstrap Plugin', () => {
  let mockNuxtApp: { hook: ReturnType<typeof vi.fn> }
  let authRefreshCallback: () => Promise<void>

  beforeEach(() => {
    vi.clearAllMocks()
    mockIsAuthenticated.value = false
    middlewareCallback = null

    mockNuxtApp = {
      hook: vi.fn((event: string, callback: () => Promise<void>) => {
        if (event === 'connect:auth:refresh') {
          authRefreshCallback = callback
        }
      })
    }
  })

  describe('Plugin Config', () => {
    it('should have correct config', () => {
      expect(plugin._name).toBe('connect-account-bootstrap')
      expect(plugin.order).toBe(-10)
      expect(plugin.dependsOn).toEqual(['connect-auth', 'auth-api'])
    })
  })

  describe('App Mount', () => {
    it('should do nothing if user is unauthenticated', async () => {
      mockIsAuthenticated.value = false

      await runPlugin(mockNuxtApp)

      expect(mockStore.initAccountStore).not.toHaveBeenCalled()
      expect(mockStore.syncUserProfile).not.toHaveBeenCalled()
    })

    it('should call store methods if user is authenticated', async () => {
      mockIsAuthenticated.value = true
      mockStore.initAccountStore.mockResolvedValue(undefined)
      mockStore.syncUserProfile.mockResolvedValue(undefined)

      await runPlugin(mockNuxtApp)

      expect(mockStore.initAccountStore).toHaveBeenCalledOnce()
      expect(mockStore.syncUserProfile).toHaveBeenCalledOnce()
    })
  })

  describe('Custom Event: connect:auth:refresh', () => {
    it('should register nuxt hook', () => {
      runPlugin(mockNuxtApp)

      expect(mockNuxtApp.hook).toHaveBeenCalledWith('connect:auth:refresh', expect.any(Function))
    })

    it('should trigger syncUserProfile if authenticated', async () => {
      runPlugin(mockNuxtApp)
      mockIsAuthenticated.value = true

      await authRefreshCallback()

      expect(mockStore.syncUserProfile).toHaveBeenCalledOnce()
    })

    it('should not trigger syncUserProfile if unauthenticated', async () => {
      runPlugin(mockNuxtApp)
      mockIsAuthenticated.value = false

      await authRefreshCallback()

      expect(mockStore.syncUserProfile).not.toHaveBeenCalled()
    })
  })

  describe('Middleware: set-account-from-url-param', () => {
    it('should register middleware', () => {
      runPlugin(mockNuxtApp)

      expect(middlewareCallback).toBeTypeOf('function')
    })

    it('should trigger switchCurrentAccount if accountId param exists', () => {
      runPlugin(mockNuxtApp)
      const mockRouteTo = { query: { accountid: '425' } }

      middlewareCallback!(mockRouteTo)

      expect(mockStore.switchCurrentAccount).toHaveBeenCalledWith(425)
    })

    it('should not trigger switchCurrentAccount if missing accountId param', () => {
      runPlugin(mockNuxtApp)
      const mockRouteTo = { query: {} }

      middlewareCallback!(mockRouteTo)

      expect(mockStore.switchCurrentAccount).not.toHaveBeenCalled()
    })
  })
})
