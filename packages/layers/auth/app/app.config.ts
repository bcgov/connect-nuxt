import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig({
  connect: {
    login: {
      redirect: '/',
      idps: ['bcsc', 'bceid', 'idir'],
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
  }
} satisfies AppConfigInput) // validates input shape without losing inference
