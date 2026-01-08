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
        idpEnforcement: true
      }
    },
    defaultUser: {
      login: {
        idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
        idpEnforcement: false
      }
    }
  }
} satisfies AppConfigInput) // validates input shape without losing inference
