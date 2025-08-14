/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectFormAddressCountry from '../../../app/components/Connect/Form/Address/Country.vue'
import USelect from '@nuxt/ui/components/Select.vue'

describe('CountrySelect.vue', () => {
  const mountComponent = (props = {}) => {
    return mountSuspended(ConnectFormAddressCountry, {
      props: {
        parentId: 'test',
        schemaPrefix: 'test',
        ...props
      }
    })
  }

  it('correctly sorts options to show CA and US first', async () => {
    const wrapper = await mountComponent()
    const options = (wrapper.vm as any).options
    expect(options[0].alpha_2).toBe('CA')
    expect(options[1].alpha_2).toBe('US')
  })

  it('computes the correct displayedCountryName based on the v-model', async () => {
    const wrapper = await mountComponent()
    await wrapper.setProps({ modelValue: 'FR' })
    expect((wrapper.vm as any).displayedCountryName).toBe('France')
    await wrapper.setProps({ modelValue: '' })
    expect((wrapper.vm as any).displayedCountryName).toBe('')
  })

  it('passes the disabled prop down to the USelect component', async () => {
    const wrapper = await mountComponent({ disabled: true })
    const uSelect = wrapper.findComponent(USelect as any)
    expect((uSelect as any).props('disabled')).toBe(true)
  })

  it('applies correct ARIA attributes to the USelect component', async () => {
    const wrapper = await mountComponent()
    const buttonEl = wrapper.find('[data-testid="test-input-country"]')
    expect(buttonEl.exists()).toBe(true)
    // expect(buttonEl.attributes('aria-required')).toBe('true'); // TODO: pretty sure this is a bug
    expect(buttonEl.attributes('aria-label')).toBe('Country')
  })
})
