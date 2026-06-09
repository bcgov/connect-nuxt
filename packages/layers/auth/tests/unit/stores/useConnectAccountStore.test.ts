/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'

//  Hoisted mocks (must be defined before module evaluation)
const { mockLogFetchError } = vi.hoisted(() => ({ mockLogFetchError: vi.fn() }))
mockNuxtImport('logFetchError', () => mockLogFetchError)

const mockRoute = ref({ path: '/', query: {}, fullPath: '/', matched: [], meta: {} })
mockNuxtImport('useRoute', () => () => mockRoute.value)

const { mockNavigateTo } = vi.hoisted(() => ({ mockNavigateTo: vi.fn() }))
mockNuxtImport('navigateTo', () => mockNavigateTo)

mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    authWebUrl: 'https://auth.example.com/',
    baseUrl: 'https://app.example.com/'
  }
}))

const mockAuthUser = ref<ConnectAuthUser>({} as ConnectAuthUser)
const mockIsAuthenticated = ref(false)
mockNuxtImport('useConnectAuth', () => () => ({
  authUser: mockAuthUser,
  isAuthenticated: mockIsAuthenticated
}))

//  Session storage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
}
Object.defineProperty(global, 'sessionStorage', { value: mockSessionStorage })

const mockUpdateAuthUserProfile = vi.fn()
const mockGetUserAccounts = vi.fn()
mockNuxtImport('useConnectAuthService', () => () => ({
  getUserAccounts: mockGetUserAccounts,
  updateAuthUserProfile: mockUpdateAuthUserProfile
}))

//  Account flow redirect composable
const { mockFinalRedirect } = vi.hoisted(() => ({ mockFinalRedirect: vi.fn() }))
mockNuxtImport('useConnectAccountFlowRedirect', () => () => ({
  finalRedirect: mockFinalRedirect
}))

const mockQueryCache = {
  setQueryData: vi.fn()
}
mockNuxtImport('useQueryCache', () => () => mockQueryCache)

describe('useConnectAccountStore', () => {
  let store: ReturnType<typeof useConnectAccountStore>
  const mockAccounts = [
    {
      type: UserSettingsType.ACCOUNT,
      id: 1,
      accountType: AccountType.PREMIUM,
      accountStatus: AccountStatus.ACTIVE,
      label: 'Account 1',
      urlpath: '',
      urlorigin: ''
    },
    {
      type: UserSettingsType.ACCOUNT,
      id: 2,
      accountType: AccountType.BASIC,
      accountStatus: AccountStatus.ACTIVE,
      label: 'Account 2',
      urlpath: '',
      urlorigin: ''
    },
    {
      type: UserSettingsType.ACCOUNT,
      id: 3,
      accountType: AccountType.PREMIUM,
      accountStatus: AccountStatus.ACTIVE,
      label: 'Account 3',
      urlpath: '',
      urlorigin: ''
    }
  ] as ConnectAccount[]

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
    store = useConnectAccountStore()
    store.$reset()

    // Default profile mock for other tests
    mockUpdateAuthUserProfile.mockResolvedValue({})
  })

  it('initializes with the correct default state', () => {
    expect(store.currentAccount).toEqual({})
    expect(store.userAccounts).toEqual([])
    expect(store.currentAccountName).toEqual('')
  })

  describe('Computed properties', () => {
    it('hasRoles should return true if account or user has the role', () => {
      store.currentAccount = mockAccounts[0]!
      mockAuthUser.value = { roles: ['viewer'] } as ConnectAuthUser
      expect(store.hasRoles(['PREMIUM'])).toBe(true)
      expect(store.hasRoles(['viewer'])).toBe(true)
      expect(store.hasRoles(['ADMIN'])).toBe(false)
    })

    it('isCurrentAccount should return true for the active account ID', () => {
      store.currentAccount = mockAccounts[0]!
      expect(store.isCurrentAccount(1)).toBe(true)
      expect(store.isCurrentAccount(2)).toBe(false)
    })

    it('currentAccountName should return the label of the current account', () => {
      store.currentAccount = mockAccounts[0]!
      expect(store.currentAccountName).toEqual('Account 1')
    })
  })

  describe('initAccountStore', () => {
    it('should load user accounts and check account status', async () => {
      const suspendedAccount = {
        id: 1,
        accountStatus: AccountStatus.SUSPENDED,
        label: 'Suspended Account'
      } as any
      mockGetUserAccounts.mockResolvedValueOnce([suspendedAccount])

      await store.initAccountStore()

      expect(mockGetUserAccounts).toHaveBeenCalled()
      expect(store.currentAccount.id).toBe(1)

      // checkAccountStatus triggered
      expect(mockNavigateTo).toHaveBeenCalledWith(
        'https://auth.example.com/account-freeze',
        expect.any(Object)
      )
    })
  })

  describe('loadUserAccount', () => {
    it('should set user accounts and current account', async () => {
      mockAuthUser.value.keycloakGuid = 'test-guid'
      const accounts = [mockAccounts[0]!, mockAccounts[1]!]
      mockGetUserAccounts.mockResolvedValueOnce(accounts)

      await store.loadUserAccounts()

      expect(store.userAccounts).toEqual(accounts)
      expect(store.currentAccount).toEqual(accounts[0])
    })

    it('should not update the current account if it exists in the new list', async () => {
      store.currentAccount = mockAccounts[1]!
      const freshAccountsList = [mockAccounts[0]!, mockAccounts[1]!]
      mockGetUserAccounts.mockResolvedValueOnce(freshAccountsList)

      await store.loadUserAccounts()

      expect(store.currentAccount.id).toBe(2)
    })

    it('should update the current account if the previous account is not in the new list', async () => {
      store.currentAccount = { id: 999, label: 'Deleted Account' } as any
      const freshAccountsList = [mockAccounts[0]!, mockAccounts[1]!]
      mockGetUserAccounts.mockResolvedValueOnce(freshAccountsList)

      await store.loadUserAccounts()

      expect(store.currentAccount.id).toBe(mockAccounts[0]!.id)
    })
  })

  describe('syncUserProfile', () => {
    it('should set user name from API if available', async () => {
      const mockApiData = { firstname: 'API', lastname: 'User' }
      mockUpdateAuthUserProfile.mockResolvedValue(mockApiData)
      mockAuthUser.value.keycloakGuid = 'test-guid'
      mockAuthUser.value.firstName = 'Default'

      await store.syncUserProfile()

      expect(store.userFullName).toEqual('API User')
    })

    it('should fallback to authUser name', async () => {
      mockUpdateAuthUserProfile.mockResolvedValue({})
      mockAuthUser.value.keycloakGuid = 'test-guid'
      mockAuthUser.value.firstName = 'Fallback'

      await store.syncUserProfile()

      expect(store.userFullName).toEqual('Fallback ')
    })

    it('should pre-populate email from contacts[0].email', async () => {
      const mockApiData = {
        firstname: 'API',
        lastname: 'User',
        contacts: [{ email: 'contact@example.com', phone: '', phoneExtension: '' }]
      }
      mockUpdateAuthUserProfile.mockResolvedValue(mockApiData)
      store.userEmail = ''

      await store.syncUserProfile()

      expect(store.userEmail).toEqual('contact@example.com')
    })

    it('should not set email when contacts array is empty', async () => {
      const mockApiData = { firstname: 'API', lastname: 'User', contacts: [] }
      mockUpdateAuthUserProfile.mockResolvedValue(mockApiData)
      store.userEmail = ''

      await store.syncUserProfile()

      expect(store.userEmail).toEqual('')
    })

    // FUTURE: unskip when fix is made in auth api - ticket: 33711
    it.skip('should update the query cache', async () => {
      const mockApiData = { firstname: 'Test', lastname: 'User' }
      mockUpdateAuthUserProfile.mockResolvedValue(mockApiData)

      await store.syncUserProfile()

      expect(mockQueryCache.setQueryData).toHaveBeenCalledWith(
        expect.any(Array),
        mockApiData
      )
    })
  })

  describe('checkAccountStatus', () => {
    it('should not redirect for an active account', async () => {
      store.currentAccount = { ...mockAccounts[0]!, accountStatus: AccountStatus.ACTIVE } as ConnectAccount
      store.checkAccountStatus()
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })

    it('should redirect for a suspended account', async () => {
      store.currentAccount = { ...mockAccounts[0]!, accountStatus: AccountStatus.SUSPENDED } as ConnectAccount
      store.checkAccountStatus()
      expect(mockNavigateTo).toHaveBeenCalledWith('https://auth.example.com/account-freeze', expect.any(Object))
    })

    it('should redirect for an NSF suspended account', async () => {
      store.currentAccount = { ...mockAccounts[0]!, accountStatus: AccountStatus.NSF_SUSPENDED } as ConnectAccount
      store.checkAccountStatus()
      expect(mockNavigateTo).toHaveBeenCalledWith('https://auth.example.com/account-freeze', expect.any(Object))
    })

    it('should redirect for a pending staff review account', async () => {
      store.currentAccount = {
        ...mockAccounts[0]!, accountStatus: AccountStatus.PENDING_STAFF_REVIEW
      } as ConnectAccount
      store.checkAccountStatus()
      expect(mockNavigateTo).toHaveBeenCalledWith(expect.stringContaining('pendingapproval'), expect.any(Object))
    })

    it('should not redirect for a pending staff review account on an allowed path', async () => {
      mockRoute.value.path = '/setup-non-bcsc-account'
      store.currentAccount = {
        ...mockAccounts[0]!, accountStatus: AccountStatus.PENDING_STAFF_REVIEW
      } as ConnectAccount
      store.checkAccountStatus()
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })

  describe('switchCurrentAccount', () => {
    it('switchCurrentAccount should switch the current account', async () => {
      store.userAccounts = mockAccounts
      store.currentAccount = mockAccounts[0]!
      expect(store.currentAccount.label).toEqual('Account 1')
      store.switchCurrentAccount(3)
      expect(store.currentAccount.label).toEqual('Account 3')
    })

    it('switchCurrentAccount should run checkAccountStatus after switching (active account does not redirect)',
      async () => {
        store.userAccounts = mockAccounts
        store.currentAccount = mockAccounts[0]!
        store.switchCurrentAccount(2)
        expect(store.currentAccount.label).toEqual('Account 2')
        // Active account should not trigger a redirect
        expect(mockNavigateTo).not.toHaveBeenCalled()
      })

    it('switchCurrentAccount should redirect when switching to a suspended account', async () => {
      const suspendedAccount = { ...mockAccounts[1]!, accountStatus: AccountStatus.SUSPENDED } as ConnectAccount
      store.userAccounts = [mockAccounts[0]!, suspendedAccount]
      store.currentAccount = mockAccounts[0]!
      store.switchCurrentAccount(suspendedAccount.id)
      expect(store.currentAccount.accountStatus).toEqual(AccountStatus.SUSPENDED)
      expect(mockNavigateTo).toHaveBeenCalledWith(
        expect.stringContaining('account-freeze'),
        expect.any(Object)
      )
    })

    it('switchCurrentAccount should not run checkAccountStatus if account not found', async () => {
      store.userAccounts = mockAccounts
      store.currentAccount = mockAccounts[0]!
      store.switchCurrentAccount(999)
      expect(store.currentAccount.label).toEqual('Account 1')
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })

  it('$reset should clear all store state', () => {
    store.userAccounts = mockAccounts
    store.currentAccount = mockAccounts[0]!
    store.$reset()
    expect(store.currentAccount).toEqual({})
    expect(store.userAccounts).toEqual([])
  })
})
