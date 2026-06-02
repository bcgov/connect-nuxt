// https://pinia-colada.esm.dev/guide/mutations.html

export const useConnectAuthMutation = () => {
  const service = useConnectAuthService()
  const { keys } = useConnectAuthQueryKeys()
  const queryCache = useQueryCache()

  const patchTermsOfUse = defineMutation({
    mutation: (vars: {
      accepted: boolean
      version: string
      silent?: boolean
      successCb?: () => Promise<unknown> | unknown
    }) => service.patchTermsOfUse(vars.accepted, vars.version),
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
