import { useConnectAuth } from '#auth-composables'

export const useConnectAccountStore = defineStore('connect-auth-account-store', () => {
  const { $authApi } = useNuxtApp()
  const rtc = useRuntimeConfig().public
  const { authUser } = useConnectAuth()
  // selected user account
  const currentAccount = ref<ConnectAccount>({} as ConnectAccount)
  const userAccounts = ref<ConnectAccount[]>([])
  const currentAccountName = computed<string>(() => currentAccount.value?.label || '')
  const pendingApprovalCount = ref<number>(0)
  const user = computed(() => authUser.value)
  const userFirstName = ref<string>(user.value?.firstName || '-')
  const userLastName = ref<string>(user.value?.lastName || '')
  const userFullName = computed(() => `${userFirstName.value} ${userLastName.value}`)
  const errors = ref<ConnectApiError[]>([])

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

  /** Get user information from AUTH */
  async function getAuthUserProfile(identifier: string): Promise<{ firstname: string, lastname: string } | undefined> {
    try {
      return $authApi<{ firstname: string, lastname: string }>(`/users/${identifier}`, {
        parseResponse: JSON.parse,
        onResponseError({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data?.message || response._data?.description || 'Error fetching user info.',
            detail: response._data.detail || '',
            category: ConnectErrorCategory.USER_INFO
          })
        }
      })
    } catch (e) {
      console.error('Error fetching user info.', e)
      // logFetchError(e, 'Error fetching user info.')
    }
  }

  /** Update user information in AUTH with current token info */
  async function updateAuthUserInfo(): Promise<void> {
    try {
      await $authApi('/users', {
        method: 'POST',
        body: { isLogin: true }
      })
    } catch (e) {
      console.error('Error updating auth user info', e)
      // logFetchError(e, 'Error updating auth user info')
    }
  }

  /** Set user name information */
  async function setUserName() {
    const authUserInfo = await getAuthUserProfile('@me')
    if (authUserInfo?.firstname && authUserInfo?.lastname) {
      userFirstName.value = authUserInfo.firstname
      userLastName.value = authUserInfo.lastname
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
    try {
      // TODO: use orgs fetch instead to get branch name ? $authApi<UserSettings[]>('/users/orgs')
      const response = await $authApi<ConnectUserSettings[]>(`/users/${authUser.value.keycloakGuid}/settings`, {
        onResponseError({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data?.message || 'Error retrieving user accounts.',
            detail: response._data.detail || '',
            category: ConnectErrorCategory.ACCOUNT_LIST
          })
        }
      })

      return response?.filter(setting => setting.type === UserSettingsType.ACCOUNT) as ConnectAccount[]
    } catch (e) {
      console.error('Error retrieving user accounts', e)
      // logFetchError(e, 'Error retrieving user accounts')
      return undefined
    }
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
    try {
      const response = await $authApi<{ count: number }>(`/users/${keycloakGuid}/org/${accountId}/notifications`, {
        onResponseError({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data.message || 'Error retrieving pending approvals.',
            detail: response._data.detail || '',
            category: ConnectErrorCategory.PENDING_APPROVAL_COUNT
          })
        }
      })

      pendingApprovalCount.value = response?.count || 0
    } catch (e) {
      console.error('Error retrieving pending approvals', e)
      // logFetchError(e, 'Error retrieving pending approvals')
    }
  }

  async function checkAccountStatus() {
    // redirect if account status is suspended or in review
    if ([AccountStatus.NSF_SUSPENDED, AccountStatus.SUSPENDED].includes(currentAccount.value?.accountStatus)) {
      // Avoid redirecting when navigating back from PAYBC for NSF or signout.
      const endPath = useRoute().path.split('/').pop() as string
      const isAllowedPath = ['return-cc-payment', 'signout'].includes(endPath)
      if (!isAllowedPath) {
        // URL not allowed so redirect
        const redirectUrl = `${rtc.authWebURL}/account-freeze`
        // TODO: should probably change this to check 'appName' when auth starts using the core layer
        const external = rtc.authWebURL !== rtc.baseUrl
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
        const redirectUrl = `${rtc.authWebURL}/pendingapproval/${accountNameEncoded}/true`
        // TODO: should probably change this to check 'appName' when auth starts using the core layer
        const external = rtc.authWebURL !== rtc.baseUrl
        await navigateTo(redirectUrl, { external })
      }
    }
  }

  async function initAccountStore(): Promise<void> {
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
  }

  function $reset() {
    sessionStorage.removeItem('connect-auth-account-store')
    currentAccount.value = {} as ConnectAccount
    userAccounts.value = []
    pendingApprovalCount.value = 0
    errors.value = []
    userFirstName.value = user.value?.firstName || '-'
    userLastName.value = user.value?.lastName || ''
  }

  return {
    currentAccount,
    currentAccountName,
    userAccounts,
    pendingApprovalCount,
    errors,
    userFullName,
    checkAccountStatus,
    setUserName,
    hasRoles,
    isCurrentAccount,
    getAuthUserProfile,
    setAccountInfo,
    getUserAccounts,
    switchCurrentAccount,
    getPendingApprovalCount,
    initAccountStore,
    $reset
  }
},
{ persist: true } // persist in session storage
)
