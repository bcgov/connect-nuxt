// IMPORTANT: This service is an abstraction layer for non-reactive contexts (stores, middleware, or sequential logic).
// IMPORTANT: Pure GET requests bound to UI components should NOT be defined here;
// define those using query options/composables directly.
import { getCachedOrFetch } from '../helpers'

/**
 * AUTH SERVICE
 *
 * This service provides a way to execute auth requests while maintaining the cache layer
 * outside of the reactive Vue lifecycle.
 *
 * * USE THIS SERVICE ONLY IF:
 * - You are inside a pinia store and need to "await" data.
 * - You are in a route guard/middleware and need to validate data before entry.
 * - You need to await multiple API calls sequentially (promise.all/setup logic).
 *
 * * DO NOT USE THIS SERVICE IF:
 * - You are inside a Vue Component.
 * - You need to display "isLoading" or "error" states in the UI.
 * - You want automatic background refetching and observer management.
 *
 * * COMPONENT USAGE:
 * Always prefer queries or mutations directly in components.
*/

// Example:

// Incorrect Component setup
//
// const service = useConnectAuthService()
// const loading = ref(true)
// const accounts = ref()
// We have to manually manage everything
// onMounted(async () => {
//   try {
//    accounts.value = await service.getUserAccounts()
//   } catch (e) {
//     ...handle error
//   } finally {
//     loading.value = false
//   }
// })

// Correct Component setup
// const query = useConnectAuthQuery()
// One line handles loading, data, reactivity, and caching
// const { data: userSettings, isLoading } = query.getUserSettings()

export const useConnectAuthService = () => {
  const query = useConnectAuthQuery()
  const { $authApi } = useNuxtApp()

  /* GET Requests */

  async function getAuthUserProfile(force = false): Promise<ConnectAuthProfile> {
    const options = query.userProfileOptions()
    return await getCachedOrFetch(options, force)
  }

  async function getTermsOfUse(force = false): Promise<ConnectTermsOfUse> {
    const options = query.termsOfUseOptions()
    return await getCachedOrFetch(options, force)
  }

  async function getUserAccounts(force = false): Promise<ConnectAccount[]> {
    const options = query.userSettingsOptions()
    return await getCachedOrFetch(options, force)
      .then(res => res?.filter(setting => setting.type === UserSettingsType.ACCOUNT)) as ConnectAccount[]
  }

  // Cache exception - do not cache to verify the account name accurately
  async function verifyAccountName(accountName: string) {
    return await $authApi.raw(`/orgs?validateName=true&name=${encodeURIComponent(accountName)}`)
  }

  /* POST, PUT, PATCH, DELETE Requests */

  async function createAccount(payload: ConnectCreateAccount): Promise<ConnectAuthProfile> {
    return $authApi<ConnectAuthProfile>('/orgs', {
      method: 'POST',
      body: payload
    })
  }

  async function updateOrCreateUserContact(
    payload: { email: string, phone: string, phoneExtension: string | undefined },
    method?: 'POST' | 'PUT'
  ): Promise<ConnectAuthProfile> {
    return $authApi<ConnectAuthProfile>('/users/contacts', {
      method: method || 'PUT',
      body: payload
    })
  }

  async function updateTermsOfUse(accepted: boolean, version: string): Promise<ConnectAuthProfile> {
    return await $authApi<ConnectAuthProfile>('/users/@me', {
      method: 'PATCH',
      body: {
        istermsaccepted: accepted,
        termsversion: version
      }
    })
  }

  return {
    /* GET Requests */
    getAuthUserProfile,
    getTermsOfUse,
    getUserAccounts,
    verifyAccountName,
    /* POST, PUT, PATCH, DELETE Requests */
    createAccount,
    updateOrCreateUserContact,
    updateTermsOfUse
  }
}
