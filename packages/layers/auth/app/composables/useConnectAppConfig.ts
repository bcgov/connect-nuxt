/* eslint-disable @typescript-eslint/no-explicit-any */
export const useConnectAppConfig = () => {
  /**
   * Merge preset overrides (from app.config.connectOverrides) into the provided baseConfig.
   * If no override for the preset is found, baseConfig is returned unchanged.
   */
  function mergeAppConfigOverrides(
    baseConfig: ConnectConfig,
    presetName: string
  ): ConnectConfig {
    const appConfig = useAppConfig()
    const overrides = (appConfig.connectOverrides as Record<string, any>)?.[presetName] ?? null

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
