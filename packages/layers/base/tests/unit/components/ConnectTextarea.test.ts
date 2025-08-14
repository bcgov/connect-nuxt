import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectTextarea from '../../../app/components/Connect/Textarea.vue'

const MockUTextarea = {
  template: '<div><slot /><label :for="$attrs.for" :class="$attrs.class"><slot name="default" /></label></div>',
  props: ['id', 'modelValue', 'ui']
}

describe('ConnectTextarea Component', () => {
  test('renders the label and textarea with correct initial state', async () => {
    const wrapper = await mountSuspended(ConnectTextarea, {
      props: {
        id: 'test-textarea',
        label: 'Test Label',
        modelValue: ''
      },
      global: {
        stubs: {
          UTextarea: MockUTextarea
        }
      }
    })

    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('label').attributes('for')).toBe('test-textarea')
  })

  test('updates the model value when the user types', async () => {
    const wrapper = await mountSuspended(ConnectTextarea, {
      props: {
        id: 'test-textarea',
        label: 'Test Label',
        modelValue: ''
      },
      global: {
        stubs: {
          UTextarea: MockUTextarea
        }
      }
    })

    await wrapper.findComponent(MockUTextarea).vm.$emit('update:modelValue', 'new value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value'])
  })

  test('passes down extra attributes to the UTextarea component', async () => {
    const wrapper = await mountSuspended(ConnectTextarea, {
      props: {
        id: 'extra-attrs-textarea',
        label: 'Extra Attrs Label',
        modelValue: ''
      },
      attrs: {
        name: 'description',
        rows: '5'
      },
      global: {
        stubs: {
          UTextarea: MockUTextarea
        }
      }
    })

    const uTextarea = wrapper.findComponent(MockUTextarea)
    expect(uTextarea.attributes('name')).toBe('description')
    expect(uTextarea.attributes('rows')).toBe('5')
  })
})
