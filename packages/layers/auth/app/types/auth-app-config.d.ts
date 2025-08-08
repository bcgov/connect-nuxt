declare module '@nuxt/schema' {
  interface AppConfigInput {
    connect?: {
      login?: {
        redirect?: string
        idps?: Array<'bcsc' | 'bceid' | 'idir'>
      },
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
