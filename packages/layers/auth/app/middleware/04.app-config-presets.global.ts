import type { ConnectConfig, ConnectPresetName } from '#auth/app/composables/useConnectAppConfigs'
import { mergeAppConfigPresetOverrides } from '#auth/app/composables/useConnectAppConfigs'
import { useAppConfig } from '#imports'

export default defineNuxtRouteMiddleware((to) => {
  const appConfig = useAppConfig()

  // Normalize the query param to lowercase and default to 'default'
  const q = (to.query.preset as string | undefined)?.toLowerCase() ?? ConnectPresetType.DEFAULT

  // Map allowed lowercase query values to the enum
  const presetMap = {
    default: ConnectPresetType.DEFAULT,
    colinuser: ConnectPresetType.COLIN_USER
  } as const

  // Pick the canonical enum value or fallback to DEFAULT
  const presetEnum = presetMap[q as keyof typeof presetMap] ?? ConnectPresetType.DEFAULT

  // If your merge function expects ConnectPresetName (string union), cast via enum value
  const presetName = presetEnum as ConnectPresetName

  // Build and assign app.config presets
  appConfig.connect = mergeAppConfigPresetOverrides(appConfig.connect as ConnectConfig, presetName)
})
