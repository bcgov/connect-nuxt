import { describe, expect, it, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'

//  Nuxt app / APIs
const mockAuthApi = vi.fn()
mockNuxtImport('useNuxtApp', () => () => ({
  $authApi: mockAuthApi,
  $i18n: { t: vi.fn((key: string) => key) }
}))

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

//  Auth API composables (profile, create account, update contact)
const mockGetAuthUserProfile = vi.fn()
const mockCreateAccount = vi.fn()
const mockUpdateUserContact = vi.fn()

mockNuxtImport('useAuthApi', () => () => ({
  getAuthUserProfile: mockGetAuthUserProfile,
  useCreateAccount: () => ({ createAccount: mockCreateAccount }),
  useUpdateUserContact: () => ({ updateUserContact: mockUpdateUserContact })
}))

//  Account flow redirect composable
const { mockFinalRedirect } = vi.hoisted(() => ({ mockFinalRedirect: vi.fn() }))
mockNuxtImport('useConnectAccountFlowRedirect', () => () => ({
  finalRedirect: mockFinalRedirect
}))

//  Schema for account form (mock)
vi.mock('#auth/app/utils/schemas/account', () => {
  return {
    getAccountCreateSchema: () => ({
      parse: () => ({
        accountName: '',
        emailAddress: '',
        phone: { phoneNumber: '', ext: '' },
        address: {
          city: '',
          country: '',
          region: '',
          postalCode: '',
          street: '',
          streetAdditional: '',
          locationDescription: ''
        }
      })
    })
  }
})

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
    store = useConnectAccountStore()
    store.$reset()

    // Default profile mock for other tests
    mockGetAuthUserProfile.mockResolvedValue({
      data: { value: {} },
      refresh: vi.fn()
    })
  })

  it('initializes with the correct default state', () => {
    expect(store.currentAccount).toEqual({})
    expect(store.userAccounts).toEqual([])
    expect(store.pendingApprovalCount).toEqual(0)
    expect(store.currentAccountName).toEqual('')
  })

  describe('Computed properties', () => {
    it('hasRoles should return true if account or user has the role', () => {
      store.currentAccount = mockAccounts[0]
      mockAuthUser.value = { roles: ['viewer'] } as ConnectAuthUser
      expect(store.hasRoles(['PREMIUM'])).toBe(true)
      expect(store.hasRoles(['viewer'])).toBe(true)
      expect(store.hasRoles(['ADMIN'])).toBe(false)
    })

    it('isCurrentAccount should return true for the active account ID', () => {
      store.currentAccount = mockAccounts[0]
      expect(store.isCurrentAccount(1)).toBe(true)
      expect(store.isCurrentAccount(2)).toBe(false)
    })

    it('currentAccountName should return the label of the current account', () => {
      store.currentAccount = mockAccounts[0]
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
      store.userAccounts = mockAccounts
      store.currentAccount = mockAccounts[0]
      expect(store.currentAccount.label).toEqual('Account 1')
      store.switchCurrentAccount(3)
      expect(store.currentAccount.label).toEqual('Account 3')
    })

    it('$reset should clear all store state', () => {
      store.userAccounts = mockAccounts
      store.currentAccount = mockAccounts[0]
      store.pendingApprovalCount = 5
      store.$reset()
      expect(store.currentAccount).toEqual({})
      expect(store.userAccounts).toEqual([])
      expect(store.pendingApprovalCount).toEqual(0)
    })
  })

  //  Tests for submitCreateAccount flow (updated for single updateUserContact after createAccount)
  describe('submitCreateAccount', () => {
    beforeEach(() => {
      // mock updateUserContact to invoke the successCb when present
      mockUpdateUserContact.mockImplementation(async (payload) => {
        if (payload && typeof payload.successCb === 'function') {
          await payload.successCb()
        }
      })
      mockCreateAccount.mockResolvedValue(undefined)
      mockFinalRedirect.mockResolvedValue(undefined)
      mockRoute.value.path = '/'
    })

    it('should create account, then update contact once with successCb, and call finalRedirect', async () => {
      // Prepare form state
      store.accountFormState.accountName = 'Cameron Co'
      store.accountFormState.emailAddress = 'cam@example.com'
      store.accountFormState.phone.phoneNumber = '2505551234'
      store.accountFormState.phone.ext = '123'
      store.accountFormState.address.city = 'Victoria'
      store.accountFormState.address.country = 'CA'
      store.accountFormState.address.region = 'BC'
      store.accountFormState.address.postalCode = 'V8W1N6'
      store.accountFormState.address.street = '123 Wharf St'
      store.accountFormState.address.streetAdditional = 'Suite 500'
      store.accountFormState.address.locationDescription = 'By the inner harbour'

      expect(store.isLoading).toBe(false)

      await store.submitCreateAccount()

      // isLoading should end false
      expect(store.isLoading).toBe(false)

      // New flow: createAccount then a single updateUserContact (with successCb)
      expect(mockCreateAccount).toHaveBeenCalledTimes(1)
      expect(mockUpdateUserContact).toHaveBeenCalledTimes(1)

      // Validate createAccount payload mapping
      const createArgs = mockCreateAccount.mock.calls[0]![0]
      expect(createArgs).toEqual(
        expect.objectContaining({
          payload: expect.objectContaining({
            name: 'Cameron Co',
            mailingAddress: expect.objectContaining({
              city: 'Victoria',
              country: 'CA',
              region: 'BC',
              postalCode: 'V8W1N6',
              street: '123 Wharf St',
              streetAdditional: 'Suite 500',
              deliveryInstructions: 'By the inner harbour'
            }),
            paymentInfo: expect.objectContaining({
              paymentMethod: expect.anything()
            }),
            productSubscriptions: expect.arrayContaining([expect.objectContaining({})])
          })
        })
      )

      // Single updateUserContact args should include successCb
      const updateArgs = mockUpdateUserContact.mock.calls[0]![0]
      expect(updateArgs).toEqual(
        expect.objectContaining({
          email: 'cam@example.com',
          phone: '2505551234',
          phoneExtension: '123',
          successCb: expect.any(Function)
        })
      )

      // finalRedirect should be called with the current route (via successCb)
      expect(mockFinalRedirect).toHaveBeenCalledTimes(1)
      expect(mockFinalRedirect).toHaveBeenCalledWith(mockRoute.value)
    })

    it('should handle errors gracefully (logs and resets isLoading) when createAccount fails', async () => {
      // Prepare minimal form state
      store.accountFormState.accountName = 'Error Co'
      store.accountFormState.emailAddress = 'err@example.com'
      store.accountFormState.phone.phoneNumber = '5550000000'

      // createAccount fails; updateUserContact should NOT be called in new flow
      mockCreateAccount.mockRejectedValue(new Error('Create failed'))

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      })

      await store.submitCreateAccount()

      // Should have attempted createAccount, but NOT updateUserContact
      expect(mockCreateAccount).toHaveBeenCalledTimes(1)
      expect(mockUpdateUserContact).toHaveBeenCalledTimes(0)

      // finalRedirect should not be called
      expect(mockFinalRedirect).not.toHaveBeenCalled()

      // Error should be logged, and isLoading reset
      expect(consoleSpy).toHaveBeenCalledWith('Account Create Submission Error: ', expect.any(Error))
    })
  })
})
