import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'
import type { AppConfigInput } from 'nuxt/schema'
import type { ConnectPresetOverrides } from '#auth/app/interfaces/connect-presets'

/** app.config override presets: Anything in the base app.config can be overridden here */
export const CONNECT_PRESETS: Record<ConnectPresetType, ConnectPresetOverrides | null> = {
  default: {
    login: {
      idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR]
    }
  },
  colinUser: {
    login: {
      idps: [ConnectIdpHint.BCSC]
    }
  }
}

/**
 * Merge preset overrides into the provided `baseConfig` config.
 * Returns `baseConfig` unchanged if there are no overrides for the preset.
 */
export function mergeAppConfigPresetOverrides(
  baseConfig: ConnectConfig,
  presetName: ConnectPresetType
): AppConfigInput {
  // Get overrides for the requested preset, or default if not found
  const overrides = CONNECT_PRESETS[presetName] ?? CONNECT_PRESETS[ConnectPresetType.DEFAULT]

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
