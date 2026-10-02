/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectHeaderNotifications } from '#components'
import { mockRtc } from '../../setup'

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
    expect(items).toEqual([{ label: 'connect.text.notifications.none' }])
  })

  it('should create correct dropdown items with multiple pending approvals', async () => {
    mockPendingApprovals = 3
    const wrapper = await mountSuspended(ConnectHeaderNotifications)

    const items = (wrapper.vm as any).dropdownItems
    expect(items).toEqual([
      {
        label: 'connect.text.notifications.teamMemberApproval',
        to: `${mockRtc.authWebUrl}account/${currentAccountId}/settings/team-members`
      }
    ])
  })
})
