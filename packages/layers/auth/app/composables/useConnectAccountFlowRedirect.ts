import type { RouteLocationNormalizedGeneric } from '#vue-router'

export const useConnectAccountFlowRedirect = () => {
  function finalRedirect(route: RouteLocationNormalizedGeneric, manageAccount = false) {
    const { authUser } = useConnectAuth()
    const { userAccounts } = useConnectAccountStore()
    const localePath = useLocalePath()
    const ac = useAppConfig().connect.login
    const externalRedirectUrl = route.query.return as string | undefined
    const internalRedirectUrl = ac.redirect

    const query = { ...route.query }

    if (manageAccount && userAccounts.length !== 1) {
      const isBcscCreate
        = userAccounts.length === 0
          && authUser.value.loginSource === ConnectLoginSource.BCSC

      return isBcscCreate
        ? navigateTo({ path: localePath('/auth/account/create'), query })
        : navigateTo({ path: localePath('/auth/account/select'), query })
    }

    if (externalRedirectUrl) {
      const cleanQuery = { ...query }
      delete cleanQuery.return

      return navigateTo(
        {
          path: appendUrlParam(
            externalRedirectUrl,
            'accountid',
            useConnectAccountStore().currentAccount.id
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
