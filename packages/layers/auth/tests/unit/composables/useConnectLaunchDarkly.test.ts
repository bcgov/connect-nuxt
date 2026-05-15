import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { createClient } from '@launchdarkly/js-client-sdk'
import { nextTick, ref } from 'vue'
import type { LDClient } from '@launchdarkly/js-client-sdk'
import { ConnectLoginSource } from '#auth/app/enums/connect-login-source'
import type { ConnectAuthUser } from '../../../app/interfaces/connect-auth-user'
import type {
  useConnectLaunchDarkly as UseConnectLaunchdarklyType
} from '../../../app/composables/useConnectLaunchDarkly'

vi.mock('@launchdarkly/js-client-sdk')
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    ldClientId: 'test-client-id',
    appName: 'test-app'
  }
}))

const ldFlags: Record<string, string> = {
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

// Track useState refs so they can be reset between tests
const stateMap = new Map<string, ReturnType<typeof ref>>()
mockNuxtImport('useState', () => (key: string, init: () => unknown) => {
  if (!stateMap.has(key)) {
    stateMap.set(key, ref(init()))
  }
  return stateMap.get(key)!
})

describe('useConnectLaunchdarkly', () => {
  let useLd: typeof UseConnectLaunchdarklyType
  let resolveStart: (result: { status: string }) => void
  let mockLdClient: Partial<LDClient> = {}

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()
    stateMap.clear()
    mockIsAuthenticated.value = false
    mockAuthUser.value = {}
    mockCurrentAccount.value = {}

    const mod = await import('../../../app/composables/useConnectLaunchDarkly')
    useLd = mod.useConnectLaunchDarkly

    mockLdClient = {
      start: vi.fn(() => new Promise<{ status: string }>((resolve) => {
        resolveStart = resolve
      })),
      allFlags: vi.fn(() => ({ 'test-flag': 'mock-value' })),
      variation: vi.fn((name, defaultValue) => ldFlags[name] ?? defaultValue),
      waitForInitialization: vi.fn(() => Promise.resolve({ status: 'completed' })),
      close: vi.fn(),
      identify: vi.fn(() => Promise.resolve({ status: 'completed' }))
    } as unknown as LDClient
    vi.mocked(createClient).mockReturnValue(mockLdClient as LDClient)
  })

  describe('Initialization', () => {
    test('should initialize automatically when first used', () => {
      useLd()
      expect(createClient).toHaveBeenCalledOnce()
    })

    test('should set ldInitialized to true on successful initialization', async () => {
      const { ldInitialized, ldFlagSet } = useLd()
      const mockLdClientInstance = vi.mocked(createClient).mock.results[0]!.value
      vi.mocked(mockLdClientInstance.allFlags).mockReturnValue(ldFlags)

      resolveStart({ status: 'completed' })
      await vi.waitFor(() => expect(ldInitialized.value).toBe(true))

      expect(ldFlagSet.value).toEqual(ldFlags)
    })

    test('should only be initialized once', async () => {
      useLd()
      expect(createClient).toHaveBeenCalledOnce()
      useLd()
      expect(createClient).toHaveBeenCalledOnce()
      useLd()
      expect(createClient).toHaveBeenCalledOnce()
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
        loginSource: ConnectLoginSource.IDIR
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
