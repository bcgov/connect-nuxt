import { useAppConfig } from '#imports'
import type { AppConfig, AppConfigInput } from 'nuxt/schema'

export const useConnectAppConfig = () => {
  /**
   * Merge preset overrides (from app.config.connectOverrides) into the provided baseConfig.
   * If no override for the preset is found, baseConfig is returned unchanged.
   */
  function mergeAppConfigOverrides(
    baseConfig: ConnectConfig,
    presetName: ConnectPresetType
  ): ConnectConfig {
    const appConfig = useAppConfig() as AppConfig & {
      connectOverrides?: Record<string, AppConfigInput | null>
    }

    const overrides = appConfig.connectOverrides?.[presetName] ?? null

    return {
      ...baseConfig,
      // Apply shallow merge for each subtree when present
      ...(overrides?.login
        ? { login: { ...baseConfig.login, ...overrides?.login } }
        : { login: baseConfig.login }),
      ...(overrides?.header
        ? { header: { ...baseConfig.header, ...overrides?.header } }
        : { header: baseConfig.header }),
      logout: baseConfig.logout
    }
  }

  return {
    mergeAppConfigOverrides
  }
}
