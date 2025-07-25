import { describe, test, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectInput from './../../../app/components/Connect/Input.vue'

const MockUInput = {
  template: '<div><slot /><label :for="$attrs.for" :class="$attrs.class"><slot name="default" /></label></div>',
  props: ['id', 'modelValue', 'ui']
}

describe('ConnectInput Component', () => {
  test('renders the label and input with correct initial state', async () => {
    const wrapper = await mountSuspended(ConnectInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: ''
      }
    })

    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('label').attributes('for')).toBe('test-input')
  })

  test('updates the model value when the user types', async () => {
    const wrapper = await mountSuspended(ConnectInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: ''
      },
      global: {
        stubs: {
          UInput: MockUInput
        }
      }
    })

    await wrapper.findComponent(MockUInput).vm.$emit('update:modelValue', 'new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })

  test('applies invalid state classes when the invalid prop is true', async () => {
    const wrapper = await mountSuspended(ConnectInput, {
      props: {
        id: 'invalid-input',
        label: 'Invalid Label',
        modelValue: '',
        invalid: true
      },
      global: {
        stubs: {
          UInput: MockUInput
        }
      }
    })

    const uInput = wrapper.findComponent(MockUInput)
    const label = wrapper.find('label')
    expect(label.classes()).toContain('text-error')
    expect(uInput.props('ui').base).toContain('shadow-inputError')
  })

  test('does not apply invalid state classes when the invalid prop is false', async () => {
    const wrapper = await mountSuspended(ConnectInput, {
      props: {
        id: 'valid-input',
        label: 'Valid Label',
        modelValue: '',
        invalid: false
      },
      global: {
        stubs: {
          UInput: MockUInput
        }
      }
    })

    const uInput = wrapper.findComponent(MockUInput)
    const label = wrapper.find('label')

    expect(label.classes()).not.toContain('text-error')
    expect(uInput.props('ui').base).not.toContain('shadow-inputError')
  })

  test('applies the mask when the mask prop is provided', async () => {
    const vMaska = vi.fn()

    await mountSuspended(ConnectInput, {
      props: {
        id: 'masked-input',
        label: 'Masked Label',
        modelValue: '',
        mask: '(###) ###-####'
      },
      global: {
        stubs: {
          UInput: MockUInput
        },
        directives: {
          maska: vMaska
        }
      }
    })
    expect(vMaska).toHaveBeenCalled()
  })

  test('passes down extra attributes to the UInput component', async () => {
    const wrapper = await mountSuspended(ConnectInput, {
      props: {
        id: 'extra-attrs-input',
        label: 'Extra Attrs Label',
        modelValue: ''
      },
      attrs: {
        name: 'email',
        autocomplete: 'email'
      },
      global: {
        stubs: {
          UInput: MockUInput
        }
      }
    })

    const uInput = wrapper.findComponent(MockUInput)
    expect(uInput.attributes('name')).toBe('email')
    expect(uInput.attributes('autocomplete')).toBe('email')
  })
})
