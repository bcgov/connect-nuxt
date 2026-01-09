import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'
import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig({
  connect: {
    login: {
      redirect: '/',
      idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
      skipAccountRedirect: false,
      idpEnforcement: false
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
  },
  connectOverrides: {
    bcscUser: {
      login: {
        idps: [ConnectIdpHint.BCSC],
        idpEnforcement: true,
        alert: {
          title: 'Welcome to the new Business Registry',
          message: 'To complete the move of your business, sign in or create an account using your BC Services '
            + 'Card below.'
        }
      }
    },
    defaultUser: {
      login: {
        idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
        idpEnforcement: false,
        alert: null
      }
    }
  }
} satisfies AppConfigInput) // validates input shape without losing inference
