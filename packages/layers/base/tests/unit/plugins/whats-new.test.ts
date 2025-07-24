import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import whatsNewPlugin from '../../../app/plugins/whats-new.client'
import { useStorage } from '@vueuse/core'
import isEqual from 'lodash-es/isEqual'

vi.mock('@vueuse/core')
vi.mock('lodash-es/isEqual')

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
  let mockNuxtApp: unknown
  let appMountedCallback: () => Promise<void>
  const mockStorageRef = ref({ viewed: false, items: [] })

  beforeEach(() => {
    vi.clearAllMocks()
    // reset storage state before each test
    // @ts-expect-error - Type '{ id: number; title: string; }' is not assignable to type 'never'
    mockStorageRef.value = { viewed: false, items: [{ id: 1, title: 'Old Item' }] }

    // mock vueuse and lodash
    vi.mocked(useStorage).mockReturnValue(mockStorageRef)
    vi.mocked(isEqual).mockClear()

    mockAppConfig = true

    // mock nuxt app with hook
    mockNuxtApp = {
      hook: vi.fn((event, callback) => {
        if (event === 'app:mounted') {
          appMountedCallback = callback
        }
      })
    }
  })

  test('should do nothing if the feature is disabled in app config', () => {
    mockAppConfig = false // disable whats new
    // run plugin
    whatsNewPlugin.setup(mockNuxtApp, {})
    // hook should not be called
    // @ts-expect-error - 'mockNuxtApp' is of type 'unknown'
    expect(mockNuxtApp.hook).not.toHaveBeenCalled()
  })

  test('should register the app:mounted hook if the feature is enabled', () => {
    // run plugin
    whatsNewPlugin.setup(mockNuxtApp, {})
    // hook should be called
    // @ts-expect-error - 'mockNuxtApp' is of type 'unknown'
    expect(mockNuxtApp.hook).toHaveBeenCalledOnce()
    // @ts-expect-error - 'mockNuxtApp' is of type 'unknown'
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
      whatsNewPlugin.setup(mockNuxtApp, {})
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
      whatsNewPlugin.setup(mockNuxtApp, {})
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
      whatsNewPlugin.setup(mockNuxtApp, {})
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
      whatsNewPlugin.setup(mockNuxtApp, {})
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
      whatsNewPlugin.setup(mockNuxtApp, {})
      await appMountedCallback()

      // assert state has new items
      expect(mockStorageRef.value.items).toEqual(newItems)
      // assert viewed is now false
      expect(mockStorageRef.value.viewed).toBe(false)
    })
  })
})
