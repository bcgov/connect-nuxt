import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { initialize } from 'launchdarkly-js-client-sdk'
import { nextTick, ref } from 'vue'
import type { LDClient } from 'launchdarkly-js-client-sdk'
import type { ConnectAuthUser } from '../../../app/interfaces/connect-auth-user'
import type { ConnectAccount } from '../../../app/interfaces/connect-account'
import type {
  useConnectLaunchDarkly as UseConnectLaunchdarklyType
} from '../../../app/composables/useConnectLaunchDarkly'

vi.mock('launchdarkly-js-client-sdk')
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    ldClientId: 'test-client-id',
    appName: 'test-app'
  }
}))

const ldFlags = {
  'test-flag': 'TEST,PASS'
}

const mockIsAuthenticated = ref(false)
const mockAuthUser = ref<Partial<ConnectAuthUser>>({})
mockNuxtImport('useConnectAuth', () => () => ({
  authUser: mockAuthUser,
  isAuthenticated: mockIsAuthenticated
}))

const mockCurrentAccount = ref({})
const mockAccountStore = {
  currentAccount: mockCurrentAccount
}
mockNuxtImport('useConnectAccountStore', () => () => mockAccountStore)

describe('useConnectLaunchdarkly', () => {
  let useLd: typeof UseConnectLaunchdarklyType
  let onInitializedCallback: () => void
  let mockLdClient: Partial<LDClient> = {}

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    const mod = await import('../../../app/composables/useConnectLaunchDarkly')
    useLd = mod.useConnectLaunchDarkly

    mockLdClient = {
      on: vi.fn((event, callback) => {
        if (event === 'initialized') {
          onInitializedCallback = callback
        }
      }),
      allFlags: vi.fn(() => ({ 'test-flag': 'mock-value' })),
      variation: vi.fn((name, defaultValue) => ldFlags[name] ?? defaultValue),
      waitUntilReady: vi.fn(() => Promise.resolve()),
      close: vi.fn(),
      identify: vi.fn(() => Promise.resolve())
    } as unknown as LDClient
    vi.mocked(initialize).mockReturnValue(mockLdClient as LDClient)
  })

  describe('Initialization', () => {
    test('should initialize automatically when first used', () => {
      useLd()
      expect(initialize).toHaveBeenCalledOnce()
    })

    test('should set ldInitialized to true on successful initialization', async () => {
      const { ldInitialized, ldFlagSet } = useLd()
      const mockLdClientInstance = vi.mocked(initialize).mock.results[0].value
      vi.mocked(mockLdClientInstance.allFlags).mockReturnValue(ldFlags)

      onInitializedCallback()

      expect(ldInitialized.value).toBe(true)
      expect(ldFlagSet.value).toEqual(ldFlags)
    })

    test('should only be initialized once', async () => {
      useLd()
      expect(initialize).toHaveBeenCalledOnce()
      useLd()
      expect(initialize).toHaveBeenCalledOnce()
      useLd()
      expect(initialize).toHaveBeenCalledOnce()
    })
  })

  describe('context switching', () => {
    test('should call identify with the authenticated user context when authenticated', async () => {
      useLd()
      mockIsAuthenticated.value = true
      mockAuthUser.value = {
        keycloakGuid: 'user-guid',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        roles: ['user'],
        loginSource: 'idir'
      }

      await nextTick()

      expect(mockLdClient.identify).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({ key: 'user-guid' }),
          org: expect.objectContaining({ key: 'user-guid' })
        })
      )
    })

    // TODO: why does the account change not trigger the watcher
    test.skip('should call identify with the correct account context when account changes', async () => {
      mockIsAuthenticated.value = true
      mockAuthUser.value = { keycloakGuid: 'user-guid' }
      mockCurrentAccount.value = { id: 456 }

      useLd()
      await nextTick()

      expect(mockLdClient.identify).not.toHaveBeenCalled() 

      mockCurrentAccount.value = { id: 123 }
      await nextTick()

      expect(mockLdClient.identify).toHaveBeenCalledTimes(1)
      expect(mockLdClient.identify).toHaveBeenCalledWith(
        expect.objectContaining({
          org: expect.objectContaining({ key: 123 })
        })
      )
 
      mockIsAuthenticated.value = false
      await nextTick()

      expect(mockLdClient.identify).toHaveBeenCalledTimes(2)
      expect(mockLdClient.identify).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({ key: 'anonymous' })
        })
      )
    })
  })
})
