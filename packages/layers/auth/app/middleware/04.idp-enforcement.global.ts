import { useConnectAuth } from '#auth/app/composables/useConnectAuth'
import { withQuery } from 'ufo'
import type { ConnectIdpHint } from '#imports'
import { useAppConfig } from '#imports'
import { ConnectModalInvalidIdp } from '#components'

export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const appConfig = useAppConfig()
  const { authUser, logout } = useConnectAuth()

  // IDP Enforcement Config
  const connectConfig = appConfig.connect as ConnectConfig
  const idpEnforcement = connectConfig?.login?.idpEnforcement
  const allowedIdps = connectConfig?.login?.idps

  // Idp overlay
  const overlay = useOverlay()
  const modal = overlay.create(ConnectModalInvalidIdp)

  /** Show Invalid IDP Modal and Logout on modal close */
  async function showInvalidIdpModal() {
    // Prompt user with invalid IDP modal
    await modal.open({ currentIdp: authUser.value?.loginSource })

    // Logout and Preserve any query param
    const pathWithQuery = withQuery(localePath('/auth/login'), to.query)

    const url = `${window.location.origin}${pathWithQuery}`
    return await logout(url)
  }

  if (idpEnforcement && authUser.value?.loginSource) {
    // User's IDP is not allowed, log them out and redirect to login page
    if (!allowedIdps?.includes(authUser.value?.loginSource.toLowerCase() as unknown as ConnectIdpHint)) {
      showInvalidIdpModal()
    }
  }
})
