import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectModal, ConnectModalError } from '#components'

const mockOverlayCreate = vi.fn()
mockNuxtImport('useOverlay', () => {
  return () => ({
    create: mockOverlayCreate
  })
})

describe('useConnectModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useOverlay to create both ConnectModal and ConnectModalError', () => {
    useConnectModal()
    expect(mockOverlayCreate).toHaveBeenCalledTimes(2)
    expect(mockOverlayCreate).toHaveBeenCalledWith(ConnectModal)
    expect(mockOverlayCreate).toHaveBeenCalledWith(ConnectModalError)
  })
})
