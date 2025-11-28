import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'

export default defineAppConfig({
  connect: {
    login: {
      redirect: '',
      idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
      skipAccountRedirect: false
      // idpEnforcement: 'strict' - future potentially
    },
    logout: {
      redirect: ''
    },
    header: {
      loginMenu: true,
      createAccount: true,
      notifications: true,
      accountOptionsMenu: true
    }
  }
})
