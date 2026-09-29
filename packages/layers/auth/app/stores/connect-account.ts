export const useConnectAccountStore = defineStore('connect-auth-account-store', () => {
  const rtc = useRuntimeConfig().public
  const { authUser } = useConnectAuth()
  const service = useConnectAuthService()
  // FUTURE: uncomment when fix is made in auth api - ticket: 33711
  // const queryCache = useQueryCache()
  // const { keys } = useConnectAuthQueryKeys()

  const currentAccount = ref<ConnectAccount>({} as ConnectAccount)
  const userAccounts = ref<ConnectAccount[]>([])
  const currentAccountName = computed<string>(() => currentAccount.value?.label || '')
  const userEmail = ref<string>('')
  const userFirstName = ref<string>(authUser.value?.firstName || '-')
  const userLastName = ref<string>(authUser.value?.lastName || '')
  const userFullName = computed(() => `${userFirstName.value} ${userLastName.value}`)

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

  /** Set user name and default email from profile */
  async function syncUserProfile() {
    const profile = await service.updateAuthUserProfile().catch(() => undefined)

    if (!profile) {
      return
    }

    const { firstname, lastname, contacts } = profile

    if (firstname && lastname) {
      userFirstName.value = firstname
      userLastName.value = lastname
    } else {
      userFirstName.value = authUser.value?.firstName || '-'
      userLastName.value = authUser.value?.lastName || ''
    }

    // set email from the user's existing contact if available
    const contactEmail = contacts?.[0]?.email
    if (contactEmail) {
      userEmail.value = contactEmail
    }

    // add user profile response to cache // FUTURE: uncomment when fix is made in auth api - ticket: 33711
    // queryCache.setQueryData(keys.userProfile(), profile)
  }

  /** Set the user account list and current account */
  async function loadUserAccounts(force = false): Promise<void> {
    const accounts = await service.getUserAccounts(force).catch(() => undefined)
    if (accounts && accounts[0]) {
      userAccounts.value = accounts
      // Always resync from the fresh list so a persisted currentAccount never keeps a stale status.
      currentAccount.value = accounts.find(account => account.id === currentAccount.value.id) ?? accounts[0]
    }
  }

  /**
   * Sets `account` as current and navigates to its own info/settings page. Used both when a
   * user clicks a visibly NSF/overdue account, and when a consumer's own backend rejects an
   * action (e.g. payment redemption) for an account that wasn't flagged yet on the client.
   */
  function redirectToAccountInfo(account: ConnectAccount) {
    currentAccount.value = account
    return navigateTo(`${account.urlorigin}${account.urlpath}`, { external: true })
  }

  /** Switch the current account to the given account ID if it exists in the user's account list */
  function switchCurrentAccount(accountId: number) {
    const account = userAccounts.value.find(account => account.id === accountId)
    if (account) {
      currentAccount.value = account
      return checkAccountStatus()
    }
  }

  function checkAccountStatus() {
    const status = currentAccount.value?.accountStatus
    if ([AccountStatus.SUSPENDED, AccountStatus.NSF_SUSPENDED].includes(status)) {
      // Plain SUSPENDED has no self-serve resolution anywhere, so only the base paths are
      // exempt. NSF_SUSPENDED additionally owns its own handling on the account selector and
      // anywhere in a pay-link flow (dynamic /pay/{token}/... routes).
      const path = useRoute().path
      const endPath = path.split('/').pop() as string
      const isNsfException = status === AccountStatus.NSF_SUSPENDED
        && (path.includes('/pay/') || ['select', 'create'].includes(endPath))
      const isAllowedPath = ['return-cc-payment', 'signout'].includes(endPath) || isNsfException
      if (!isAllowedPath) {
        // URL not allowed so redirect
        const redirectUrl = `${rtc.authWebUrl}account-freeze`
        // TODO: should probably change this to check 'appName' when auth starts using the core layer
        const external = rtc.authWebUrl !== rtc.baseUrl
        return navigateTo(redirectUrl, { external })
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
        return navigateTo(redirectUrl, { external })
      }
    }
  }

  async function initAccountStore() {
    try {
      await loadUserAccounts()

      if (currentAccount.value.id) {
        return checkAccountStatus()
      }
    } catch (e) {
      logFetchError(e, '[Account Store] - Failed to load user acccounts.')
    }
  }

  function $reset() {
    sessionStorage.removeItem('connect-auth-account-store')
    currentAccount.value = {} as ConnectAccount
    userAccounts.value = []
    userFirstName.value = authUser.value?.firstName || '-'
    userLastName.value = authUser.value?.lastName || ''
    userEmail.value = ''
  }

  return {
    checkAccountStatus,
    currentAccount,
    currentAccountName,
    hasRoles,
    initAccountStore,
    isCurrentAccount,
    loadUserAccounts,
    redirectToAccountInfo,
    syncUserProfile,
    switchCurrentAccount,
    userAccounts,
    userFullName,
    userEmail,
    $reset
  }
},
{ persist: true } // persist in session storage
)
