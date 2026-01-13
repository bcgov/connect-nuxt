export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated } = useConnectAuth()
  const rtc = useRuntimeConfig().public
  const localePath = useLocalePath()
  const authApi = useAuthApi()
  const { finalRedirect } = useConnectAccountFlowRedirect()

  if (!isAuthenticated.value && !rtc.playwright) {
    return navigateTo({
      path: localePath('/auth/login'),
      query: {
        // include preset when present
        ...(to.query.preset ? { preset: String(to.query.preset) } : {}),
        return: `${rtc.baseUrl}${to.fullPath.slice(1)}`
      }
    })
  }

  if (isAuthenticated.value) {
    const { data, refresh } = await authApi.getAuthUserProfile()
    await refresh()
    const hasAccepted = data.value?.userTerms.isTermsOfUseAccepted
    const isTosPage = to.meta.connectTosPage === true
    if (!hasAccepted && !isTosPage) {
      const query = { ...to.query }
      return navigateTo({ path: localePath('/auth/terms-of-use'), query })
    } else if (hasAccepted && isTosPage) {
      return finalRedirect(to)
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
})
