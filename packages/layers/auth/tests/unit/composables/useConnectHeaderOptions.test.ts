import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref, nextTick } from 'vue'
import { useConnectHeaderOptions } from '../../../app/composables/useConnectHeaderOptions'

const mockLogin = vi.fn()
const mockLogout = vi.fn()
const mockAuthUser = ref({
  loginSource: 'BCSC',
  roles: ['user']
})
const mockIsAuthenticated = ref(true)

mockNuxtImport('useConnectAuth', () => () => ({
  login: mockLogin,
  logout: mockLogout,
  isAuthenticated: mockIsAuthenticated,
  authUser: mockAuthUser
}))

mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    authWebUrl: 'https://auth.example.com/',
    baseUrl: 'https://app.example.com/'
  }
}))

const mockCurrentAccount = ref({
  id: 'account1',
  label: 'Account 1',
  accountType: 'PREMIUM',
  accountStatus: ''
})
const mockUserAccounts = ref([
  { id: 'account1', label: 'Account 1' },
  { id: 'account2', label: 'Account 2' }
])
const mockPendingApprovalCount = ref(0)
const mockSwitchCurrentAccount = vi.fn()

mockNuxtImport('useConnectAccountStore', () => () => (
  {
    get currentAccount() { return mockCurrentAccount.value },
    get userAccounts() { return mockUserAccounts.value },
    get pendingApprovalCount() { return mockPendingApprovalCount.value },
    switchCurrentAccount: mockSwitchCurrentAccount
  }
))

mockNuxtImport('useLocalePath', () => () => (path: string) => `/en-CA${path}`)

const mockWhatsNew = ref({ viewed: false, items: [{}] })
vi.mock('@vueuse/core', async (importOriginal) => {
  const original = await importOriginal()
  return {
    // @ts-expect-error - cant infer original for object spread
    ...original,
    useStorage: vi.fn(() => mockWhatsNew)
  }
})

const mockRoute = ref({ meta: {} })
mockNuxtImport('useRoute', () => () => mockRoute.value)

const mockSlideoverOpen = vi.fn()
mockNuxtImport('useOverlay', () => () => ({
  create: vi.fn(() => ({ open: mockSlideoverOpen }))
}))

mockNuxtImport('useAppConfig', () => () => ({
  connect: {
    login: { idps: ['bcsc', 'bceid', 'idir'], redirect: '/dashboard' },
    header: { loginMenu: true, whatsNew: true, createAccount: true }
  }
}))

describe('useConnectHeaderOptions', () => {
  let composable: ReturnType<typeof useConnectHeaderOptions>

  beforeEach(() => {
    // Reset all mocks and reactive states
    vi.clearAllMocks()
    mockIsAuthenticated.value = true
    mockAuthUser.value = {
      loginSource: 'BCSC',
      roles: ['user']
    }
    mockCurrentAccount.value = {
      id: 'account1',
      label: 'Account 1',
      accountType: 'PREMIUM',
      accountStatus: ''
    }
    mockUserAccounts.value = [
      { id: 'account1', label: 'Account 1' },
      { id: 'account2', label: 'Account 2' }
    ]
    mockPendingApprovalCount.value = 0
    mockRoute.value = { meta: {} }
    composable = useConnectHeaderOptions()
  })

  describe('createAccountUrl()', () => {
    it('should create account URL as an unauthenticated user', () => {
      mockIsAuthenticated.value = false
      expect(composable.createAccountUrl()).toBe('https://auth.example.com/choose-authentication-method')
    })

    it('should create account URL as an authenticated user', () => {
      mockIsAuthenticated.value = true
      expect(composable.createAccountUrl()).toBe('https://auth.example.com/setup-account')
    })
  })

  describe('basicAccountOptions', () => {
    it('should create basic account options for BCSC user', async () => {
      mockIsAuthenticated.value = true
      mockAuthUser.value = { ...mockAuthUser.value, loginSource: 'BCSC' }
      await nextTick()
      const options = composable.loggedInUserOptions.value[0]
      expect(options).toEqual([
        { slot: 'account', type: 'label' },
        { label: 'Edit Profile', icon: 'i-mdi-account-outline', to: 'https://auth.example.com/userprofile' },
        { label: 'Log out', icon: 'i-mdi-logout-variant', onSelect: expect.any(Function) }
      ])
    })
  })

  describe('accountSettingsOptions', () => {
    const expectedBasicOptions = [
      { label: 'Account Settings', type: 'label' },
      {
        label: 'Account Info',
        icon: 'i-mdi-information-outline',
        to: 'https://auth.example.com/account/account1/settings/account-info'
      },
      {
        label: 'Team Members',
        icon: 'i-mdi-account-group-outline',
        to: 'https://auth.example.com/account/account1/settings/team-members'
      }
    ]

    const expectedPremiumOptions = [
      ...expectedBasicOptions,
      {
        label: 'Transactions',
        icon: 'i-mdi-file-document-outline',
        to: 'https://auth.example.com/account/account1/settings/transactions'
      }
    ]

    it('should create account settings options for basic account', async () => {
      mockCurrentAccount.value = { ...mockCurrentAccount.value, accountType: 'BASIC' }
      await nextTick()
      const options = composable.loggedInUserOptions.value[1]
      expect(options).toEqual(expectedBasicOptions)
    })

    it('should create account settings options for premium account', async () => {
      mockCurrentAccount.value = { ...mockCurrentAccount.value, accountType: 'PREMIUM' }
      await nextTick()
      const options = composable.loggedInUserOptions.value[1]
      expect(options).toEqual(expectedPremiumOptions)
    })
  })

  describe('switchAccountOptions', () => {
    it('should create switch account options', async () => {
      mockCurrentAccount.value = { ...mockCurrentAccount.value, id: 'account1' }
      mockUserAccounts.value = [
        { id: 'account1', label: 'Account 1' },
        { id: 'account2', label: 'Account 2' }
      ]
      await nextTick()
      const options = composable.switchAccountOptions.value
      expect(options).toHaveLength(3)
      expect(options[0]).toEqual({ label: 'Switch Account', type: 'label' })
      expect(options[1].label).toBe('Account 1')
      expect(options[1].icon).toBe('i-mdi-check')
      expect(options[2].label).toBe('Account 2')
      expect(options[2].icon).toBe('')
    })

    it('should not switch accounts when isActive', () => {
      mockCurrentAccount.value = { ...mockCurrentAccount.value, id: 'account1' }
      const options = composable.switchAccountOptions.value
      const activeOption = options?.find(o => o.label === 'Account 1')
      if (activeOption) {
        activeOption.onSelect()
        expect(mockSwitchCurrentAccount).not.toHaveBeenCalled()
      }
    })

    it('should switch accounts when not isActive', () => {
      mockCurrentAccount.value = { ...mockCurrentAccount.value, id: 'account1' }
      const options = composable.switchAccountOptions.value
      const inactiveOption = options?.find(o => o.label === 'Account 2')
      if (inactiveOption) {
        inactiveOption.onSelect()
        expect(mockSwitchCurrentAccount).toHaveBeenCalledWith('account2')
      }
    })
  })

  describe('createAccountOptions', () => {
    it('should not create createAccountOptions for IDIR users', async () => {
      mockAuthUser.value = { ...mockAuthUser.value, loginSource: 'IDIR' }
      await nextTick()
      const options = composable.loggedInUserOptions.value
      const createAccountOptions = options.find(option => option.some(item => item.label === 'createAccount'))
      expect(createAccountOptions).toBeUndefined()
    })
  })

  describe('notifications options', () => {
    it('should return the label only for no notifications', async () => {
      mockPendingApprovalCount.value = 0
      await nextTick()
      const options = composable.notificationsOptions.value
      expect(options).toEqual([[{ label: 'No Notifications' }]])
    })

    it('should return a slot object for notifications', async () => {
      mockPendingApprovalCount.value = 3
      await nextTick()
      const options = composable.notificationsOptions.value
      expect(options).toEqual([[{
        label: '3 team members require approval to access this account.',
        to: 'https://auth.example.com/account/account1/settings/team-members'
      }]])
    })
  })
})
