declare module '@nuxt/schema' {
  interface AppConfigInput {
    connect?: {
      login?: {
        redirectPath?: string
        idps?: Array<'bcsc' | 'bceid' | 'idir'>
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
