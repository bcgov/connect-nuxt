import Keycloak from 'keycloak-js'

export default defineNuxtPlugin(async () => {
  const rtc = useRuntimeConfig().public

  // define new keycloak
  const keycloak = new Keycloak({
    url: rtc.keycloakAuthUrl,
    realm: rtc.keycloakRealm,
    clientId: rtc.keycloakClientId
  })

  try {
    // default behaviour when keycloak session expires
    // try to update token - log out if token update fails
    // callbacks must be registered before 'init' https://www.keycloak.org/securing-apps/javascript-adapter#_callback_events
    keycloak.onTokenExpired = async () => {
      try {
        console.info('[Auth] Token expired, refreshing token...')
        await keycloak.updateToken(minValidity)
        console.info('[Auth] Token refreshed.')
      } catch (error) {
        console.error('[Auth] Failed to refresh token on expiration; logging out.', error)
        keycloak.logout()
      }
    }

    // init keycloak instance
    await keycloak.init({
      onLoad: 'check-sso',
      responseMode: 'query',
      pkceMethod: 'S256'
    })
  } catch (error) {
    console.error('[Auth] Failed to initialize Keycloak adapter: ', error)
  }

  const refreshIntervalTimeout = rtc.tokenRefreshInterval as number
  const minValidity = toValue((rtc.tokenMinValidity as number) / 1000) // convert to seconds
  const idleTimeout = rtc.sessionIdleTimeout as number

  const route = useRoute()
  const { idle } = useIdle(idleTimeout)

  // executed when user is authenticated and idle = true
  async function sessionExpired () {
    if (route.meta.sessionExpiredFn) { // if route meta provided, override default behaviour
      await route.meta.sessionExpiredFn()
    } else { // open expiry modal
      await useConnectModals().openSessionExpiringModal()
    }
  }

  // refresh token if expiring within <minValidity> - checks every <refreshIntervalTimeout>
  function scheduleRefreshToken () {
    console.info('[Auth] Verifying token validity.')

    setTimeout(async () => {
      if (keycloak.isTokenExpired(minValidity)) {
        console.info('[Auth] Token set to expire soon. Refreshing token...')
        try {
          await keycloak.updateToken(minValidity)
          console.info('[Auth] Token refreshed.')
        } catch (error) {
          console.error('[Auth] Failed to refresh token; logging out.', error)
          keycloak.logout() // log user out if token update fails
        }
      }

      scheduleRefreshToken()
    }, refreshIntervalTimeout)
  }

  // Watch for changes in authentication and idle state
  // When the user is authenticated and not idle, start the refresh schedule
  // Execute session expiry handling if user authenticated and inactive
  watch(
    [() => keycloak.authenticated, () => idle.value],
    async ([isAuth, isIdle]) => {
      if (isAuth) {
        sessionStorage.removeItem(ConnectStorageKeys.CONNECT_SESSION_EXPIRED)
        if (!isIdle) {
          console.info('[Auth] Starting token refresh schedule.')
          scheduleRefreshToken()
        } else {
          console.warn('[Auth] User session expired due to inactivity. Starting session expiry process.')
          await sessionExpired()
        }
      }
    },
    { immediate: true }
  )

  return {
    provide: {
      // provide global auth instance
      'connectAuth': keycloak
    }
  }
})