import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HelloWorld from '../../app/components/HelloWorld/Forms.vue'

describe('Example Test', () => {
  test('Renders HelloWorld component', async () => {
    const wrapper = await mountSuspended(HelloWorld, {})

    expect(wrapper.text()).toContain('Forms - should be green-900')
  })
})
