// IMPORTANT: This service is meant as an abstraction layer to interact with the cache and queries directly
// IMPORTANT: do not define raw GET requests (with few exceptions) in this file - define the request in the query file
// and abstract here if necessary
import { getCachedOrFetch } from '../helpers'

/**
 * AUTH SERVICE
 *
 * This service acts as an abstraction over the useConnectAuthQuery queries.
 * * USE THIS SERVICE ONLY IF:
 * - You are inside a pinia store and need to "await" data.
 * - You are in a route guard/middleware and need to validate data before entry.
 * - You need to await multiple API calls sequentially (promise.all/setup logic).
 * * DO NOT USE THIS SERVICE IF:
 * - You are inside a Vue Component.
 * - You need to display "isLoading" or "error" states in the UI.
 * - You want automatic background refetching and observer management.
 * * COMPONENT USAGE:
 * Always prefer 'useConnectAuthQuery()' directly in components.
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

  async function verifyAccountName(accountName: string) {
    return await $authApi.raw(`/orgs?validateName=true&name=${encodeURIComponent(accountName)}`)
  }

  return {
    getAuthUserProfile,
    getTermsOfUse,
    getUserAccounts,
    verifyAccountName
  }
}
