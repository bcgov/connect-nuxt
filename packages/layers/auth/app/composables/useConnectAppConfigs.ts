import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'
import type { AppConfigInput } from 'nuxt/schema'

export type ConnectPresetName = 'default' | 'colinUser'

/** Overrides for the `connect` subtree, not the full app.config. */
export interface ConnectPreset {
  login?: Partial<{
    redirect: string
    idps: ConnectIdpHint[]
    skipAccountRedirect: boolean
    idpEnforcement?: 'strict' | 'soft'
  }>
  header?: Partial<{
    loginMenu: boolean
    createAccount: boolean
    notifications: boolean
    accountOptionsMenu: boolean
  }>
  logout?: Partial<{
    redirect: string
  }>
}

export interface ConnectConfig {
  login: {
    redirect: string
    idps: ConnectIdpHint[]
    skipAccountRedirect: boolean
    idpEnforcement?: 'strict' | 'soft'
  }
  logout: {
    redirect: string
  }
  header: {
    loginMenu: boolean
    createAccount: boolean
    notifications: boolean
    accountOptionsMenu: boolean
  }
}

/** app.config override presets */
export const CONNECT_PRESETS: Record<ConnectPresetName, ConnectPreset | null> = {
  default: { // Useful for testing and playground where swapping between configurations
    login: {
      redirect: '/',
      idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
      skipAccountRedirect: false
    },
    logout: {
      redirect: ''
    },
    header: {
      loginMenu: true,
      createAccount: true,
      notifications: true,
      accountOptionsMenu: true
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
  presetName: ConnectPresetName
): AppConfigInput {
  const overrides = CONNECT_PRESETS[presetName]

  if (!overrides) {
    // No overrides for this preset → return base unchanged
    return baseConfig as unknown as AppConfigInput
  }

  return {
    ...baseConfig,
    // Apply shallow merge for each subtree when present
    ...(overrides.login
      ? { login: { ...baseConfig.login, ...overrides.login } }
      : { login: baseConfig.login }),
    ...(overrides.header
      ? { header: { ...baseConfig.header, ...overrides.header } }
      : { header: baseConfig.header }),
    logout: baseConfig.logout
  }
}
