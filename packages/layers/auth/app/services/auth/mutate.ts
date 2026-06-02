// https://pinia-colada.esm.dev/guide/mutations.html

export const useConnectAuthMutation = () => {
  const { $authApi } = useNuxtApp()
  const { keys } = useConnectAuthQueryKeys()
  const queryCache = useQueryCache()

  const patchTermsOfUse = defineMutation({
    mutation: (vars: {
      accepted: boolean
      version: string
      silent?: boolean
      successCb?: () => Promise<unknown> | unknown
    }) => {
      return $authApi<ConnectAuthProfile>('/users/@me', {
        method: 'PATCH',
        body: {
          istermsaccepted: vars.accepted,
          termsversion: vars.version
        }
      })
    },
    onError: (_, _vars) => {
      if (!_vars.silent) {
        useConnectAuthModals().openPatchTosErrorModal()
      }
    },
    onSuccess: async (_, _vars) => {
      await queryCache.invalidateQueries({ key: keys.userProfile(), exact: true })
      if (_vars.successCb) {
        await _vars.successCb()
      }
    }
  })

  return {
    patchTermsOfUse
  }
}
