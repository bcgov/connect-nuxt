import type { RouteLocationNormalizedGeneric } from '#vue-router'

export const useConnectAccountFlowRedirect = () => {
  function finalRedirect(route: RouteLocationNormalizedGeneric) {
    const localePath = useLocalePath()
    const ac = useAppConfig().connect.login
    const externalRedirectUrl = route.query.return as string | undefined
    const internalRedirectUrl = ac.redirect

    const query = { ...route.query }

    if (query.return) {
      delete query.return
    }

    if (query.allowedIdps) {
      delete query.allowedIdps
    }

    if (externalRedirectUrl) {
      return navigateTo(
        {
          path: appendUrlParam(externalRedirectUrl, 'accountid', useConnectAccountStore().currentAccount.id),
          query
        },
        { external: true }
      )
    } else {
      return navigateTo({
        path: localePath(internalRedirectUrl),
        query
      })
    }
  }

  return {
    finalRedirect
  }
}
