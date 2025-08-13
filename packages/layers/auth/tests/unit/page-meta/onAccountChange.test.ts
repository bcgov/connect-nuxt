import { describe, it, expect } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockRoute = {
  meta: {
    onAccountChange: (oldAccount, _newAccount) => oldAccount.accountType === 'basic'
  }
}
mockNuxtImport('useRoute', () => () => mockRoute)

describe('onAccountChange Route Meta', () => {
  const basicAccount = { id: 1, accountType: 'basic' }
  const premiumAccount = { id: 2, accountType: 'premium' }

  it('should allow a switch if the old account is a basic type', () => {
    const canSwitch = mockRoute.meta.onAccountChange(basicAccount, premiumAccount)
    expect(canSwitch).toBe(true)
  })

  it('should NOT allow a switch if the old account is not a basic type', () => {
    const canSwitch = mockRoute.meta.onAccountChange(premiumAccount, basicAccount)
    expect(canSwitch).toBe(false)
  })
})
