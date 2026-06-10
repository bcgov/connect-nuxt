// IMPORTANT: Query definitions are for GET requests only - for all other methods define a mutation in the ./mutate file
// https://pinia-colada.esm.dev/guide/queries.html
import { useQuery } from '@pinia/colada'
import type { UseQueryOptions, DefineQueryOptions } from '@pinia/colada'

type QueryOptions<T> = Omit<UseQueryOptions<T>, 'key' | 'query'> & {
  query?: UseQueryOptions<T>['query']
}

type DefineOptions<TData, TError = Error> = Omit<DefineQueryOptions<TData, TError>, 'key' | 'query'> & {
  query?: DefineQueryOptions<TData, TError>['query']
}

const DEFAULT_STALE_TIME = 60000

export const useConnectAuthQuery = () => {
  const { $authApi } = useNuxtApp()
  const { keys } = useConnectAuthQueryKeys()

  function pendingApprovalsOptions(options?: DefineOptions<{ count: number }>) {
    const accountId = useConnectAccountStore().currentAccount?.id
    const keycloakGuid = useConnectAuth().authUser.value?.keycloakGuid
    return defineQueryOptions({
      query: () => $authApi<{ count: number }>(`/users/${keycloakGuid}/org/${accountId}/notifications`),
      staleTime: DEFAULT_STALE_TIME,
      enabled: !!(accountId && keycloakGuid),
      ...options,
      key: keys.pendingApprovals()
    })
  }

  function pendingApprovals(options?: QueryOptions<{ count: number }>) {
    return useQuery(() => pendingApprovalsOptions(options as DefineOptions<{ count: number }>))
  }

  function termsOfUseOptions(options?: DefineOptions<ConnectTermsOfUse>) {
    return defineQueryOptions({
      query: () => $authApi<ConnectTermsOfUse>('/documents/termsofuse'),
      staleTime: DEFAULT_STALE_TIME,
      ...options,
      key: keys.termsOfUse()
    })
  }

  function termsOfUse(options?: QueryOptions<ConnectTermsOfUse>) {
    return useQuery(() => termsOfUseOptions(options as DefineOptions<ConnectTermsOfUse>))
  }

  function userProfileOptions(options?: DefineOptions<ConnectAuthProfile>) {
    return defineQueryOptions({
      query: () => $authApi<ConnectAuthProfile>('/users/@me', { parseResponse: JSON.parse }),
      staleTime: DEFAULT_STALE_TIME,
      ...options,
      key: keys.userProfile()
    })
  }

  function userProfile(options?: QueryOptions<ConnectAuthProfile>) {
    return useQuery(() => userProfileOptions(options as DefineOptions<ConnectAuthProfile>))
  }

  function userSettingsOptions(options?: DefineOptions<ConnectUserSettings[]>) {
    const keycloakGuid = useConnectAuth().authUser.value?.keycloakGuid
    return defineQueryOptions({
      query: () => $authApi<ConnectUserSettings[]>(`/users/${keycloakGuid}/settings`),
      staleTime: DEFAULT_STALE_TIME,
      enabled: !!keycloakGuid,
      ...options,
      key: keys.userSettings()
    })
  }

  function userSettings(options?: QueryOptions<ConnectUserSettings[]>) {
    return useQuery(() => userSettingsOptions(options as DefineOptions<ConnectUserSettings[]>))
  }

  return {
    pendingApprovalsOptions,
    pendingApprovals,
    termsOfUse,
    termsOfUseOptions,
    userProfileOptions,
    userProfile,
    userSettingsOptions,
    userSettings
  }
}
