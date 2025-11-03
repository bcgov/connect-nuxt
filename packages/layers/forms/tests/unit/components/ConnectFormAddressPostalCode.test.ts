import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectFormAddressPostalCode, ConnectFormInput } from '#components'

describe('ConnectFormAddressPostalCode.vue', () => {
  const mountComponent = (props = {}) => {
    return mountSuspended(ConnectFormAddressPostalCode, {
      props: {
        modelValue: '',
        parentId: 'test',
        schemaPrefix: 'test',
        ...props
      }
    })
  }

  it('renders the default label and no mask when country is not specified', async () => {
    const wrapper = await mountComponent()
    const formInput = wrapper.findComponent(ConnectFormInput)

    expect(formInput.exists()).toBe(true)
    expect(formInput.props('label')).toBe('Postal Code')
    expect(formInput.props('mask')).toBeUndefined()
  })

  it('displays the "ZIP Code" label and US mask when country is "US"', async () => {
    const wrapper = await mountComponent({ country: 'US' })
    const formInput = wrapper.findComponent(ConnectFormInput)

    expect(formInput.props('label')).toBe('Zip Code')
    expect(formInput.props('mask')).toBe('#####-####')
  })

  it('displays the "Postal Code" label and CA mask when country is "CA"', async () => {
    const wrapper = await mountComponent({ country: 'CA' })
    const formInput = wrapper.findComponent(ConnectFormInput)

    expect(formInput.props('label')).toBe('Postal Code')
    expect(formInput.props('mask')).toBe('@#@ #@#')
  })

  it('converts the model value to uppercase on set', async () => {
    const wrapper = await mountComponent()
    const formInput = wrapper.findComponent(ConnectFormInput)

    formInput.setValue('a1b 2c3')

    const emittedEvent = wrapper.emitted('update:modelValue')

    expect(emittedEvent).toHaveLength(1)
    expect(emittedEvent![0]).toEqual(['A1B 2C3'])
  })

  it('passes the disabled prop down to the ConnectFormInput component', async () => {
    const wrapper = await mountComponent({ disabled: true })
    const formInput = wrapper.findComponent(ConnectFormInput)

    expect(formInput.props('disabled')).toBe(true)
  })

  it('constructs and passes correct name, id, and test-id props', async () => {
    const wrapper = await mountComponent({
      parentId: 'shipping-address',
      schemaPrefix: 'shipping',
      required: true
    })
    const formInput = wrapper.findComponent(ConnectFormInput)

    expect(formInput.props('name')).toBe('shipping.postalCode')
    expect(formInput.props('inputId')).toBe('shipping-address-input-postalCode')
    expect(formInput.attributes('data-testid')).toBe('shipping-address-field-postalCode')
    expect(formInput.props('required')).toBe(true)
  })
})
