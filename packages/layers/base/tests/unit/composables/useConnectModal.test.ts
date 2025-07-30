import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { defineComponent } from 'vue'
import { useConnectModal } from '../../../app/composables/useConnectModal'
import ConnectModal from '../../../app/components/Connect/Modal/index.vue'

const mockModalInstance = {
  open: vi.fn().mockResolvedValue(true),
  close: vi.fn()
}

const mockOverlayCreate = vi.fn(() => mockModalInstance)

mockNuxtImport('useOverlay', () => {
  return () => ({
    create: mockOverlayCreate
  })
})

describe('useConnectModal', () => {
  const TestComponent = defineComponent({
    setup() {
      const { baseModal } = useConnectModal()
      return { baseModal }
    },
    template: '<div></div>'
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useOverlay to create a modal', () => {
    mount(TestComponent) // requried for vue context
    expect(mockOverlayCreate).toHaveBeenCalledTimes(1)
    expect(mockOverlayCreate).toHaveBeenCalledWith(ConnectModal)
  })
})
