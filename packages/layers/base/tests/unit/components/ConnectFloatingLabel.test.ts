import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectFloatingLabel } from '#components'

const variants = [
  [
    'input',
    'group-has-[div>input:not(:placeholder-shown)]:text-xs',
    'group-has-[div>input[aria-invalid=true]]:text-error'
  ],
  [
    'textarea',
    'group-has-[div>textarea:not(:placeholder-shown)]:text-xs',
    'group-has-[div>textarea[aria-invalid=true]]:text-error'
  ],
  [
    'select',
    'group-has-[button:not([data-placeholder])]:text-xs',
    'group-has-[button[aria-invalid=true]]:text-error'
  ],
  [
    'selectmenu',
    'group-has-[button[data-placeholder=false]]:text-xs',
    'group-has-[button[aria-invalid=true]]:text-error'
  ]
] as const

describe('ConnectFloatingLabel Component', () => {
  it.each(variants)(
    'uses text-base by default for the %s variant and preserves its state styles',
    async (variant, filledClass, errorClass) => {
      const wrapper = await mountSuspended(ConnectFloatingLabel, {
        props: {
          id: 'test-label',
          label: 'Test Label',
          variant
        }
      })

      const label = wrapper.find('span')

      expect(label.classes()).toContain('text-base')
      expect(label.classes()).toContain('group-focus-within:text-xs')
      expect(label.classes()).toContain(filledClass)
      expect(label.classes()).toContain(errorClass)
      expect(label.classes()).toContain('group-focus-within:text-primary')
    }
  )

  it('uses the text-base default when variant is omitted', async () => {
    const wrapper = await mountSuspended(ConnectFloatingLabel, {
      props: {
        id: 'test-label',
        label: 'Test Label'
      }
    })

    expect(wrapper.find('span').classes()).toContain('text-base')
  })
})
