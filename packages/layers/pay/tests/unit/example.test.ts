import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HelloWorldPay from '../../app/components/HelloWorld/Pay.vue'

// example test from the person-roles (testing component from there)
describe('Example Test', () => {
  test('Renders HelloWorld component', async () => {
    const wrapper = await mountSuspended(HelloWorldPay, {})

    expect(wrapper.text()).toContain('Pay - Should be bcGovColor-activeBlue')
  })
})
