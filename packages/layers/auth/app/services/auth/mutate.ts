// https://pinia-colada.esm.dev/guide/mutations.html

export const useConnectAuthMutation = () => {
  const service = useConnectAuthService()
  const { keys } = useConnectAuthQueryKeys()
  const queryCache = useQueryCache()

  /**
   * Creates an account by POSTing the given payload to `/orgs`.
   * @returns Object containing mutation state and `createAccount` function.
   */
  const createAccount = defineMutation({
    mutation: (vars: {
      payload: ConnectCreateAccount
      silent?: boolean
      successCb?: (createRes: ConnectAuthProfile) => Promise<unknown>
    }) => service.createAccount(vars.payload),
    onError: (_, _vars) => {
      if (!_vars.silent) {
        useConnectAuthModals().openCreateAccountModal()
      }
    },
    onSuccess: async (_, _vars) => {
      await queryCache.invalidateQueries({ key: keys.userSettings(), exact: true })
      if (_vars.successCb) {
        await _vars.successCb(_)
      }
    }
  })

  /**
   * Updates a users contact by PUTing the given payload to `/users/contacts`.
   * @returns Object containing mutation state and `updateUserContact` function.
   */
  const updateOrCreateUserContact = defineMutation({
    mutation: (vars: {
      payload: { email: string, phone: string, phoneExtension: string | undefined }
      method?: 'POST' | 'PUT'
      silent?: boolean
      successCb?: () => Promise<unknown> | unknown
      errorCb?: (error: unknown) => Promise<unknown> | unknown
    }) => service.updateOrCreateUserContact(vars.payload, vars.method),
    onError: async (error, _vars) => {
      if (!_vars.silent) {
        useConnectAuthModals().openUpdateUserContactModal()
      }
      if (_vars.errorCb) {
        await _vars.errorCb(error)
      }
    },
    onSuccess: async (_, _vars) => {
      await queryCache.invalidateQueries({ key: keys.userProfile(), exact: true })
      if (_vars.successCb) {
        await _vars.successCb()
      }
    }
  })

  const updateTermsOfUse = defineMutation({
    mutation: (vars: {
      payload: { accepted: boolean, version: string }
      silent?: boolean
      successCb?: () => Promise<unknown> | unknown
    }) => service.updateTermsOfUse(vars.payload),
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
    createAccount,
    updateOrCreateUserContact,
    updateTermsOfUse
  }
}
