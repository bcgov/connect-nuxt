/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectHeaderNotifications } from '#components'

const authWebUrl = 'auth-web.com/'
mockNuxtImport(useRuntimeConfig, () => () => ({
  public: {
    authWebUrl
  }
}))

const currentAccountId = '1234'
mockNuxtImport('useConnectAccountStore', () => () => ({
  currentAccount: {
    id: currentAccountId
  }
}))

let mockPendingApprovals = 0
mockNuxtImport('useConnectAuthQuery', () => () => ({
  pendingApprovals: () => ({
    data: computed(() => ({ count: mockPendingApprovals }))
  })
}))

describe('ConnectHeaderNotifications.vue', () => {
  it('should create correct dropdown items with 0 pending approvals', async () => {
    mockPendingApprovals = 0
    const wrapper = await mountSuspended(ConnectHeaderNotifications)

    const items = (wrapper.vm as any).dropdownItems
    expect(items).toEqual([{ label: 'No Notifications' }])
  })

  it('should create correct dropdown items with multiple pending approvals', async () => {
    mockPendingApprovals = 3
    const wrapper = await mountSuspended(ConnectHeaderNotifications)

    const items = (wrapper.vm as any).dropdownItems
    expect(items).toEqual([
      {
        label: '3 team members require approval to access this account.',
        to: `${authWebUrl}account/${currentAccountId}/settings/team-members`
      }
    ])
  })
})
