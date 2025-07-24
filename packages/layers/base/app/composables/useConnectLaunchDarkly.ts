import { initialize } from 'launchdarkly-js-client-sdk'
import type { LDClient, LDFlagSet, LDOptions, LDContext } from 'launchdarkly-js-client-sdk'

// state
// Defined outside of composable, so they are created only once and shared
const ldClient = shallowRef<LDClient | null>(null)
const ldFlagSet = shallowRef<LDFlagSet>({})
const ldInitialized = ref(false)
const isInitializing = ref(false)

/**
 * Initializes the LaunchDarkly client with an anonymous context.
*/
function init(): void {
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

  const ldContext: LDContext = {
    kind: 'user',
    key: 'anonymous',
    anonymous: true,
    appSource: rtc.appName
  }

  const options: LDOptions = {
    streaming: false,
    useReport: false,
    diagnosticOptOut: true
  }

  try {
    ldClient.value = initialize(rtc.ldClientId, ldContext, options)

    ldClient.value.on('initialized', () => {
      ldFlagSet.value = ldClient.value?.allFlags() || {}
      ldInitialized.value = true
      isInitializing.value = false
      console.info('LaunchDarkly: Anonymous initialization complete.')
    })

    ldClient.value.on('error', (error) => {
      console.error('LaunchDarkly: Initialization error.', error)
      isInitializing.value = false
    })
  } catch (error) {
    console.error('LaunchDarkly: Failed to initialize.', error)
    isInitializing.value = false
  }
}

/**
 * Composable for the LaunchDarkly service.
*/
export const useConnectLaunchDarkly = () => {
  // initialize only once
  if (!ldInitialized.value && !isInitializing.value && import.meta.client) {
    init()
  }

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
    defaultValue?: T,
    mode?: 'reactive'
  ): Readonly<Ref<T>>
  function getFeatureFlag<T>(
    name: string,
    defaultValue: T,
    mode: 'reactive' | 'await' = 'reactive'
  ): Readonly<Ref<T>> | Promise<T> {
    if (mode === 'await') {
      if (!ldClient.value) {
        return Promise.resolve(defaultValue)
      }
      return ldClient.value.waitUntilReady()
        .then(() => ldClient.value ? ldClient.value.variation(name, defaultValue) : defaultValue)
        .catch((error) => {
          console.error(`LaunchDarkly: Error waiting for client while getting flag "${name}".`, error)
          return defaultValue
        })
    }

    // reactive mode
    return readonly(computed(() => {
      if (!ldClient.value || !ldInitialized.value) {
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
      return ldClient.value.waitUntilReady()
        .then(() => ldFlagSet.value[name] ?? defaultValue)
        .catch((error) => {
          console.error(`LaunchDarkly: Error waiting for client while getting stored flag "${name}".`, error)
          return defaultValue
        })
    }

    // reactive mode
    return readonly(computed(() => {
      if (!ldInitialized.value) {
        return defaultValue
      }
      return ldFlagSet.value[name] ?? defaultValue
    }))
  }

  // TODO: or do we do this and then everytime the fn is called its required to use await?
  // TODO: returning the computed means we dont need to add LD to middleware
  // async function getStoredFlag(name: string): Promise<unknown> {
  //   await ldClient.value?.waitUntilReady()
  //   return ldFlagSet.value[name]
  // }

  /**
   * Resets the LaunchDarkly state and closes the client connection.
   */
  const $reset = () => {
    ldInitialized.value = false
    isInitializing.value = false
    ldClient.value?.close()
    ldClient.value = null
    ldFlagSet.value = {}
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
