import type { CustomAppConfig } from '@nuxt/ui'

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

declare module 'nuxt/schema' {
  /** What users can write in app.config.ts */
  interface AppConfigInput {
    ui?: DeepPartial<CustomAppConfig['ui']>
    connect?: ConnectConfigInput
    connectOverrides?: Record<string, ConnectPresetOverrides | null>
  }

  /** What useAppConfig() returns */
  interface AppConfig {
    connect: ConnectConfig
    connectOverrides?: Record<string, ConnectPresetOverrides | null>
  }

}

export {}
