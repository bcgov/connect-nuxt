export const useConnectAuth = () => {
  const { $connectAuth } = useNuxtApp()
  const rtc = useRuntimeConfig().public

  /**
   * Logs the user in using the idpHint 'bcsc', 'idir' or 'bceid' and an optional redirect URL.
   * @param idpHint - The identity provider hint to use for login.
   * @param redirect - An optional URL to redirect to after login. Defaults to location.origin + the current locale
   * @returns A promise that resolves when login is complete.
   */
  function login(idpHint: ConnectIdpHint, redirect?: string): Promise<void> {
    const loginRedirectUrl = sessionStorage.getItem(ConnectAuthStorageKey.LOGIN_REDIRECT_URL)
    const redirectUri = redirect ?? loginRedirectUrl ?? window.location.href

    return $connectAuth.login(
      {
        idpHint,
        redirectUri
      }
    )
  }

  /**
   * Logs the user out with an optional redirect URL.
   * @param redirect - An optional URL to redirect to after logout. Defaults to location.origin + the current locale
   * @returns A promise that resolves when logout is complete.
   */
  function logout(redirect?: string): Promise<void> {
    const siteminderUrl = rtc.siteminderLogoutUrl
    const logoutRedirectUrl = sessionStorage.getItem(ConnectAuthStorageKey.LOGOUT_REDIRECT_URL)
    let redirectUri = redirect ?? logoutRedirectUrl ?? window.location.href

    if (siteminderUrl) {
      redirectUri = `${siteminderUrl}?returl=${redirectUri.replace(/(https?:\/\/)|(\/)+/g, '$1$2')}&retnow=1`
    }

    // resetPiniaStores()
    return $connectAuth.logout({
      redirectUri
    })
  }

  const isAuthenticated = computed<boolean | undefined>(() => {
    if (!$connectAuth) {
      return false
    }
    return $connectAuth.authenticated
  })

  const authUser = computed<ConnectAuthUser>(() => {
    if ($connectAuth && $connectAuth.tokenParsed) {
      return {
        firstName: $connectAuth.tokenParsed.firstname,
        lastName: $connectAuth.tokenParsed.lastname,
        fullName: $connectAuth.tokenParsed.name,
        userName: $connectAuth.tokenParsed.username,
        email: $connectAuth.tokenParsed.email,
        keycloakGuid: $connectAuth.tokenParsed.sub || '',
        loginSource: $connectAuth.tokenParsed.loginSource,
        roles: $connectAuth.tokenParsed.realm_access?.roles || []
      }
    }
    return {} as ConnectAuthUser
  })

  /**
   * Retrieves the current session token, with an optional force refresh.
   * @param forceRefresh - A boolean to force a token refresh.
   * @returns The session token or undefined if the token can't be retrieved.
   */
  async function getToken(forceRefresh = false): Promise<string | undefined> {
    const minValidity = forceRefresh ? -1 : 30
    return await $connectAuth
      .updateToken(minValidity)
      .then((_refreshed) => {
        return $connectAuth.token
      })
      .catch((error) => {
        console.error(`Failed to get session token: ${error}`)
        return undefined
      })
  }

  function setLoginRedirectUrl(url: string) {
    sessionStorage.setItem(ConnectAuthStorageKey.LOGIN_REDIRECT_URL, url)
  }

  function setLogoutRedirectUrl(url: string) {
    sessionStorage.setItem(ConnectAuthStorageKey.LOGOUT_REDIRECT_URL, url)
  }

  function clearLoginRedirectUrl() {
    sessionStorage.removeItem(ConnectAuthStorageKey.LOGIN_REDIRECT_URL)
  }

  function clearLogoutRedirectUrl() {
    sessionStorage.removeItem(ConnectAuthStorageKey.LOGOUT_REDIRECT_URL)
  }

  return {
    login,
    logout,
    getToken,
    clearLoginRedirectUrl,
    clearLogoutRedirectUrl,
    setLoginRedirectUrl,
    setLogoutRedirectUrl,
    isAuthenticated,
    authUser
  }
}
