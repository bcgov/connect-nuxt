/* eslint-disable @typescript-eslint/no-explicit-any */
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

const mockQuery = vi.fn()
const mockInvalidateQueries = vi.fn()

const { mockDefineQuery, mockUseMutation } = vi.hoisted(() => {
  const mockMutationReturnObject = {
    mutateAsync: vi.fn(),
    isPending: false,
    isSuccess: false
  }

  const mockUseMutation = vi.fn(() => mockMutationReturnObject)

  const mockDefineQuery = vi.fn(() => mockQuery)

  return {
    mockDefineQuery,
    mockUseMutation
  }
})

vi.mock('@pinia/colada', () => ({
  defineQuery: mockDefineQuery,
  useQueryCache: () => ({ invalidateQueries: mockInvalidateQueries }),
  useMutation: mockUseMutation,
  defineMutation: vi.fn(setupFn => setupFn)
}))

describe('useAuthApi', () => {
  const authApi = useAuthApi()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAuthUserProfile', () => {
    it('should define and return the query', async () => {
      const expected = { data: 'test-data' }
      mockQuery.mockReturnValue(expected)

      const result = await authApi.getAuthUserProfile()

      expect(mockDefineQuery).toHaveBeenCalledTimes(1)

      const callArgs = (mockDefineQuery.mock.calls[0] as any)[0]

      expect(callArgs.key).toEqual(['auth-user-profile'])
      expect(callArgs.staleTime).toBe(300000)

      expect(mockQuery).toHaveBeenCalledTimes(1)

      expect(result).toBe(expected)

      const queryFunction = callArgs.query
      queryFunction()

      expect(mockAuthApi).toHaveBeenCalledWith('/users/@me', {
        parseResponse: JSON.parse
      })
    })
  })

  describe('getTermsOfUse', () => {
    it('should define and return the query', async () => {
      const expected = { data: 'test-data' }
      mockQuery.mockReturnValue(expected)

      const result = await authApi.getTermsOfUse()

      expect(mockDefineQuery).toHaveBeenCalledTimes(1)

      const callArgs = (mockDefineQuery.mock.calls[0] as any)[0]

      expect(callArgs.key).toEqual(['auth-terms-of-use'])
      expect(callArgs.staleTime).toBe(300000)

      expect(mockQuery).toHaveBeenCalledTimes(1)

      expect(result).toBe(expected)

      const queryFunction = callArgs.query
      queryFunction()

      expect(mockAuthApi).toHaveBeenCalledWith('/documents/termsofuse')
    })
  })

  describe('usePatchTermsOfUse', () => {
    const mockSuccessCb = vi.fn(() => Promise.resolve())
    const { usePatchTermsOfUse } = useAuthApi()
    const mutateArgs = { accepted: true, version: '5', successCb: mockSuccessCb }

    usePatchTermsOfUse()
    const callArgs = (mockUseMutation.mock.calls[0] as any)[0]

    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should call authApi with correct payload and endpoint', async () => {
      mockAuthApi.mockResolvedValue({})

      await callArgs.mutation(mutateArgs)

      expect(mockAuthApi).toHaveBeenCalledWith('/users/@me', {
        method: 'PATCH',
        body: {
          istermsaccepted: mutateArgs.accepted,
          termsversion: mutateArgs.version
        }
      })
    })

    it('should invalidate cache and call successCb on success', async () => {
      await callArgs.onSuccess({ success: true }, mutateArgs)

      expect(mockInvalidateQueries).toHaveBeenCalledWith({ key: ['auth-user-profile'], exact: true })
      expect(mockSuccessCb).toHaveBeenCalledTimes(1)
      expect(mockOpenErrorModal).not.toHaveBeenCalled()
    })

    it('should call error modal on failure', async () => {
      const error = new Error('401')

      callArgs.onError(error)

      expect(mockOpenErrorModal).toHaveBeenCalledTimes(1)
      expect(mockInvalidateQueries).not.toHaveBeenCalled()
      expect(mockSuccessCb).not.toHaveBeenCalled()
    })
  })
})
