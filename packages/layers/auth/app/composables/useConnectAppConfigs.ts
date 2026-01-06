import { useAppConfig } from '#imports'
import type { AppConfigInput } from 'nuxt/schema'
import type { ConnectPresetOverrides } from '#auth/app/interfaces/connect-presets'

/**
 * Merge preset overrides (from app.config.connectOverrides) into the provided baseConfig.
 * If no override for the preset is found, baseConfig is returned unchanged.
 */
export function mergeAppConfigPresetOverrides(
  baseConfig: ConnectConfig,
  presetName: ConnectPresetType
): AppConfigInput {
  const appConfig = useAppConfig() as AppConfigInput & {
    connectOverrides?: Record<string, ConnectPresetOverrides | null>
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
