import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockAuthApi = vi.fn()
mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $authApi: mockAuthApi
  })
})

const mockOpenErrorModal = vi.fn()
mockNuxtImport('useConnectTosModals', () => {
  return () => ({
    openPatchTosErrorModal: mockOpenErrorModal
  })
})

const mockInvalidateQueries = vi.fn()
vi.mock('@pinia/colada', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual as object,
    useQueryCache: () => ({ invalidateQueries: mockInvalidateQueries })
  }
})

describe('useAuthApi', () => {
  const authApi = useAuthApi()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthUserProfile', () => {
    it('should call the authApi /users/@me endpoint', async () => {
      const query = await authApi.getAuthUserProfile()
      await query.refresh()

      expect(mockAuthApi).toHaveBeenCalledWith('/users/@me', {
        parseResponse: JSON.parse
      })
    })
  })

  describe('getTermsOfUse', () => {
    it('should call the authApi /documents/termsofuse endpoint', async () => {
      const query = await authApi.getTermsOfUse()
      await query.refresh()

      expect(mockAuthApi).toHaveBeenCalledWith('/documents/termsofuse')
    })
  })

  describe('usePatchTermsOfUse', () => {
    const mockSuccessCb = vi.fn(() => Promise.resolve())
    const { usePatchTermsOfUse } = useAuthApi()
    const { patchTermsOfUse } = usePatchTermsOfUse()

    const mutateArgs = { accepted: true, version: '5', successCb: mockSuccessCb }

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should call authApi with correct payload and endpoint', async () => {
      mockAuthApi.mockResolvedValue({})

      await patchTermsOfUse(mutateArgs)

      expect(mockAuthApi).toHaveBeenCalledWith('/users/@me', {
        method: 'PATCH',
        body: {
          istermsaccepted: mutateArgs.accepted,
          termsversion: mutateArgs.version
        }
      })
    })

    it('should invalidate auth user profile query and trigger successCb on success', async () => {
      mockAuthApi.mockResolvedValue({})

      await patchTermsOfUse(mutateArgs)

      expect(mockAuthApi).toHaveBeenCalled()
      expect(mockSuccessCb).toHaveBeenCalledTimes(1)
      expect(mockOpenErrorModal).not.toHaveBeenCalled()
      expect(mockInvalidateQueries).toHaveBeenCalledWith({ key: ['auth-user-profile'], exact: true })
    })

    it('should open error modal on failure', async () => {
      const error = new Error('401')
      mockAuthApi.mockRejectedValue(error)
      await expect(patchTermsOfUse(mutateArgs)).rejects.toThrow(error)

      expect(mockOpenErrorModal).toHaveBeenCalledTimes(1)
      expect(mockSuccessCb).not.toHaveBeenCalled()
      expect(mockAuthApi).toHaveBeenCalledOnce()
    })
  })
})
