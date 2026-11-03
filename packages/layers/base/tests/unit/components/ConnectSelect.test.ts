import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectSelect } from '#components'

const MockUSelect = {
  template: '<button :id="$attrs.id" />'
}

describe('ConnectSelect Component', () => {
  test('uses text-base by default and preserves floating, focus, and error styles', async () => {
    const wrapper = await mountSuspended(ConnectSelect, {
      props: {
        id: 'test-select',
        label: 'Test Label'
      },
      global: {
        stubs: {
          USelect: MockUSelect
        }
      }
    })

    const label = wrapper.find('.relative.group > span')

    expect(label.classes()).toContain('text-base')
    expect(label.classes()).toContain('group-focus-within:text-xs')
    expect(label.classes()).toContain('group-has-[button[data-state=open]]:text-xs')
    expect(label.classes()).toContain('group-has-[button:not([data-placeholder])]:text-xs')
    expect(label.classes()).toContain('group-has-[button[aria-invalid=true]]:text-error')
    expect(label.classes()).toContain('group-focus-within:text-primary')
  })
})
