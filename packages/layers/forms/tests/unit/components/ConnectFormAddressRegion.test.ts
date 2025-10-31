/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectFormAddressRegion, ConnectFloatingLabel, USelect, ConnectInput } from '#components'

describe('ConnectFormAddressRegion.vue', () => {
  const mountComponent = (props = {}) => {
    return mountSuspended(ConnectFormAddressRegion, {
      props: {
        modelValue: '',
        parentId: 'test',
        schemaPrefix: 'test',
        ...props
      }
    })
  }

  describe('when country is "CA"', () => {
    it('renders a USelect dropdown and not a text input', async () => {
      const wrapper = await mountComponent({ country: 'CA' })
      expect(wrapper.findComponent(USelect as any).exists()).toBe(true)
      expect(wrapper.findComponent(ConnectInput as any).exists()).toBe(false)
    })

    it('provides the correct list of Canadian provinces to the USelect', async () => {
      const wrapper = await mountComponent({ country: 'CA' })
      const uSelect = wrapper.findComponent(USelect as any)
      expect(uSelect.props('items')).toEqual(countrySubdivisions.ca)
    })

    it('sets the correct ARIA attributes for a required province', async () => {
      const wrapper = await mountComponent({ country: 'CA', variant: 'delivery' })
      const floatingLabel = wrapper.findComponent(ConnectFloatingLabel as any)
      expect(floatingLabel.exists()).toBe(true)
      expect(floatingLabel.props('label')).toBe('Province')
      const buttonEl = wrapper.find('[data-testid="test-input-region"]')
      expect(buttonEl.attributes('aria-labelledby')).toBe(floatingLabel.props('id'))
      expect(buttonEl.attributes('aria-required')).toBe('true')
    })
  })

  describe('when country is "US"', () => {
    it('renders a USelect dropdown', async () => {
      const wrapper = await mountComponent({ country: 'US' })
      expect(wrapper.findComponent(USelect as any).exists()).toBe(true)
    })

    it('provides the correct list of US states to the USelect', async () => {
      const wrapper = await mountComponent({ country: 'US' })
      const uSelect = wrapper.findComponent(USelect as any)
      expect(uSelect.props('items')).toEqual(countrySubdivisions.us)
    })

    it('sets the correct ARIA attributes for a required state', async () => {
      const wrapper = await mountComponent({ country: 'US', variant: 'delivery' })
      const floatingLabel = wrapper.findComponent(ConnectFloatingLabel as any)
      expect(floatingLabel.exists()).toBe(true)
      expect(floatingLabel.props('label')).toBe('State')
      const buttonEl = wrapper.find('[data-testid="test-input-region"]')
      expect(buttonEl.attributes('aria-labelledby')).toBe(floatingLabel.props('id'))
      expect(buttonEl.attributes('aria-required')).toBe('true')
    })
  })

  describe('when country is not "CA" or "US"', () => {
    it('renders a ConnectInput text field and not a dropdown', async () => {
      const wrapper = await mountComponent({ country: 'FR' })
      expect(wrapper.findComponent(ConnectInput as any).exists()).toBe(true)
      expect(wrapper.findComponent(USelect as any).exists()).toBe(false)
    })

    it('passes the disabled and maxlength props to the ConnectInput', async () => {
      const wrapper = await mountComponent({ country: 'FR', disabled: true, maxlength: '50' })

      const label = wrapper.find('[for="test-input-region"]')
      expect(label.text()).toContain('Region (Optional)')

      const input = wrapper.find('[id="test-input-region"]')
      expect(input.attributes('disabled')).toBeDefined()
      expect(input.attributes('maxlength')).toBe('50')
    })
  })
})
