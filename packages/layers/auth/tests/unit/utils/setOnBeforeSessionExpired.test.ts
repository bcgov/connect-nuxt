import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setOnBeforeSessionExpired } from '../../../app/utils/setOnBeforeSessionExpired'

const mockRoute = { meta: {} }
mockNuxtImport('useRoute', () => () => mockRoute)

describe('setOnBeforeSessionExpired', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mockRoute.meta = {}
  })

  it('should set onBeforeSessionExpired meta and call the callback when executed', async () => {
    const mockCallback = vi.fn().mockResolvedValue('callback-result')

    setOnBeforeSessionExpired(mockCallback)

    // @ts-expect-error - onBeforeSessionExpired does not exist on {}
    expect(mockRoute.meta.onBeforeSessionExpired).toBeInstanceOf(Function)
    // @ts-expect-error - onBeforeSessionExpired does not exist on {}
    const result = (mockRoute.meta.onBeforeSessionExpired as any)()
    expect(result).toBeInstanceOf(Promise)

    await result
    expect(mockCallback).toHaveBeenCalledOnce()
    expect(mockCallback).toHaveReturnedWith(Promise.resolve('callback-result'))
  })
})