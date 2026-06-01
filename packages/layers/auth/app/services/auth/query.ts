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

// async function updateAuthUserInfo(): Promise<void> {
//   await $authApi('/users', {
//     method: 'POST',
//     body: { isLogin: true }
//   })
// }

// export const useAuthApi = () => {
//   const { $authApi } = useNuxtApp()
//   const queryCache = useQueryCache()

//   /**
//    * Validates whether an account name is available by sending a request to the AUTH service.
//    * @param {string} accountName - The account name to validate for uniqueness.
//    */
//   function verifyAccountName(accountName: string) {
//     const query = defineQuery({
//       key: ['auth-account-name', accountName],
//       query: () => $authApi.raw(`/orgs?validateName=true&name=${encodeURIComponent(accountName)}`),
//       staleTime: 300000
//     })
//     return query()
//   }

//   /**
//    * Creates an account by POSTing the given payload to `/orgs`.
//    * @returns Object containing mutation state and `createAccount` function.
//    */
//   const useCreateAccount = defineMutation(() => {
//     const { mutateAsync, ...mutation } = useMutation({
//       mutation: (vars: {
//         payload: ConnectCreateAccount
//         successCb?: (createRes: ConnectAuthProfile) => Promise<unknown>
//       }) => {
//         return $authApi<ConnectAuthProfile>('/orgs', {
//           method: 'POST',
//           body: vars.payload
//         })
//       },
//       onError: (error) => {
//         // TODO: FUTURE - add api error message to modal content - remove console.error
//         console.error('ERROR: ', error)
//         useConnectAuthModals().openCreateAccountModal()
//       },
//       onSuccess: async (_, _vars) => {
//         await queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
//         if (_vars.successCb) {
//           await _vars.successCb(_)
//         }
//       }
//     })

//     return {
//       ...mutation,
//       createAccount: mutateAsync
//     }
//   })

//   /**
//    * Updates a users contact by PUTing the given payload to `/users/contacts`.
//    * @returns Object containing mutation state and `updateUserContact` function.
//    */
//   const useUpdateOrCreateUserContact = defineMutation(() => {
//     const { mutateAsync, ...mutation } = useMutation({
//       mutation: (vars: {
//         email: string
//         phone: string
//         phoneExtension: string | undefined
//         method?: 'POST' | 'PUT'
//         successCb?: () => Promise<unknown>
//         errorCb?: (error: unknown) => Promise<unknown>
//       }) => {
//         return $authApi<ConnectAuthProfile>('/users/contacts', {
//           method: vars.method || 'PUT',
//           body: {
//             email: vars.email,
//             phone: vars.phone,
//             phoneExtension: vars.phoneExtension
//           }
//         })
//       },
//       onError: async (error, _vars) => {
//         // TODO: FUTURE - add api error message to modal content - remove console.error
//         console.error('ERROR: ', error)
//         await useConnectAuthModals().openUpdateUserContactModal()

//         if (_vars.errorCb) {
//           await queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
//           await _vars.errorCb(error)
//         }
//       },
//       onSuccess: async (_, _vars) => {
//         if (_vars.successCb) {
//           await _vars.successCb()
//         }
//       }
//     })

//     return {
//       ...mutation,
//       updateOrCreateUserContact: mutateAsync
//     }
//   })

//   const usePatchTermsOfUse = defineMutation(() => {
//     const { mutateAsync, ...mutation } = useMutation({
//       mutation: (vars: { accepted: boolean, version: string, successCb?: () => Promise<unknown> }) => {
//         return $authApi<ConnectAuthProfile>('/users/@me', {
//           method: 'PATCH',
//           body: {
//             istermsaccepted: vars.accepted,
//             termsversion: vars.version
//           }
//         })
//       },
//       onError: (error) => {
//         // TODO: FUTURE - add api error message to modal content - remove console.error
//         console.error('ERROR: ', error)
//         useConnectAuthModals().openPatchTosErrorModal()
//       },
//       onSuccess: async (_, _vars) => {
//         await queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
//         if (_vars.successCb) {
//           await _vars.successCb()
//         }
//       }
//     })

//     return {
//       ...mutation,
//       patchTermsOfUse: mutateAsync
//     }
//   })

//   return {
//     getTermsOfUse,
//     useCreateAccount,
//     usePatchTermsOfUse,
//     useUpdateOrCreateUserContact,
//     verifyAccountName
//   }
// }
