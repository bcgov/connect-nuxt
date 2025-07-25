declare module '@nuxt/schema' {
  interface AppConfigInput {
    connect?: {
      header?: {
        localeSelect?: boolean
        whatsNew?: boolean
      }
      footer?: {
        versions?: string[]
      }
    }
  }
}

export {}
