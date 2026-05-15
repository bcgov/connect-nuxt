import { createClient } from '@launchdarkly/js-client-sdk'
import type { LDClient, LDFlagSet, LDOptions, LDMultiKindContext } from '@launchdarkly/js-client-sdk'
import { isEqual } from 'es-toolkit'

// Default anonymous context
const anonymousContext: LDMultiKindContext = {
  kind: 'multi',
  org: { key: 'anonymous' },
  user: { key: 'anonymous' }
}

/**
 * Composable for the LaunchDarkly service.
 * Extends the base composable with authenticated user and account context.
 */
export const useConnectLaunchDarkly = () => {
  const ldClient = useState<LDClient | null>('ld-client', () => null)
  const ldFlagSet = useState<LDFlagSet>('ld-flag-set', () => ({}))
  const ldContext = useState<LDMultiKindContext>('ld-context', () => anonymousContext)
  const ldInitialized = useState<boolean>('ld-initialized', () => false)
  const isInitializing = useState<boolean>('ld-is-initializing', () => false)

  function _createLdContext(): LDMultiKindContext {
    const appName = useRuntimeConfig().public.appName
    const { authUser, isAuthenticated } = useConnectAuth()
    const account = useConnectAccountStore().currentAccount

    if (!isAuthenticated.value) {
      return anonymousContext
    }

    // Create user context
    const user = {
      key: authUser.value.keycloakGuid,
      firstName: authUser.value.firstName,
      lastName: authUser.value.lastName,
      email: authUser.value.email,
      roles: authUser.value.roles,
      loginSource: authUser.value.loginSource,
      appSource: appName
    }

    // Default org to user key if no account
    let org: Partial<ConnectAccount & { key: string, appSource: string }> = { key: user.key, appSource: appName }

    // Use account info if available
    if (account.id) {
      org = {
        key: String(account.id),
        accountType: account.accountType,
        accountStatus: account.accountStatus,
        type: account.type,
        label: account.label,
        appSource: appName
      }
    }

    return { kind: 'multi', org, user }
  }

  function _updateLdContext() {
    if (!ldClient.value) {
      return
    }

    const newContext = _createLdContext()
    if (isEqual(ldContext.value, newContext)) {
      return
    }

    ldContext.value = newContext
    ldClient.value.identify(newContext).then(() => {
      ldFlagSet.value = ldClient.value?.allFlags() || {}
    }).catch((error) => {
      console.error('LaunchDarkly: Failed to update context.', error)
    })
  }

  /**
   * Initializes the LaunchDarkly client.
   */
  function _init(): void {
    const rtc = useRuntimeConfig().public

    // Prevent re-initialization
    if (ldInitialized.value || isInitializing.value) {
      return
    }
    // Prevent initialization if missing client ID
    if (!rtc.ldClientId) {
      console.error('LaunchDarkly: ldClientId is not configured.')
      return
    }

    isInitializing.value = true

    ldContext.value = _createLdContext()

    const options: LDOptions = {
      streaming: false,
      useReport: false,
      diagnosticOptOut: true
    }

    try {
      const client = createClient(rtc.ldClientId, ldContext.value, options)

      client.start().then((result) => {
        if (result.status === 'complete') {
          ldInitialized.value = true
          isInitializing.value = false
          ldFlagSet.value = client.allFlags()
          console.info('LaunchDarkly: Initialization complete.')
        } else {
          console.error('LaunchDarkly: Initialization did not complete.', result)
          isInitializing.value = false
        }
      }).catch((error) => {
        console.error('LaunchDarkly: Initialization error.', error)
        isInitializing.value = false
      })

      ldClient.value = client
    } catch (error) {
      console.error('LaunchDarkly: Failed to initialize.', error)
      isInitializing.value = false
    }
  }

  // Initialize only once on the client
  if (!ldInitialized.value && !isInitializing.value && import.meta.client) {
    _init()
  }

  const { isAuthenticated } = useConnectAuth()
  const accountStore = useConnectAccountStore()

  watch(
    [isAuthenticated, () => accountStore.currentAccount],
    () => {
      _updateLdContext()
    },
    { immediate: true }
  )

  /**
   * Returns a flag's value. Can operate in two modes.
   * @param name The name of the feature flag.
   * @param defaultValue The value to use until the flag is loaded.
   * @param mode - 'reactive' (default) returns a ref that updates automatically.
   * 'await' returns a promise that resolves when the client is ready.
   * @returns A readonly ref or a promise resolving to the flag's value.
   */
  function getFeatureFlag<T>(
    name: string,
    defaultValue: T,
    mode: 'await'
  ): Promise<T>
  function getFeatureFlag<T>(
    name: string,
    defaultValue: T,
    mode?: 'reactive'
  ): Readonly<Ref<T>>
  function getFeatureFlag<T>(
    name: string,
    defaultValue?: T,
    mode?: 'reactive'
  ): Readonly<Ref<T | undefined>>
  function getFeatureFlag<T>(
    name: string,
    defaultValue?: T,
    mode: 'reactive' | 'await' = 'reactive'
  ): Readonly<Ref<T | undefined>> | Promise<T | undefined> {
    if (mode === 'await') {
      if (!ldClient.value) {
        return Promise.resolve(defaultValue)
      }
      return ldClient.value.waitForInitialization().then(() =>
        ldClient.value ? ldClient.value.variation(name, defaultValue) : defaultValue
      ).catch((error) => {
        console.error(`LaunchDarkly: Error waiting for client while getting flag "${name}".`, error)
        return defaultValue
      })
    }

    return readonly(computed(() => {
      if (!ldClient.value || !ldInitialized.value || !ldFlagSet.value) {
        return defaultValue
      }
      return ldClient.value.variation(name, defaultValue)
    }))
  }

  /**
   * Returns a flag's value from the locally stored flag set. Can operate in two modes.
   * @param name The name of the feature flag.
   * @param defaultValue The value to use until the flag is loaded.
   * @param mode - 'reactive' (default) returns a ref that updates automatically.
   * 'await' returns a promise that resolves when the client is ready.
   * @returns A readonly ref or a promise resolving to the flag's value.
   */
  async function getStoredFlag<T>(name: string, defaultValue: T, mode: 'await'): Promise<T>
  function getStoredFlag<T>(name: string, defaultValue?: T, mode?: 'reactive'): Readonly<Ref<T>>
  function getStoredFlag<T>(
    name: string,
    defaultValue: T,
    mode: 'reactive' | 'await' = 'reactive'
  ): Readonly<Ref<T>> | Promise<T> {
    if (mode === 'await') {
      if (!ldClient.value) {
        return Promise.resolve(defaultValue)
      }
      return ldClient.value.waitForInitialization().then(() =>
        ldFlagSet.value[name] ?? defaultValue
      ).catch((error) => {
        console.error(`LaunchDarkly: Error waiting for client while getting stored flag "${name}".`, error)
        return defaultValue
      })
    }

    // reactive mode
    return readonly(computed(() => {
      if (!ldInitialized.value || !ldFlagSet.value) {
        return defaultValue
      }
      return ldFlagSet.value[name] ?? defaultValue
    }))
  }

  /**
   * Resets the LaunchDarkly state and closes the client connection.
   */
  const $reset = () => {
    ldInitialized.value = false
    isInitializing.value = false
    ldClient.value?.close()
    ldClient.value = null
    ldFlagSet.value = {}
    ldContext.value = anonymousContext
  }

  return {
    getFeatureFlag,
    getStoredFlag,
    ldInitialized: readonly(ldInitialized),
    ldFlagSet: readonly(ldFlagSet),
    ldClient: readonly(ldClient),
    $reset
  }
}
