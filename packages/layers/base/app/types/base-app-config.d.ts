// import type { CustomAppConfig } from '@nuxt/ui'

// type DeepPartial<T> = T extends object
//   ? { [K in keyof T]?: DeepPartial<T[K]> }
//   : T

declare module 'nuxt/schema' {
  interface AppConfigInput {
    // ui?: DeepPartial<CustomAppConfig['ui']>
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

  interface AppConfig {
    connect: {
      header: {
        localeSelect: boolean
        whatsNew: boolean
      }
      footer: {
        versions: string[]
      }
    }
  }
}

export {}
