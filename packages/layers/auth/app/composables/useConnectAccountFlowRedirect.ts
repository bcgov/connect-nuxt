export const useConnectAccountFlowRedirect = () => {
  const route = useRoute()
  const localePath = useLocalePath()
  const ac = useAppConfig().connect.login
  const externalRedirectUrl = route.query.return as string | undefined
  const internalRedirectUrl = ac.redirect

  function finalRedirect() {
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
