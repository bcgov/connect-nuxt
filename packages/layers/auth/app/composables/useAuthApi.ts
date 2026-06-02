export const useAuthApi = () => {
  const { $authApi } = useNuxtApp()
  const queryCache = useQueryCache()

  /**
   * Creates an account by POSTing the given payload to `/orgs`.
   * @returns Object containing mutation state and `createAccount` function.
   */
  const useCreateAccount = defineMutation(() => {
    const { mutateAsync, ...mutation } = useMutation({
      mutation: (vars: {
        payload: ConnectCreateAccount
        successCb?: (createRes: ConnectAuthProfile) => Promise<unknown>
      }) => {
        return $authApi<ConnectAuthProfile>('/orgs', {
          method: 'POST',
          body: vars.payload
        })
      },
      onError: (error) => {
        // TODO: FUTURE - add api error message to modal content - remove console.error
        console.error('ERROR: ', error)
        useConnectAuthModals().openCreateAccountModal()
      },
      onSuccess: async (_, _vars) => {
        await queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
        if (_vars.successCb) {
          await _vars.successCb(_)
        }
      }
    })

    return {
      ...mutation,
      createAccount: mutateAsync
    }
  })

  /**
   * Updates a users contact by PUTing the given payload to `/users/contacts`.
   * @returns Object containing mutation state and `updateUserContact` function.
   */
  const useUpdateOrCreateUserContact = defineMutation(() => {
    const { mutateAsync, ...mutation } = useMutation({
      mutation: (vars: {
        email: string
        phone: string
        phoneExtension: string | undefined
        method?: 'POST' | 'PUT'
        successCb?: () => Promise<unknown>
        errorCb?: (error: unknown) => Promise<unknown>
      }) => {
        return $authApi<ConnectAuthProfile>('/users/contacts', {
          method: vars.method || 'PUT',
          body: {
            email: vars.email,
            phone: vars.phone,
            phoneExtension: vars.phoneExtension
          }
        })
      },
      onError: async (error, _vars) => {
        // TODO: FUTURE - add api error message to modal content - remove console.error
        console.error('ERROR: ', error)
        await useConnectAuthModals().openUpdateUserContactModal()

        if (_vars.errorCb) {
          await queryCache.invalidateQueries({ key: ['auth-user-profile'], exact: true })
          await _vars.errorCb(error)
        }
      },
      onSuccess: async (_, _vars) => {
        if (_vars.successCb) {
          await _vars.successCb()
        }
      }
    })

    return {
      ...mutation,
      updateOrCreateUserContact: mutateAsync
    }
  })

  return {
    useCreateAccount,
    useUpdateOrCreateUserContact
  }
}
