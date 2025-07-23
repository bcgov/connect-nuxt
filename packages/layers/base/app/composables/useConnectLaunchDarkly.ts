import { initialize } from 'launchdarkly-js-client-sdk'
import type { LDClient, LDFlagSet, LDOptions, LDMultiKindContext } from 'launchdarkly-js-client-sdk'

// --- State ---
// Defined in the module scope, so they are created only once and shared across the app.
const ldClient = ref<LDClient | null>(null)
const ldContext = ref<LDMultiKindContext>({
  kind: 'multi',
  org: { key: 'anonymous' },
  user: { key: 'anonymous' }
})
const ldFlagSet = ref<LDFlagSet>({})
const ldInitialized = ref(false)
const isInitializing = ref(false)

// --- Private Helper Functions ---

/**
 * Builds the context object required by LaunchDarkly.
 * This function must be called from within a composable context.
 */
const createLdContext = (): LDMultiKindContext => {
  const keycloak = useKeycloak()
  const accountStore = useConnectAccountStore()
  const { public: rtc } = useRuntimeConfig()

  // Create user context
  const user = {
    key: keycloak.kcUser.keycloakGuid,
    firstName: keycloak.kcUser.firstName,
    lastName: keycloak.kcUser.lastName,
    email: keycloak.kcUser.email,
    roles: keycloak.kcUser.roles,
    loginSource: keycloak.kcUser.loginSource,
    appSource: rtc.appName
  }

  // Default org to user key if no account is active
  let org: Record<string, any> = { key: user.key, appSource: rtc.appName }

  // Use account info if available
  if (accountStore.currentAccount.id) {
    org = {
      key: accountStore.currentAccount.id,
      accountType: accountStore.currentAccount.accountType,
      accountStatus: accountStore.currentAccount.accountStatus,
      type: accountStore.currentAccount.type,
      label: accountStore.currentAccount.label,
      appSource: rtc.appName
    }
  }

  return { kind: 'multi', org, user }
}

/**
 * Identifies the user to LaunchDarkly with the latest context.
 */
const updateUserContext = () => {
  if (!ldClient.value) {
    return
  }
  const newContext = createLdContext()
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
const init = () => {
  const keycloak = useKeycloak()
  const { public: rtc } = useRuntimeConfig()

  // Prevent re-initialization
  if (ldInitialized.value || isInitializing.value) {
    return
  }
  // Guard against running without required info
  if (!keycloak.isAuthenticated || !keycloak.kcUser?.keycloakGuid || !rtc.ldClientId) {
    return
  }

  isInitializing.value = true
  ldContext.value = createLdContext()
  const options: LDOptions = {
    streaming: false,
    useReport: false,
    diagnosticOptOut: true
  }

  try {
    ldClient.value = initialize(rtc.ldClientId, ldContext.value, options)

    ldClient.value.on('initialized', () => {
      ldFlagSet.value = ldClient.value?.allFlags() || {}
      ldInitialized.value = true
      isInitializing.value = false
      console.info('LaunchDarkly: Initialization complete.')
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

// A guard to ensure the watchers are only set up once.
let watchersInitialized = false

/**
 * Composable for interacting with the LaunchDarkly service.
 */
export const useLaunchdarkly = () => {
  // --- Reactive Triggers ---
  // This block runs every time the composable is used, but the guard
  // prevents the watchers from being duplicated across components.
  if (!watchersInitialized && process.client) {
    const keycloak = useKeycloak()
    const accountStore = useConnectAccountStore()

    // Initialize or update context when authentication state changes.
    watch(() => keycloak.isAuthenticated, (isAuthenticated) => {
      if (isAuthenticated) {
        ldInitialized.value ? updateUserContext() : init()
      }
    }, { immediate: true }) // `immediate` ensures this runs on initial app load.

    // Update context when the user's account changes.
    watch(() => accountStore.currentAccount.id, (accountId) => {
      if (accountId && ldInitialized.value) {
        updateUserContext()
      }
    })

    watchersInitialized = true
  }

  // --- Public API ---

  /**
   * Gets the variation of a feature flag. This may trigger a network request.
   * @param name The name of the feature flag.
   * @returns The value of the flag, or null if not available.
   */
  const getFeatureFlag = (name: string): any => {
    return ldClient.value ? ldClient.value.variation(name) : null
  }

  /**
   * Gets a flag value from the locally stored flag set without a network request.
   * @param name The name of the feature flag.
   * @returns The value of the flag, or undefined if not available.
   */
  const getStoredFlag = (name: string): any => {
    if (!ldInitialized.value) {
      console.warn('LaunchDarkly: Accessing stored flag before initialization.')
    }
    return ldFlagSet.value[name]
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
  }

  return {
    getFeatureFlag,
    getStoredFlag,
    ldInitialized: readonly(ldInitialized),
    ldFlagSet: readonly(ldFlagSet),
    $reset
  }
}
