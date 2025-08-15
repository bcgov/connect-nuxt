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
