export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, authUser } = useConnectAuth()
  const accountStore = useConnectAccountStore()
  const localePath = useLocalePath()
  const { finalRedirect } = useConnectAccountFlowRedirect()

  const numAccounts = accountStore.userAccounts.length

  if (isAuthenticated.value) {
    if (numAccounts === 1) {
      return finalRedirect(to)
    }

    if (numAccounts === 0 && authUser.value.loginSource === ConnectLoginSource.BCSC) {
      return navigateTo({
        path: localePath('/auth/account/create'),
        query: to.query
      })
    }

    return navigateTo({
      path: localePath('/auth/account/select'),
      query: to.query
    })
  }
})
