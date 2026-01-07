import { useAppConfig } from '#imports'
import { useConnectAppConfig } from '#auth/app/composables/useConnectAppConfig'

export default defineNuxtRouteMiddleware((to) => {
  const appConfig = useAppConfig()
  const { mergeAppConfigOverrides } = useConnectAppConfig()

  // Build and assign app.config presets
  appConfig.connect = mergeAppConfigOverrides(
    appConfig.connect as ConnectConfig,
    to.query.preset as ConnectPresetType
  )
})
