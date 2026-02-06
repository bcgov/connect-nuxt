import type { RouteLocationNormalizedGeneric } from '#vue-router'

export const useConnectAccountFlowRedirect = () => {
  function finalRedirect(route: RouteLocationNormalizedGeneric, manageAccount = false) {
    const { authUser } = useConnectAuth()
    const { currentAccount, userAccounts } = useConnectAccountStore()
    const localePath = useLocalePath()
    const ac = useAppConfig().connect.login
    const externalRedirectUrl = route.query.return as string | undefined
    const internalRedirectUrl = ac.redirect
    const query = { ...route.query }

    const bypassAccounts = userAccounts.length === 1 && !query.populate
    const isNonStaffAccount = ![AccountType.STAFF, AccountType.SBC_STAFF].includes(currentAccount.accountType)
    const createOrSelectAccount = manageAccount && isNonStaffAccount && !bypassAccounts

    if (createOrSelectAccount) {
      const isBcscUserWithNoAccounts = (!userAccounts.length || userAccounts.length === 0)
        && authUser.value.loginSource === ConnectLoginSource.BCSC
      const redirectPath = isBcscUserWithNoAccounts ? '/auth/account/create' : '/auth/account/select'

      return navigateTo({ path: localePath(redirectPath), query })
    }

    if (externalRedirectUrl) {
      const cleanQuery = { ...query }
      delete cleanQuery.return

      return navigateTo(
        {
          path: appendUrlParam(
            externalRedirectUrl,
            'accountid',
            currentAccount.id
          ),
          query: cleanQuery
        },
        { external: true }
      )
    }

    return navigateTo({
      path: localePath(internalRedirectUrl),
      query
    })
  }

  return {
    finalRedirect
  }
}
