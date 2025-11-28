declare module '@nuxt/schema' {
  interface AppConfigInput {
    connect?: {
      login?: {
        redirect?: string
        idps?: ConnectValidIdps
        skipAccountRedirect?: boolean
        // idpEnforcement: 'strict' | 'none' - future potentially
      }
      logout?: {
        redirect?: string
      }
      header?: {
        loginMenu?: boolean
        createAccount?: boolean
        notifications?: boolean
        accountOptionsMenu?: boolean
      }
    }
  }
}

export {}
