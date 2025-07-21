import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HelloWorldAuth from '../../app/components/HelloWorld/Auth.vue'

// example test from the person-roles (testing component from there)
describe('Example Test', () => {
  test('Renders HelloWorld component', async () => {
    const wrapper = await mountSuspended(HelloWorldAuth, {})

    expect(wrapper.text()).toContain('Auth - should be red-700')
  })
})
