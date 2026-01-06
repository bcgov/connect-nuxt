import { useConnectAuth } from '#auth/app/composables/useConnectAuth'
import type { ConnectIdpHint } from '#imports'
import { useAppConfig } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const appConfig = useAppConfig()
  const { authUser, logout } = useConnectAuth()

  const connectConfig = appConfig.connect as ConnectConfig
  const idpEnforcement = connectConfig?.login?.idpEnforcement
  const allowedIdps = connectConfig?.login?.idps

  if (idpEnforcement && authUser.value?.loginSource) {
    // User's IDP is not allowed, log them out and redirect to login page
    if (!allowedIdps?.includes(authUser.value?.loginSource.toLowerCase() as unknown as ConnectIdpHint)) {
      // Preserve any preset query param
      const presetParam = to.query.preset ? `?preset=${to.query.preset}` : ''
      const url = `${window.location.origin}${localePath('/auth/login')}${presetParam}`
      return await logout(url)
    }
  }
})
