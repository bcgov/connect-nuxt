import { getAccountCreateSchema } from '#auth/app/utils/schemas/account'
import type { AccountProfileSchema } from '#auth/app/utils/schemas/account'
import type { ConnectCreateAccount } from '#auth/app/interfaces/connect-account'

export const useConnectAccountStore = defineStore('connect-auth-account-store', () => {
  const { $authApi } = useNuxtApp()
  const rtc = useRuntimeConfig().public
  const { authUser } = useConnectAuth()
  const { useCreateAccount, useUpdateUserContact, getAuthUserProfile } = useAuthApi()
  const { finalRedirect } = useConnectAccountFlowRedirect()

  // selected user account
  const currentAccount = ref<ConnectAccount>({} as ConnectAccount)
  const userAccounts = ref<ConnectAccount[]>([])
  const currentAccountName = computed<string>(() => currentAccount.value?.label || '')
  const pendingApprovalCount = ref<number>(0)
  const user = computed(() => authUser.value)
  const userFirstName = ref<string>(user.value?.firstName || '-')
  const userLastName = ref<string>(user.value?.lastName || '')
  const userFullName = computed(() => `${userFirstName.value} ${userLastName.value}`)

  // Create account
  const isLoading = ref<boolean>(false)
  const { createAccount } = useCreateAccount()
  const { updateUserContact } = useUpdateUserContact()
  const createAccountProfileSchema = getAccountCreateSchema()
  const accountFormState = reactive<AccountProfileSchema>(createAccountProfileSchema.parse({}))
  /**
   * Checks if the current account or the Keycloak user has any of the specified roles.
   *
   * @param roles - An array of roles to check against the current account or Keycloak user roles.
   * @returns Returns `true` if the current account has one of the roles, or if the Keycloak user has one of the roles.
   *
   * @example
   * // Assuming the current account has the type 'admin' and the authUser has the roles ['editor', 'viewer', 'admin']:
   * const rolesToCheck = ['admin', 'superadmin'];
   * const hasRequiredRole = hasRoles(rolesToCheck); // true
  */
  function hasRoles(roles: string[]): boolean {
    const currentAccountHasRoles = roles.includes(currentAccount.value.accountType)
    const authUserHasRoles = roles.some(role => authUser.value.roles.includes(role))
    return currentAccountHasRoles || authUserHasRoles
  }

  /**
   * Checks if the given account ID matches the ID of the current account in the store.
   *
   * @param accountId - The account ID to check.
   * @returns True if the given account ID matches the current account ID, false otherwise.
  */
  function isCurrentAccount(accountId: number): boolean {
    return accountId === currentAccount.value.id
  }

  /** Update user information in AUTH with current token info */
  async function updateAuthUserInfo(): Promise<void> {
    await $authApi('/users', {
      method: 'POST',
      body: { isLogin: true }
    })
  }

  /** Map AccountFormState -> CreateAccountPayload */
  function createAccountPayload(): ConnectCreateAccount {
    return {
      accessType: AccessType.REGULAR,
      mailingAddress: {
        city: accountFormState.address.city,
        country: accountFormState.address.country,
        region: accountFormState.address.region,
        postalCode: accountFormState.address.postalCode,
        street: accountFormState.address.street,
        streetAdditional: accountFormState.address.streetAdditional || '',
        deliveryInstructions: accountFormState.address.locationDescription || ''
      },
      name: accountFormState.accountName,
      paymentInfo: { paymentMethod: PaymentMethod.DIRECT_PAY },
      productSubscriptions: [{ productCode: ProductCode.BUSINESS }]
    }
  }

  /** Submit create account request */
  async function submitCreateAccount(): Promise<void> {
    try {
      isLoading.value = true
      const payload = createAccountPayload()

      // Update Contact Info after account creation
      await updateUserContact({
        email: accountFormState.emailAddress,
        phone: accountFormState.phone.phoneNumber,
        phoneExtension: accountFormState.phone.ext
      })

      // Create Account
      await createAccount({ payload })

      // Update User Contact Info
      await updateUserContact({
        email: accountFormState.emailAddress,
        phone: accountFormState.phone.phoneNumber,
        phoneExtension: accountFormState.phone.ext,
        successCb: async () => await finalRedirect(useRoute())
      })
    } catch (error) {
      // Error handled in useAuthApi
      console.error('Account Create Submission Error: ', error)
    } finally {
      isLoading.value = false
    }
  }

  /** Set user name information */
  async function setUserName() {
    const { data, refresh } = await getAuthUserProfile()
    await refresh()
    if (data.value?.firstname && data.value?.lastname) {
      userFirstName.value = data.value.firstname
      userLastName.value = data.value.lastname
      return
    }
    userFirstName.value = user.value?.firstName || '-'
    userLastName.value = user.value?.lastName || ''
  }

  /** Get the user's account list */
  async function getUserAccounts(): Promise<ConnectAccount[] | undefined> {
    if (!authUser.value?.keycloakGuid) {
      return undefined
    }
    // TODO: use orgs fetch instead to get branch name ? $authApi<UserSettings[]>('/users/orgs')
    const response = await $authApi<ConnectUserSettings[]>(`/users/${authUser.value.keycloakGuid}/settings`)
    return response?.filter(setting => setting.type === UserSettingsType.ACCOUNT) as ConnectAccount[]
  }

  /** Set the user account list and current account */
  async function setAccountInfo(): Promise<void> {
    const accounts = await getUserAccounts()
    if (accounts && accounts[0]) {
      userAccounts.value = accounts
      if (!currentAccount.value.id || !userAccounts.value.some(account => account.id === currentAccount.value.id)) {
        currentAccount.value = accounts[0]
      }
    }
  }

  /** Switch the current account to the given account ID if it exists in the user's account list */
  function switchCurrentAccount(accountId: number) {
    const account = userAccounts.value.find(account => account.id === accountId)
    if (account) {
      currentAccount.value = account
    }
  }

  async function getPendingApprovalCount(): Promise<void> {
    const accountId = currentAccount.value?.id
    const keycloakGuid = authUser.value?.keycloakGuid
    if (!accountId || !keycloakGuid) {
      return
    }
    const response = await $authApi<{ count: number }>(`/users/${keycloakGuid}/org/${accountId}/notifications`)
    pendingApprovalCount.value = response?.count || 0
  }

  async function checkAccountStatus() {
    // redirect if account status is suspended or in review
    if ([AccountStatus.NSF_SUSPENDED, AccountStatus.SUSPENDED].includes(currentAccount.value?.accountStatus)) {
      // Avoid redirecting when navigating back from PAYBC for NSF or signout.
      const endPath = useRoute().path.split('/').pop() as string
      const isAllowedPath = ['return-cc-payment', 'signout'].includes(endPath)
      if (!isAllowedPath) {
        // URL not allowed so redirect
        const redirectUrl = `${rtc.authWebUrl}account-freeze`
        // TODO: should probably change this to check 'appName' when auth starts using the core layer
        const external = rtc.authWebUrl !== rtc.baseUrl
        await navigateTo(redirectUrl, { external })
      }
    } else if (currentAccount.value?.accountStatus === AccountStatus.PENDING_STAFF_REVIEW) {
      // check the path is allowed for pending approval account
      const endPath = useRoute().path.split('/').pop() as string
      const isAllowedPath = ['setup-non-bcsc-account', 'signout'].includes(endPath)
      if (!isAllowedPath) {
        // URL not allowed so redirect
        // TODO: auth web pending approval page is not displaying the encoded name correctly.
        // It would be better if we could pass the account id here and then the pending page could infer the name.
        // const accountNameEncoded = encodeURIComponent(btoa(currentAccount.value?.id))
        // Temporary: remove spaces and it shows something legible at least
        const accountNameEncoded = currentAccount.value?.label?.replaceAll(' ', '')
        const redirectUrl = `${rtc.authWebUrl}pendingapproval/${accountNameEncoded}/true`
        // TODO: should probably change this to check 'appName' when auth starts using the core layer
        const external = rtc.authWebUrl !== rtc.baseUrl
        await navigateTo(redirectUrl, { external })
      }
    }
  }

  async function initAccountStore(): Promise<void> {
    try {
      await Promise.all([
        setAccountInfo(),
        updateAuthUserInfo(),
        setUserName()
      ])

      if (currentAccount.value.id) {
        await Promise.all([
          checkAccountStatus(),
          getPendingApprovalCount()
        ])
      }
    } catch (e) {
      logFetchError(e, '[Account Store] - Error during initialization')
    }
  }

  function $reset() {
    sessionStorage.removeItem('connect-auth-account-store')
    currentAccount.value = {} as ConnectAccount
    userAccounts.value = []
    pendingApprovalCount.value = 0
    userFirstName.value = user.value?.firstName || '-'
    userLastName.value = user.value?.lastName || ''
    clearAccountState()
  }

  function clearAccountState() {
    Object.assign(accountFormState, createAccountProfileSchema.parse({}))
  }

  return {
    accountFormState,
    checkAccountStatus,
    clearAccountState,
    submitCreateAccount,
    isLoading,
    currentAccount,
    currentAccountName,
    getPendingApprovalCount,
    getUserAccounts,
    hasRoles,
    initAccountStore,
    isCurrentAccount,
    pendingApprovalCount,
    setAccountInfo,
    setUserName,
    switchCurrentAccount,
    userAccounts,
    userFullName,
    $reset
  }
},
{ persist: true } // persist in session storage
)
