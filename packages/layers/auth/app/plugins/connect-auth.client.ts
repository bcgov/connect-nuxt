import Keycloak from 'keycloak-js'
import { ConnectModalSessionExpired } from '#components'

export default defineNuxtPlugin(async () => {
  const rtc = useRuntimeConfig().public

  // define new keycloak
  const keycloak = new Keycloak({
    url: rtc.idpUrl,
    realm: rtc.idpRealm,
    clientId: rtc.idpClientid
  })

  const tokenRefreshInterval = rtc.tokenRefreshInterval ? Number(rtc.tokenRefreshInterval) : 30000
  const tokenMinValidity = rtc.tokenMinValidity ? Number(rtc.tokenMinValidity) / 1000 : 120
  const sessionInactivityTimeout = rtc.sessionInactivityTimeout ? Number(rtc.sessionInactivityTimeout) : 1800000

  try {
    // default behaviour when keycloak session expires
    // try to update token - log out if token update fails
    // callbacks must be registered before 'init'
    // https://www.keycloak.org/securing-apps/javascript-adapter#_callback_events
    keycloak.onTokenExpired = async () => {
      try {
        console.info('[Auth] Token expired, refreshing token...')
        await keycloak.updateToken(tokenMinValidity)
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

  const { idle } = useIdle(sessionInactivityTimeout)

  // executed when user is authenticated and idle = true
  async function sessionExpired() {
    const overlay = useOverlay()
    const modal = overlay.create(ConnectModalSessionExpired)
    modal.open()
  }

  // refresh token if expiring within <tokenMinValidity> - checks every <tokenRefreshInterval>
  function scheduleRefreshToken() {
    console.info('[Auth] Verifying token validity.')

    setTimeout(async () => {
      if (keycloak.isTokenExpired(tokenMinValidity)) {
        console.info('[Auth] Token set to expire soon. Refreshing token...')
        try {
          await keycloak.updateToken(tokenMinValidity)
          console.info('[Auth] Token refreshed.')
        } catch (error) {
          console.error('[Auth] Failed to refresh token; logging out.', error)
          keycloak.logout() // log user out if token update fails
        }
      }

      scheduleRefreshToken()
    }, tokenRefreshInterval)
  }

  // Watch for changes in authentication and idle state
  // When the user is authenticated and not idle, start the refresh schedule
  // Execute session expiry handling if user authenticated and inactive
  watch(
    [() => keycloak.authenticated, () => idle.value],
    async ([isAuth, isIdle]) => {
      if (isAuth) {
        sessionStorage.removeItem(ConnectAuthStorageKey.CONNECT_SESSION_EXPIRED)
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
      connectAuth: keycloak
    }
  }
})
