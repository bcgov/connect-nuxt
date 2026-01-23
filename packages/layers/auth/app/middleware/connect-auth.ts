export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated } = useConnectAuth()
  const rtc = useRuntimeConfig().public
  const localePath = useLocalePath()
  const authApi = useAuthApi()
  const { finalRedirect } = useConnectAccountFlowRedirect()

  const isLoginPage = to.meta.connectLogin === true
  const isTosPage = to.meta.connectTosPage === true

  if (!isAuthenticated.value && !isLoginPage && !rtc.playwright) {
    const defaultReturn = `${rtc.baseUrl}${to.fullPath.slice(1)}`
    const returnUrl = (to.query.return && String(to.query.return)) || defaultReturn

    return navigateTo(
      {
        path: localePath('/auth/login'),
        query: {
          ...to.query,
          return: returnUrl
        }
      }
    )
  }

  if (isAuthenticated.value) {
    const { data, refresh } = await authApi.getAuthUserProfile()
    await refresh()
    const hasAccepted = data.value?.userTerms.isTermsOfUseAccepted
    if (!hasAccepted && !isTosPage) {
      const query = { ...to.query }
      return navigateTo({ path: localePath('/auth/terms-of-use'), query })
    } else if (hasAccepted && (isTosPage || isLoginPage)) {
      return finalRedirect(to, true)
    }
  }

  if (rtc.playwright) {
    const { $connectAuth } = useNuxtApp()
    const { currentAccount } = storeToRefs(useConnectAccountStore())

    $connectAuth.tokenParsed = {
      firstname: 'TestFirst',
      lastname: 'TestLast',
      name: 'TestFirst TestLast',
      username: 'testUsername',
      email: 'testEmail@test.com',
      sub: 'test',
      loginSource: 'IDIR',
      realm_access: { roles: ['public_user'] }
    }
    $connectAuth.authenticated = true

    if (rtc.playwrightFetchTestAccount) {
      // allows each test to mock the account information with its own data
      await useConnectAccountStore().setAccountInfo()
    } else {
      currentAccount.value = {
        id: 1,
        label: 'Playwright',
        accountStatus: AccountStatus.ACTIVE,
        accountType: AccountType.PREMIUM,
        type: UserSettingsType.ACCOUNT,
        urlorigin: '',
        urlpath: ''
      }
    }
  }
})
