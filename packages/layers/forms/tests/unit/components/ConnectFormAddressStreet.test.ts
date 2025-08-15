import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import ConnectFormAddressStreet from '../../../app/components/Connect/Form/Address/Street.vue'
import ConnectFormInput from '../../../app/components/Connect/Form/Input.vue'
import type { ConnectAddress } from '../../../../base/app/interfaces/connect-address'

const mockCanadaPostAddress = ref<Partial<ConnectAddress> | null>(null)
const mockEnableAddressComplete = vi.fn()

vi.mock('../../../app/composables/useCanadaPost', () => ({
  useCanadaPost: () => ({
    address: mockCanadaPostAddress,
    enableAddressComplete: mockEnableAddressComplete
  })
}))

describe('ConnectFormAddressStreet.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCanadaPostAddress.value = null
  })

  const mountComponent = (props = {}) => {
    return mountSuspended(ConnectFormAddressStreet, {
      props: {
        parentId: 'test',
        schemaPrefix: 'shipping',
        country: 'CA',
        ...props
      }
    })
  }

  describe('Help Text Logic', () => {
    it("renders 'cannot be a PO box' help text", async () => {
      const wrapper = await mountComponent({ helpText: 'no-po' })
      expect(wrapper.text()).toContain('Address cannot be a PO Box.')
    })

    it("renders 'can be a PO box' help text", async () => {
      const wrapper = await mountComponent({ helpText: 'allow-po' })
      expect(wrapper.text()).toContain('Street address, PO box, rural route, or general delivery address.')
    })
  })

  describe('Address Autocomplete Trigger', () => {
    it('calls enableAddressComplete on click when conditions are met', async () => {
      const wrapper = await mountComponent({ parentId: 'billing' })
      const formInput = wrapper.findComponent(ConnectFormInput)

      await formInput.trigger('click')

      expect(mockEnableAddressComplete).toHaveBeenCalledOnce()
      expect(mockEnableAddressComplete).toHaveBeenCalledWith('billing-input-street', 'CA', false)
    })

    it('calls enableAddressComplete only once on keypress', async () => {
      const wrapper = await mountComponent({ parentId: 'billing' })
      const formInput = wrapper.findComponent(ConnectFormInput)

      await formInput.trigger('keypress')
      await formInput.trigger('keypress')

      expect(mockEnableAddressComplete).toHaveBeenCalledOnce()
    })

    it('does NOT call enableAddressComplete if the country prop is missing', async () => {
      const wrapper = await mountComponent({ country: undefined })
      const formInput = wrapper.findComponent(ConnectFormInput)

      await formInput.trigger('click')

      expect(mockEnableAddressComplete).not.toHaveBeenCalled()
    })

    it('does NOT call enableAddressComplete if disableAddressComplete is true', async () => {
      const wrapper = await mountComponent({ disableAddressComplete: true })
      const formInput = wrapper.findComponent(ConnectFormInput)

      await formInput.trigger('click')

      expect(mockEnableAddressComplete).not.toHaveBeenCalled()
    })
  })

  describe('Event Emitting', () => {
    it("emits 'addressComplete' event when the composable's address changes", async () => {
      const wrapper = await mountComponent()
      const newAddress = { street: '123 Main St', city: 'Vancouver' }

      mockCanadaPostAddress.value = newAddress
      await wrapper.vm.$nextTick()

      const emitted = wrapper.emitted('addressComplete')
      expect(emitted).toHaveLength(1)
      expect(emitted![0]).toEqual([newAddress])
    })
  })
})
