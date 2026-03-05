import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import whatsNewPlugin from '../../../app/plugins/whats-new.client'
import { useStorage } from '@vueuse/core'
import { isEqual } from 'es-toolkit'

vi.mock('@vueuse/core')
vi.mock('es-toolkit')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runPlugin = (app: unknown) => whatsNewPlugin.setup!(app as any)

let mockAppConfig = true
mockNuxtImport('useAppConfig', () => () => ({
  connect: { header: { whatsNew: mockAppConfig } }
}))
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    statusApiUrl: 'http://test.api',
    statusApiVersion: '/v1',
    appName: 'test-app'
  }
}))

// Mock $fetch
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

describe("What's New Plugin", () => {
  let mockNuxtApp: { hook: ReturnType<typeof vi.fn> }
  let appMountedCallback: () => Promise<void>
  const mockStorageRef = ref({ viewed: false, items: [] })

  beforeEach(() => {
    vi.clearAllMocks()
    // reset storage state before each test
    // @ts-expect-error - Type '{ id: number; title: string; }' is not assignable to type 'never'
    mockStorageRef.value = { viewed: false, items: [{ id: 1, title: 'Old Item' }] }

    // mock vueuse and es toolkit
    vi.mocked(useStorage).mockReturnValue(mockStorageRef)
    vi.mocked(isEqual).mockClear()

    mockAppConfig = true

    // mock nuxt app with hook
    mockNuxtApp = {
      hook: vi.fn((event: string, callback: () => Promise<void>) => {
        if (event === 'app:mounted') {
          appMountedCallback = callback
        }
      })
    }
  })

  test('should do nothing if the feature is disabled in app config', () => {
    mockAppConfig = false // disable whats new
    // run plugin
    runPlugin(mockNuxtApp)
    // hook should not be called
    expect(mockNuxtApp.hook).not.toHaveBeenCalled()
  })

  test('should register the app:mounted hook if the feature is enabled', () => {
    // run plugin
    runPlugin(mockNuxtApp)
    // hook should be called
    expect(mockNuxtApp.hook).toHaveBeenCalledOnce()
    expect(mockNuxtApp.hook).toHaveBeenCalledWith('app:mounted', expect.any(Function))
  })

  describe('on app:mounted', () => {
    test('should update storage if fetched items are different', async () => {
      // return new items in fetch
      const newItems = [{ id: 2, title: 'New Item' }]
      mockFetch.mockResolvedValue(newItems)
      // set items to be different
      vi.mocked(isEqual).mockReturnValue(false)

      // run plugin
      runPlugin(mockNuxtApp)
      await appMountedCallback()

      // assert fetch was triggered
      expect(mockFetch).toHaveBeenCalledOnce()
      // assert useStorage values are correct
      expect(mockStorageRef.value.items).toEqual(newItems)
      expect(mockStorageRef.value.viewed).toBe(false)
    })

    test('should NOT update storage if fetched items are the same', async () => {
      // mock fetched items
      const oldItems = mockStorageRef.value.items
      mockFetch.mockResolvedValue(oldItems)
      // set items to equal the same as old
      vi.mocked(isEqual).mockReturnValue(true)

      // run plugin
      runPlugin(mockNuxtApp)
      await appMountedCallback()

      // assert fetch was triggered
      expect(mockFetch).toHaveBeenCalledOnce()
      // assert state hasnt been updated
      expect(mockStorageRef.value.items).toEqual(oldItems)
    })

    test('should handle API errors silently and not change the state', async () => {
      // mock fetch error
      const oldItems = mockStorageRef.value.items
      mockFetch.mockRejectedValue(new Error('API is down'))

      // run plugin
      runPlugin(mockNuxtApp)
      await appMountedCallback()

      // assert fetch was called
      expect(mockFetch).toHaveBeenCalledOnce()
      // assert state hasnt been updated
      expect(mockStorageRef.value.items).toEqual(oldItems)
    })

    test('should NOT update storage if the API returns an empty array', async () => {
      // mock fetch to return empty array
      const oldItems = mockStorageRef.value.items
      mockFetch.mockResolvedValue([])
      vi.mocked(isEqual).mockReturnValue(false)

      // run plugin
      runPlugin(mockNuxtApp)
      await appMountedCallback()

      // assert fetch was called
      expect(mockFetch).toHaveBeenCalledOnce()
      // assert state not updated
      expect(mockStorageRef.value.items).toEqual(oldItems)
    })

    test('should set viewed to false when new items are fetched', async () => {
      // mock fetch to reutn new items
      mockStorageRef.value.viewed = true // initial state is viewed and oldItems
      const newItems = [{ id: 2, title: 'New Item' }]
      mockFetch.mockResolvedValue(newItems)
      vi.mocked(isEqual).mockReturnValue(false)

      // run plugin
      runPlugin(mockNuxtApp)
      await appMountedCallback()

      // assert state has new items
      expect(mockStorageRef.value.items).toEqual(newItems)
      // assert viewed is now false
      expect(mockStorageRef.value.viewed).toBe(false)
    })
  })
})
