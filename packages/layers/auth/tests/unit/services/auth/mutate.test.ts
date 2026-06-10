/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'

const mockService = {
  createAccount: vi.fn(),
  updateOrCreateUserContact: vi.fn(),
  updateTermsOfUse: vi.fn()
}
mockNuxtImport('useConnectAuthService', () => () => mockService)

const mockKeys = {
  userProfile: vi.fn(() => ['connect', 'auth', 'user-profile']),
  userSettings: vi.fn(() => ['connect', 'auth', 'user-settings'])
}
mockNuxtImport('useConnectAuthQueryKeys', () => () => ({ keys: mockKeys }))

const mockQueryCache = {
  invalidateQueries: vi.fn()
}
mockNuxtImport('useQueryCache', () => () => mockQueryCache)

const mockModals = {
  openCreateAccountModal: vi.fn(),
  openUpdateUserContactModal: vi.fn(),
  openPatchTosErrorModal: vi.fn()
}
mockNuxtImport('useConnectAuthModals', () => () => mockModals)

describe('useConnectAuthMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createAccount', () => {
    it('should call service method, invalidate query and trigger success callback', async () => {
      const { createAccount } = useConnectAuthMutation()
      const payload = { name: 'New Account' } as any
      const successCb = vi.fn()
      const mockResult = { id: '1234' }

      mockService.createAccount.mockResolvedValue(mockResult)

      createAccount().mutate({ payload, successCb })
      await flushPromises()

      expect(mockService.createAccount).toHaveBeenCalledWith(payload)
      expect(mockQueryCache.invalidateQueries).toHaveBeenCalledWith({
        key: mockKeys.userSettings(),
        exact: true
      })
      expect(successCb).toHaveBeenCalledWith(mockResult)
    })

    it('should handle errors and open or hide modal with silent option', async () => {
      const { createAccount } = useConnectAuthMutation()
      mockService.createAccount.mockRejectedValue(new Error('500 Error'))

      createAccount().mutate({ payload: {} as any, silent: true })
      await flushPromises()

      expect(mockModals.openCreateAccountModal).not.toHaveBeenCalled()

      createAccount().mutate({ payload: {} as any, silent: false })
      await flushPromises()

      expect(mockModals.openCreateAccountModal).toHaveBeenCalledOnce()
    })
  })

  describe('updateOrCreateUserContact', () => {
    it('should call service method, invalidate query and trigger success callback', async () => {
      const { updateOrCreateUserContact } = useConnectAuthMutation()
      const payload = { email: 'a@b.com', phone: '123', phoneExtension: undefined }
      const successCb = vi.fn()
      const mockResult = { success: true }

      mockService.updateOrCreateUserContact.mockResolvedValue(mockResult)

      updateOrCreateUserContact().mutate({ payload, method: 'POST', successCb })
      await flushPromises()

      expect(mockService.updateOrCreateUserContact).toHaveBeenCalledWith(payload, 'POST')
      expect(mockQueryCache.invalidateQueries).toHaveBeenCalledWith({
        key: mockKeys.userProfile(),
        exact: true
      })
      expect(successCb).toHaveBeenCalledOnce()
    })

    it('should handle errors, open or hide modal with silent option and trigger error callback', async () => {
      const { updateOrCreateUserContact } = useConnectAuthMutation()
      const errorCb = vi.fn()
      const testError = new Error('500 Error')

      mockService.updateOrCreateUserContact.mockRejectedValue(testError)

      updateOrCreateUserContact().mutate({ payload: {} as any, errorCb, silent: true })
      await flushPromises()

      expect(mockModals.openUpdateUserContactModal).not.toHaveBeenCalled()
      expect(errorCb).toHaveBeenCalledWith(testError)

      updateOrCreateUserContact().mutate({ payload: {} as any, errorCb, silent: false })
      await flushPromises()

      expect(mockModals.openUpdateUserContactModal).toHaveBeenCalledOnce()
      expect(errorCb).toHaveBeenCalledWith(testError)
    })
  })

  describe('updateTermsOfUse', () => {
    it('should call service method, invalidate query and trigger success callback', async () => {
      const { updateTermsOfUse } = useConnectAuthMutation()
      const successCb = vi.fn()

      mockService.updateTermsOfUse.mockResolvedValue({ success: true })

      updateTermsOfUse().mutate({ payload: { accepted: true, version: '2' }, successCb })
      await flushPromises()

      expect(mockService.updateTermsOfUse).toHaveBeenCalledWith({ accepted: true, version: '2' })
      expect(mockQueryCache.invalidateQueries).toHaveBeenCalledWith({
        key: mockKeys.userProfile(),
        exact: true
      })
      expect(successCb).toHaveBeenCalledOnce()
    })

    it('should handle errors and open or hide modal with silent option', async () => {
      const { updateTermsOfUse } = useConnectAuthMutation()
      const testError = new Error('500 Error')

      mockService.updateTermsOfUse.mockRejectedValue(testError)

      updateTermsOfUse().mutate({ payload: { accepted: true, version: '2' }, silent: true })
      await flushPromises()

      expect(mockModals.openPatchTosErrorModal).not.toHaveBeenCalled()

      updateTermsOfUse().mutate({ payload: { accepted: true, version: '2' }, silent: false })
      await flushPromises()

      expect(mockModals.openPatchTosErrorModal).toHaveBeenCalledOnce()
    })
  })
})
