export const useAuthApi = () => {
  const { $authApi } = useNuxtApp()
  const queryCache = useQueryCache()

  async function getAuthUserProfile() {
    const query = defineQuery({
      key: ['auth-user-profile'],
      query: () => $authApi<ConnectAuthProfile>('/users/@me', {
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

  const usePatchTermsOfUse = defineMutation(() => {
    const { mutateAsync, ...mutation } = useMutation({
      mutation: (vars: { accepted: boolean, version: string, successCb?: () => Promise<unknown> }) => {
        return $authApi<ConnectAuthProfile>('/users/@me', {
          method: 'PATCH',
          body: {
            istermsaccepted: vars.accepted,
            termsversion: vars.version
          }
        })
      },
      onError: (error) => {
        // TODO: FUTURE - add api error message to modal content - remove console.error
        console.error('ERROR: ', error)
        useConnectTosModals().openPatchTosErrorModal()
      },
      onSuccess: async (_, _vars) => {
        await queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
        if (_vars.successCb) {
          await _vars.successCb()
        }
      }
    })

    return {
      ...mutation,
      patchTermsOfUse: mutateAsync
    }
  })

  return {
    getAuthUserProfile,
    getTermsOfUse,
    usePatchTermsOfUse
  }
}
