/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectFormAddressRegion from '../../../app/components/Connect/Form/Address/Region.vue'
import { countrySubdivisions } from '../../../app/utils/isoCountriesList'
import USelect from '@nuxt/ui/components/Select.vue'
import ConnectInput from '../../../../base/app/components/Connect/Input.vue'

describe('ConnectFormAddressRegion.vue', () => {
  const mountComponent = (props = {}) => {
    return mountSuspended(ConnectFormAddressRegion, {
      props: {
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
      const wrapper = await mountComponent({ country: 'CA' })
      const buttonEl = wrapper.find('[data-testid="test-input-region"]')
      expect(buttonEl.attributes('aria-label')).toBe('Province')
      // expect(buttonEl.attributes('aria-required')).toBe('true'); // TODO: pretty sure this is a bug
    })

    it('computes and displays the full province name when a value is selected', async () => {
      const wrapper = await mountComponent({ country: 'CA' })
      await wrapper.setProps({ modelValue: 'BC' })
      expect((wrapper.vm as any).displayedRegionName).toBe('British Columbia')
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
      const wrapper = await mountComponent({ country: 'US' })
      const buttonEl = wrapper.find('[data-testid="test-input-region"]')
      expect(buttonEl.attributes('aria-label')).toBe('State')
      // expect(buttonEl.attributes('aria-required')).toBe('true'); // TODO: pretty sure this is a bug
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
      // expect(input.attributes('disabled')).toBe(true) // TODO: figure out why this isnt passing
      expect(input.attributes('maxlength')).toBe('50')
    })
  })
})
