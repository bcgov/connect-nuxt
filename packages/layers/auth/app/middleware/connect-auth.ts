export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useConnectAuth()
  const rtc = useRuntimeConfig().public
  const localePath = useLocalePath()

  if (!isAuthenticated.value && !rtc.playwright) {
    return navigateTo(localePath(`/auth/login?return=${rtc.baseUrl}${to.fullPath.slice(1)}`))
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
