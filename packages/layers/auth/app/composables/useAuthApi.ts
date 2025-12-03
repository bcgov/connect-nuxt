// import type { UseQueryReturn } from '@pinia/colada'
import { useQueryCache, defineQuery } from '@pinia/colada'

export const useAuthApi = () => {
  const { $authApi } = useNuxtApp()
  const queryCache = useQueryCache()

  async function getAuthUserProfile() {
    const query = defineQuery({
      key: ['auth-user-profile'],
      query: () => $authApi<ConnectAuthProfile>('users/@me', {
        parseResponse: JSON.parse
      }),
      staleTime: 300000
    })
    return query()
  }

  async function getTermsOfUse() {
    const query = defineQuery({
      key: ['auth-terms-of-use'],
      query: () => $authApi<ConnectTermsOfUse>('/documents/termsofuse'),
      staleTime: 300000
    })
    return query()
  }

  async function patchTermsOfUse(version: string) {
    const res = await $authApi<ConnectAuthProfile>('/users/@me', {
      method: 'PATCH',
      body: {
        istermsaccepted: true,
        termsversion: version
      }
    })
    queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
    return res
  }

  return {
    getAuthUserProfile,
    getTermsOfUse,
    patchTermsOfUse
  }
}
