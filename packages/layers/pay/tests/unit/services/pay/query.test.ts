// NB: Only testing options definitions here - query definitions are simply returning the options wrapped by useQuery
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockKeys = {
  fee: vi.fn((entityType, code, params) => ['pay', 'fees', entityType, code, params]),
  payAccount: vi.fn(accountId => ['pay', 'accounts', accountId])
}

mockNuxtImport('useConnectPayQueryKeys', () => {
  return () => ({
    keys: mockKeys
  })
})

const mockPayApi = vi.fn()
mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $payApi: mockPayApi
  })
})

describe('useConnectPayQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const DEFAULT_STALE_TIME = 60000

  it('feeOptions should have correct config', async () => {
    const { feeOptions } = useConnectPayQuery()
    const entityType = 'BC'
    const code = 'NEW_INC'

    const options = feeOptions(entityType, code)
    await options.query({} as any)

    expect(mockPayApi).toHaveBeenCalledWith(`/fees/${entityType}/${code}`, { params: undefined })
    expect(mockKeys.fee).toHaveBeenCalledWith(entityType, code, undefined)
    expect(options.staleTime).toBe(DEFAULT_STALE_TIME)
    expect(options.key).toEqual(['pay', 'fees', entityType, code, undefined])
  })

  it('feeOptions should accept optional params and custom options', async () => {
    const { feeOptions } = useConnectPayQuery()
    const entityType = 'CP'
    const code = 'AMEND'
    const params = { priority: true, futureEffective: false }
    const customOptions = { staleTime: 5000, label: 'custom-fee' }

    const options = feeOptions(entityType, code, params, customOptions as any)
    await options.query({} as any)

    expect(mockPayApi).toHaveBeenCalledWith(`/fees/${entityType}/${code}`, { params })
    expect(mockKeys.fee).toHaveBeenCalledWith(entityType, code, params)
    expect(options.staleTime).toBe(5000)
    expect((options as any).label).toBe('custom-fee')
    expect(options.key).toEqual(['pay', 'fees', entityType, code, params])
  })

  it('payAccountOptions should have correct config', async () => {
    const { payAccountOptions } = useConnectPayQuery()
    const accountId = 'ACC-123'

    const options = payAccountOptions(accountId)
    await options.query({} as any)

    expect(mockPayApi).toHaveBeenCalledWith(`/accounts/${accountId}`)
    expect(mockKeys.payAccount).toHaveBeenCalledWith(accountId)
    expect(options.staleTime).toBe(DEFAULT_STALE_TIME)
    expect(options.key).toEqual(['pay', 'accounts', accountId])
  })

  it('payAccountOptions should accept custom options', async () => {
    const { payAccountOptions } = useConnectPayQuery()
    const accountId = 12345
    const customOptions = { staleTime: 0 }

    const options = payAccountOptions(accountId, customOptions)
    await options.query({} as any)

    expect(mockPayApi).toHaveBeenCalledWith(`/accounts/${accountId}`)
    expect(options.staleTime).toBe(0)
    expect(options.key).toEqual(['pay', 'accounts', accountId])
  })
})
