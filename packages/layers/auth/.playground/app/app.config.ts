import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'

export default defineAppConfig({
  connectOverrides: {
    bcscOnly: {
      login: {
        idps: [ConnectIdpHint.BCSC],
        idpEnforcement: true
      }
    }
  }
})
