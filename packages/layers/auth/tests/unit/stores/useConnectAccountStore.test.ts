/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'

const mockAuthApi = vi.fn()
mockNuxtImport('useNuxtApp', () => () => ({
  $authApi: mockAuthApi
}))

const { mockLogFetchError } = vi.hoisted(() => {
  return { mockLogFetchError: vi.fn() }
})
mockNuxtImport('logFetchError', () => mockLogFetchError)

const mockRoute = ref({ path: '/', query: {}, fullPath: '/', matched: [], meta: {} })
mockNuxtImport('useRoute', () => () => mockRoute.value)

const { mockNavigateTo } = vi.hoisted(() => {
  return { mockNavigateTo: vi.fn() }
})
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

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
}
Object.defineProperty(global, 'sessionStorage', { value: mockSessionStorage })

const mockGetAuthUserProfile = vi.fn()
mockNuxtImport('useAuthApi', () => () => ({
  getAuthUserProfile: mockGetAuthUserProfile
}))

describe('useConnectAccountStore', () => {
  let store: ReturnType<typeof useConnectAccountStore>
  const mockAccounts: Array<Partial<ConnectAccount>> = [
    {
      type: UserSettingsType.ACCOUNT,
      id: 1,
      accountType: AccountType.PREMIUM,
      accountStatus: AccountStatus.ACTIVE,
      label: 'Account 1'
    },
    {
      type: UserSettingsType.ACCOUNT,
      id: 2,
      accountType: AccountType.BASIC,
      accountStatus: AccountStatus.ACTIVE,
      label: 'Account 2'
    },
    {
      type: UserSettingsType.ACCOUNT,
      id: 3,
      accountType: AccountType.PREMIUM,
      accountStatus: AccountStatus.ACTIVE,
      label: 'Account 3'
    }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
    // useQueryCache().invalidateQueries()
    store = useConnectAccountStore()
    store.$reset()
  })

  it('initializes with the correct default state', () => {
    expect(store.currentAccount).toEqual({})
    expect(store.userAccounts).toEqual([])
    expect(store.pendingApprovalCount).toEqual(0)
    expect(store.currentAccountName).toEqual('')
  })

  describe('Computed properties', () => {
    it('hasRoles should return true if account or user has the role', () => {
      store.currentAccount = mockAccounts[0] as any
      mockAuthUser.value = { roles: ['viewer'] } as ConnectAuthUser
      expect(store.hasRoles(['PREMIUM'])).toBe(true)
      expect(store.hasRoles(['viewer'])).toBe(true)
      expect(store.hasRoles(['ADMIN'])).toBe(false)
    })

    it('isCurrentAccount should return true for the active account ID', () => {
      store.currentAccount = mockAccounts[0] as any
      expect(store.isCurrentAccount(1)).toBe(true)
      expect(store.isCurrentAccount(2)).toBe(false)
    })

    it('currentAccountName should return the label of the current account', () => {
      store.currentAccount = mockAccounts[0] as any
      expect(store.currentAccountName).toEqual('Account 1')
    })
  })

  describe('Auth API Actions', () => {
    it('getUserAccounts should fetch and filter accounts correctly', async () => {
      mockAuthUser.value.keycloakGuid = 'test-guid'
      const mockApiData = [...mockAccounts, { type: 'other' }]
      mockAuthApi.mockResolvedValueOnce(mockApiData)

      const accounts = await store.getUserAccounts()

      expect(mockAuthApi).toHaveBeenCalledWith('/users/test-guid/settings')
      expect(accounts).toEqual(mockAccounts)
    })

    it('setAccountInfo should set user accounts and current account', async () => {
      mockAuthUser.value.keycloakGuid = 'test-guid'
      const accounts = [mockAccounts[0], mockAccounts[1]]
      mockAuthApi.mockResolvedValueOnce(accounts)

      await store.setAccountInfo()

      expect(store.userAccounts).toEqual(accounts)
      expect(store.currentAccount).toEqual(accounts[0])
    })

    it('setUserName should set user name from API if available', async () => {
      const mockApiData = { firstname: 'API', lastname: 'User' }
      mockGetAuthUserProfile.mockResolvedValue({
        data: { value: mockApiData },
        refresh: vi.fn()
      })
      mockAuthUser.value.keycloakGuid = 'test-guid'
      mockAuthUser.value.firstName = 'Default'

      await store.setUserName()

      expect(store.userFullName).toEqual('API User')
    })

    it('setUserName should fallback to authUser name', async () => {
      mockGetAuthUserProfile.mockResolvedValue({
        data: { value: {} },
        refresh: vi.fn()
      })
      mockAuthUser.value.keycloakGuid = 'test-guid'
      mockAuthUser.value.firstName = 'Fallback'

      await store.setUserName()

      expect(store.userFullName).toEqual('Fallback ')
    })

    it('getPendingApprovalCount should set the count', async () => {
      store.currentAccount = { id: 1 } as ConnectAccount
      mockAuthUser.value.keycloakGuid = 'test-guid'
      mockAuthApi.mockResolvedValueOnce({ count: 5 })

      await store.getPendingApprovalCount()

      expect(mockAuthApi).toHaveBeenCalled()
      expect(store.pendingApprovalCount).toEqual(5)
    })
  })

  describe('checkAccountStatus', () => {
    it('should not redirect for an active account', async () => {
      store.currentAccount = { ...mockAccounts[0], accountStatus: AccountStatus.ACTIVE } as ConnectAccount
      await store.checkAccountStatus()
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })

    it('should redirect for a suspended account', async () => {
      store.currentAccount = { ...mockAccounts[0], accountStatus: AccountStatus.SUSPENDED } as ConnectAccount
      await store.checkAccountStatus()
      expect(mockNavigateTo).toHaveBeenCalledWith('https://auth.example.com/account-freeze', expect.any(Object))
    })

    it('should redirect for an NSF suspended account', async () => {
      store.currentAccount = { ...mockAccounts[0], accountStatus: AccountStatus.NSF_SUSPENDED } as ConnectAccount
      await store.checkAccountStatus()
      expect(mockNavigateTo).toHaveBeenCalledWith('https://auth.example.com/account-freeze', expect.any(Object))
    })

    it('should redirect for a pending staff review account', async () => {
      store.currentAccount = { ...mockAccounts[0], accountStatus: AccountStatus.PENDING_STAFF_REVIEW } as ConnectAccount
      await store.checkAccountStatus()
      expect(mockNavigateTo).toHaveBeenCalledWith(expect.stringContaining('pendingapproval'), expect.any(Object))
    })

    it('should not redirect for a pending staff review account on an allowed path', async () => {
      mockRoute.value.path = '/setup-non-bcsc-account'
      store.currentAccount = { ...mockAccounts[0], accountStatus: AccountStatus.PENDING_STAFF_REVIEW } as ConnectAccount
      await store.checkAccountStatus()
      expect(mockNavigateTo).not.toHaveBeenCalled()
    })
  })

  describe('Actions', () => {
    it('switchCurrentAccount should switch the current account', () => {
      store.userAccounts = mockAccounts as any
      store.currentAccount = mockAccounts[0] as any
      expect(store.currentAccount.label).toEqual('Account 1')
      store.switchCurrentAccount(3)
      expect(store.currentAccount.label).toEqual('Account 3')
    })

    it('$reset should clear all store state', () => {
      store.userAccounts = mockAccounts as any
      store.currentAccount = mockAccounts[0] as any
      store.pendingApprovalCount = 5
      store.$reset()
      expect(store.currentAccount).toEqual({})
      expect(store.userAccounts).toEqual([])
      expect(store.pendingApprovalCount).toEqual(0)
    })
  })

  describe('initAccountStore', () => {
    it('should call all initialize sub-actions', async () => {
      mockGetAuthUserProfile.mockResolvedValue(
        { data: { value: { firstname: 'API', lastname: 'User' } }, refresh: vi.fn() }
      )
      mockAuthUser.value.keycloakGuid = 'test-guid'
      store.currentAccount = { id: 1 } as ConnectAccount

      await store.initAccountStore()

      expect(mockAuthApi).toHaveBeenCalledWith('/users/test-guid/settings')

      expect(mockAuthApi).toHaveBeenCalledWith('/users', {
        method: 'POST',
        body: { isLogin: true }
      })

      expect(mockGetAuthUserProfile).toHaveBeenCalled()

      const calls = mockAuthApi.mock.calls

      expect(calls[0]![0]).toBe('/users/test-guid/settings')
      expect(calls[1]![0]).toBe('/users')
      expect(calls[2]![0]).toBe('/users/test-guid/org/1/notifications')
    })

    it('should log initialization error', async () => {
      mockAuthApi.mockRejectedValue(new Error('API Error'))
      await store.initAccountStore()
      expect(mockLogFetchError).toHaveBeenCalledWith(expect.any(Error), expect.any(String))
    })
  })
})
