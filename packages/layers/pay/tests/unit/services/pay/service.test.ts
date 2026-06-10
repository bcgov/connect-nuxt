/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockQuery = {
  feeOptions: vi.fn(() => 'fee-opts' as any),
  payAccountOptions: vi.fn(() => 'account-opts' as any)
}
mockNuxtImport('useConnectPayQuery', () => () => mockQuery)

const { mockGetCachedOrFetch } = vi.hoisted(() => ({
  mockGetCachedOrFetch: vi.fn()
}))
vi.mock('~/services/helpers', () => ({
  getCachedOrFetch: mockGetCachedOrFetch
}))

describe('useConnectPayService', () => {
  const service = useConnectPayService()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET Requests', () => {
    it('getFee should fetch options and call the cache helper', async () => {
      const mockFeeData = { fee: 100, tax: 12 } as any
      mockGetCachedOrFetch.mockResolvedValue(mockFeeData)

      const entityType = 'BC'
      const code = 'NEW_INC'
      const params = { priority: true, futureEffective: false }
      const force = true

      const result = await service.getFee(entityType, code, params, force)
      const opts = mockQuery.feeOptions

      expect(opts).toHaveBeenCalledWith(entityType, code, params)
      // @ts-expect-error - mocked options have 0 arguments
      expect(mockGetCachedOrFetch).toHaveBeenCalledWith(opts(entityType, code, params), force)
      expect(result).toEqual(mockFeeData)
    })

    it('getPayAccount should fetch options and call the cache helper', async () => {
      const mockAccountData = { id: 'ACC-123', paymentMethod: 'DIRECT_PAY' } as any
      mockGetCachedOrFetch.mockResolvedValue(mockAccountData)

      const accountId = '12345'
      const force = false

      const result = await service.getPayAccount(accountId, force)
      const opts = mockQuery.payAccountOptions

      expect(opts).toHaveBeenCalledWith(accountId)
      // @ts-expect-error - mocked options have 0 arguments
      expect(mockGetCachedOrFetch).toHaveBeenCalledWith(opts(accountId), force)
      expect(result).toEqual(mockAccountData)
    })
  })
})
