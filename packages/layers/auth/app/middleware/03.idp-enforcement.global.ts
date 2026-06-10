import { withQuery } from 'ufo'
import { ConnectModalInvalidIdp } from '#components'

export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const appConfig = useAppConfig()
  const { authUser } = useConnectAuth()

  // IDP Enforcement Config
  const connectConfig = appConfig.connect as ConnectConfig
  const idpEnforcement = connectConfig?.login?.idpEnforcement
  const allowedIdps = connectConfig?.login?.idps

  if (idpEnforcement && authUser.value?.loginSource) {
    // User's IDP is not allowed, display idp enforcement modal
    if (!allowedIdps?.includes(authUser.value?.loginSource.toLowerCase() as unknown as ConnectIdpHint)) {
      // Pass redirect url to preserve any query params
      const pathWithQuery = withQuery(localePath('/auth/login'), to.query)
      const url = `${window.location.origin}${pathWithQuery}`

      const overlay = useOverlay()
      const modal = overlay.create(ConnectModalInvalidIdp)

      modal.open({
        currentIdp: authUser.value?.loginSource,
        redirectUrl: url
      })
    }
  }
})
