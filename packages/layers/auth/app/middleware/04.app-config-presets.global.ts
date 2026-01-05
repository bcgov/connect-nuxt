import { mergeAppConfigPresetOverrides } from '#auth/app/composables/useConnectAppConfigs'
import { useAppConfig } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const appConfig = useAppConfig()

  // Build and assign app.config presets
  appConfig.connect = mergeAppConfigPresetOverrides(
    appConfig.connect as ConnectConfig,
    to.query.preset as ConnectPresetType
  )
})
