import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { initialize } from 'launchdarkly-js-client-sdk'
import type { LDClient } from 'launchdarkly-js-client-sdk'
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

describe('useConnectLaunchdarkly', () => {
  let useLd: typeof UseConnectLaunchdarklyType
  let onInitializedCallback: () => void

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    const mod = await import('../../../app/composables/useConnectLaunchDarkly')
    useLd = mod.useConnectLaunchDarkly

    const mockLdClient = {
      on: vi.fn((event, callback) => {
        if (event === 'initialized') {
          onInitializedCallback = callback
        }
      }),
      allFlags: vi.fn(() => ({ 'test-flag': 'mock-value' })),
      variation: vi.fn((name, defaultValue) => ldFlags[name] ?? defaultValue),
      waitUntilReady: vi.fn(() => Promise.resolve()),
      close: vi.fn()
    } as unknown as LDClient
    vi.mocked(initialize).mockReturnValue(mockLdClient)
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
})
