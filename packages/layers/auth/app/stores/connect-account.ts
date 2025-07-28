// import { addToHeaders } from '~/plugins/auth-api'
/** Manages connect account data */
export const useConnectAccountStore = defineStore('connect-auth-account-store', () => {
  const { $authApi } = useNuxtApp()
  const rtc = useRuntimeConfig().public
  const { authUser, isAuthenticated } = useConnectAuth()
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

  const isStaffOrSbcStaff = computed<boolean>(() => {
    if (!isAuthenticated.value) { return false }
    const currentAccountIsStaff = [AccountType.STAFF, AccountType.SBC_STAFF].includes(currentAccount.value.accountType)
    return currentAccountIsStaff || authUser.value.roles.includes(UserRole.Staff)
  })

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
  function hasRoles (roles: string[]): boolean {
    const currentAccountHasRoles = roles.includes(currentAccount.value.accountType)
    const kcUserHasRoles = roles.some(role => authUser.value.roles.includes(role))
    return currentAccountHasRoles || kcUserHasRoles
  }

  /**
   * Checks if the given account ID matches the ID of the current account in the store.
   *
   * @param accountId - The account ID to check.
   * @returns True if the given account ID matches the current account ID, false otherwise.
  */
  function isCurrentAccount (accountId: number): boolean {
    return accountId === currentAccount.value.id
  }

  /** Get user information from AUTH */
  // TODO: confirm data returned from auth
  // {
  //   "contacts": [],
  //   "created": "2024-12-11T20:23:08+00:00",
  //   "email": "test@gmail.com",
  //   "id": 6089,
  //   "idpUserid": "stuff",
  //   "keycloakGuid": "stuff",
  //   "loginSource": "BCEID",
  //   "loginTime": "2024-12-11T20:28:53+00:00",
  //   "modified": "2024-12-11T20:28:53+00:00",
  //   "modifiedBy": "None None",
  //   "type": "PUBLIC_USER",
  //   "userStatus": 1,
  //   "userTerms": {
  //       "isTermsOfUseAccepted": false,
  //       "termsOfUseAcceptedVersion": null
  //   },
  //   "username": "stuff",
  //   "verified": false
  // }
  async function getAuthUserProfile (identifier: string) {
    // const authApiURL = rtc.authApiURL
    try {
      return $authApi(`/users/${identifier}`, { // native fetch doesnt break app
        parseResponse: JSON.parse,
        onResponseError ({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data?.message || response._data?.description || 'Error fetching user info.',
            detail: response._data.detail || '',
            category: ConnectErrorCategory.USER_INFO
          })
        }
        // headers: addToHeaders({})
      })
    } catch (e) {
      console.error('Error fetching user info.')
      // logFetchError(e, 'Error fetching user info.')
    }
  }

  /** Update user information in AUTH with current token info */
  async function updateAuthUserInfo (): Promise<void | ConnectAuthUser> {
    try {
      const response = await $authApi<ConnectAuthUser>('/users', {
        method: 'POST',
        body: { isLogin: true }
      })

      return response
    } catch (e) {
      console.error('Error updating auth user info')
      // logFetchError(e, 'Error updating auth user info')
    }
  }

  /** Set user name information */
  async function setUserName () {
    if (user.value?.loginSource === ConnectLoginSource.BCEID) {
      // get from auth
      const authUserInfo = await getAuthUserProfile('@me')
      // firstName and lastName dont always exist it seems ?, also response isn't camelcase eg. firstname
      if (authUserInfo.firstName !== undefined && authUserInfo.lastName !== undefined) {
        userFirstName.value = authUserInfo.firstName
        userLastName.value = authUserInfo.lastName
      }
      return
    }
    userFirstName.value = user.value?.firstName || '-'
    userLastName.value = user.value?.lastName || ''
  }

  /** Get the user's account list */
  async function getUserAccounts (keycloakGuid: string): Promise<ConnectAccount[] | undefined> {
    try {
      // TODO: use orgs fetch instead to get branch name ? $authApi<UserSettings[]>('/users/orgs')
      const response = await $authApi<ConnectUserSettings[]>(`/users/${keycloakGuid}/settings`, {
        onResponseError ({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data?.message || 'Error retrieving user accounts.',
            detail: response._data.detail || '',
            category: ConnectErrorCategory.ACCOUNT_LIST
          })
        }
      })

      if (response) {
        return response.filter(userSettings => (userSettings.type === UserSettingsType.ACCOUNT)) as ConnectAccount[]
      } else {
        return undefined
      }
    } catch (e) {
      console.error('Error retrieving user accounts')
      // logFetchError(e, 'Error retrieving user accounts')
      return undefined
    }
  }

  /** Set the user account list and current account */
  async function setAccountInfo () {
    if (authUser.value?.keycloakGuid) {
      const response = await getUserAccounts(authUser.value?.keycloakGuid)
      if (response && response[0] !== undefined) {
        userAccounts.value = response
        if (!currentAccount.value.id || !userAccounts.value.some(account => account.id === currentAccount.value.id)) {
          currentAccount.value = response[0]
        }
      }
    }
  }

  /** Switch the current account to the given account ID if it exists in the user's account list */
  function switchCurrentAccount (accountId: number) {
    const account = userAccounts.value.find(account => account.id === accountId)
    if (account) {
      currentAccount.value = account
    }
  }

  async function getPendingApprovalCount (accountId: number, keycloakGuid: string): Promise<void> {
    try {
      const response = await $authApi<{ count: number }>(`/users/${keycloakGuid}/org/${accountId}/notifications`, {
        onResponseError ({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data.message || 'Error retrieving pending approvals.',
            detail: response._data.detail || '',
            category: ConnectErrorCategory.PENDING_APPROVAL_COUNT
          })
        }
      })

      if (response) {
        pendingApprovalCount.value = response.count
      }
    } catch (e) {
      console.error('Error retrieving pending approvals')
      // logFetchError(e, 'Error retrieving pending approvals')
    }
  }

  async function checkAccountStatus () {
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

  async function initAccountStore (): Promise<void> {
    await setAccountInfo() // load user accounts
    await updateAuthUserInfo()
    await setUserName() // set local name refs from auth api fetch result
    await checkAccountStatus() // redirect user if account status is nsf suspended/suspended/pending review
    if (currentAccount.value.id && authUser.value.keycloakGuid) { // check for pending approvals
      await getPendingApprovalCount(currentAccount.value.id, authUser.value.keycloakGuid)
    }
  }

  function $reset () {
    sessionStorage.removeItem('connect-auth-account-store')
    currentAccount.value = {} as ConnectAccount
    userAccounts.value = []
    pendingApprovalCount.value = 0
    errors.value = []
  }

  return {
    currentAccount,
    currentAccountName,
    userAccounts,
    pendingApprovalCount,
    errors,
    userFullName,
    isStaffOrSbcStaff,
    checkAccountStatus,
    updateAuthUserInfo,
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
