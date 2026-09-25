/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectAccountExistingListItem } from '#components'

const { mockNavigateTo } = vi.hoisted(() => ({ mockNavigateTo: vi.fn() }))
mockNuxtImport('navigateTo', () => mockNavigateTo)

const mockAccountStore = { currentAccount: {} as ConnectAccount }
mockNuxtImport('useConnectAccountStore', () => () => mockAccountStore)

const globalStubs = {
  UAvatar: { name: 'UAvatar', props: ['alt'], template: '<span>{{ alt }}</span>' },
  UBadge: { name: 'UBadge', props: ['label'], template: '<span class="badge">{{ label }}</span>' },
  UButton: {
    name: 'UButton',
    props: ['label', 'disabled'],
    template: '<button :disabled="disabled">{{ label }}</button>'
  }
}

const baseAccount = {
  id: 1,
  accountType: AccountType.PREMIUM,
  accountStatus: AccountStatus.ACTIVE,
  label: 'Test Account',
  type: UserSettingsType.ACCOUNT,
  urlpath: '/account/1/settings',
  urlorigin: 'https://auth.example.com'
} as ConnectAccount

describe('ConnectAccountExistingListItem', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    mockAccountStore.currentAccount = {} as ConnectAccount
  })

  async function mount(account: ConnectAccount) {
    return await mountSuspended(ConnectAccountExistingListItem, {
      props: { account },
      global: {
        stubs: globalStubs,
        config: { globalProperties: { $t: (key: string) => key } as any }
      }
    })
  }

  it('renders the address line when present', async () => {
    const wrapper = await mount({
      ...baseAccount,
      address: {
        street: '123 Main St',
        streetAdditional: '',
        city: 'Victoria',
        region: 'BC',
        postalCode: 'V1V1V1',
        country: 'CA'
      }
    })
    expect(wrapper.text()).toContain('123 Main St, Victoria, BC, V1V1V1, CA')
  })

  it('renders a payment method badge when present', async () => {
    const wrapper = await mount({ ...baseAccount, paymentMethod: 'PAD' })
    expect(wrapper.text()).toContain('connect.badge.paymentMethod.PAD')
  })

  it('renders the non-sufficient-funds badge for an NSF-suspended account with no overdue flag', async () => {
    const wrapper = await mount({ ...baseAccount, accountStatus: AccountStatus.NSF_SUSPENDED })
    expect(wrapper.text()).toContain('connect.badge.nonSufficientFunds')
    expect(wrapper.text()).not.toContain('connect.badge.statementOverdue')
  })

  it('renders the statement-overdue badge when hasOverdueInvoices is set', async () => {
    const wrapper = await mount({
      ...baseAccount,
      accountStatus: AccountStatus.NSF_SUSPENDED,
      hasOverdueInvoices: '2026-01-01T00:00:00Z'
    })
    expect(wrapper.text()).toContain('connect.badge.statementOverdue')
    expect(wrapper.text()).not.toContain('connect.badge.nonSufficientFunds')
  })

  it('disables the button for a non-active, non-NSF status', async () => {
    const wrapper = await mount({ ...baseAccount, accountStatus: AccountStatus.SUSPENDED })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('connect.badge.inactiveAccount')
  })

  it('keeps the button enabled for an NSF-suspended account', async () => {
    const wrapper = await mount({ ...baseAccount, accountStatus: AccountStatus.NSF_SUSPENDED })
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('emits select for an active account', async () => {
    const wrapper = await mount(baseAccount)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('select')).toEqual([[baseAccount.id]])
    expect(mockNavigateTo).not.toHaveBeenCalled()
  })

  it('redirects to the account info page for an NSF-suspended account instead of emitting select', async () => {
    const nsfAccount = { ...baseAccount, accountStatus: AccountStatus.NSF_SUSPENDED }
    const wrapper = await mount(nsfAccount)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(mockNavigateTo).toHaveBeenCalledWith('https://auth.example.com/account/1/settings', { external: true })
    expect(mockAccountStore.currentAccount).toEqual(nsfAccount)
  })
})
