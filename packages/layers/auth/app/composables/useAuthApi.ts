import type { ConnectCreateAccount } from '#auth/app/interfaces/connect-account'

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

  /**
   * Validates whether an account name is available by sending a request to the AUTH service.
   * @param {string} accountName - The account name to validate for uniqueness.
   */
  function verifyAccountName(accountName: string) {
    const query = defineQuery({
      key: ['auth-account-name', accountName],
      query: () => $authApi.raw(`/orgs?validateName=true&name=${encodeURIComponent(accountName)}`),
      staleTime: 300000
    })
    return query()
  }

  /**
   * Creates an account by POSTing the given payload to `/orgs`.
   * @returns Object containing mutation state and `createAccount` function.
   */
  const useCreateAccount = defineMutation(() => {
    const { mutateAsync, ...mutation } = useMutation({
      mutation: (vars: { payload: ConnectCreateAccount, successCb?: () => Promise<unknown> }) => {
        return $authApi<ConnectAuthProfile>('/orgs', {
          method: 'POST',
          body: vars.payload
        })
      },
      onError: (error) => {
        // TODO: FUTURE - add api error message to modal content - remove console.error
        console.error('ERROR: ', error)
        useConnectTosModals().openCreateAccountModal()
      },
      onSuccess: async (_, _vars) => {
        if (_vars.successCb) {
          await _vars.successCb()
        }
      }
    })

    return {
      ...mutation,
      createAccount: mutateAsync
    }
  })

  /**
   * Creates an account by POSTing the given payload to `/orgs`.
   * @returns Object containing mutation state and `createAccount` function.
   */
  const useUpdateUserContact = defineMutation(() => {
    const { mutateAsync, ...mutation } = useMutation({
      mutation: (vars: {
        email: string
        phone: string
        phoneExtension: string | undefined
        successCb?: () => Promise<unknown>
      }) => {
        return $authApi<ConnectAuthProfile>('/users/contacts', {
          method: 'PUT',
          body: {
            email: vars.email,
            phone: vars.phone,
            phoneExtension: vars.phoneExtension
          }
        })
      },
      onError: (error) => {
        // TODO: FUTURE - add api error message to modal content - remove console.error
        console.error('ERROR: ', error)
        useConnectTosModals().openUpdateUserContactModal()
      },
      onSuccess: async (_, _vars) => {
        if (_vars.successCb) {
          await _vars.successCb()
        }
      }
    })

    return {
      ...mutation,
      updateUserContact: mutateAsync
    }
  })

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
    useCreateAccount,
    usePatchTermsOfUse,
    useUpdateUserContact,
    verifyAccountName
  }
}
