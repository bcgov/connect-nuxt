import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { createClient } from '@launchdarkly/js-client-sdk'
import { ref } from 'vue'
import type { LDClient } from '@launchdarkly/js-client-sdk'
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

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()
    stateMap.clear()

    const mod = await import('../../../app/composables/useConnectLaunchDarkly')
    useLd = mod.useConnectLaunchDarkly

    const mockLdClient = {
      start: vi.fn(() => new Promise<{ status: string }>((resolve) => {
        resolveStart = resolve
      })),
      allFlags: vi.fn(() => ({ 'test-flag': 'mock-value' })),
      variation: vi.fn((name, defaultValue) => ldFlags[name] ?? defaultValue),
      waitForInitialization: vi.fn(() => Promise.resolve({ status: 'complete' })),
      close: vi.fn()
    } as unknown as LDClient
    vi.mocked(createClient).mockReturnValue(mockLdClient)
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

      resolveStart({ status: 'complete' })
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
})
