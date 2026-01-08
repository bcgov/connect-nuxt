declare module 'nuxt/schema' {
  /** What users can write in app.config.ts */
  interface AppConfigInput {
    connect?: Partial<ConnectConfig>
    connectOverrides?: Record<string, ConnectPresetOverrides | null>
  }

  /** What useAppConfig() returns */
  interface AppConfig {
    connect: ConnectConfig
    connectOverrides?: Record<string, ConnectPresetOverrides | null>
  }

}

export {}
