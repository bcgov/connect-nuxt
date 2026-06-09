/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockCurrentAccount = ref<any>({ id: 'ACC-123' })
mockNuxtImport('useConnectAccountStore', () => {
  return () => ({
    currentAccount: mockCurrentAccount
  })
})

mockNuxtImport('storeToRefs', () => {
  return (store: any) => store
})

describe('useConnectPayQueryKeys', () => {
  beforeEach(() => {
    mockCurrentAccount.value = { id: 'ACC-123' }
  })

  it('should be reactive when account ID changes', () => {
    const { keys } = useConnectPayQueryKeys()

    expect(keys.payAccount('PAY-123')).toEqual(['connect', 'pay', 'ACC-123', 'pay-account', 'PAY-123'])
    expect(keys.fee('BC', 'NEW')).toEqual(['connect', 'pay', 'ACC-123', 'fee', 'BC', 'NEW', {}])

    mockCurrentAccount.value = { id: 'ACC-NEW' }

    expect(keys.payAccount('PAY-123')).toEqual(['connect', 'pay', 'ACC-NEW', 'pay-account', 'PAY-123'])
    expect(keys.fee('BC', 'NEW')).toEqual(['connect', 'pay', 'ACC-NEW', 'fee', 'BC', 'NEW', {}])
  })

  it('should handle undefined accountId', () => {
    const { keys } = useConnectPayQueryKeys()

    mockCurrentAccount.value = null

    expect(keys.payAccount('TARGET-456')).toEqual(['connect', 'pay', undefined, 'pay-account', 'TARGET-456'])
    expect(keys.fee('BC', 'NEW')).toEqual(['connect', 'pay', undefined, 'fee', 'BC', 'NEW', {}])
  })

  describe('Key Structure', () => {
    const { keys } = useConnectPayQueryKeys()
    const accountId = 'ACC-123'

    it.each([
      [
        'payAccount',
        ['PAY-123'],
        ['connect', 'pay', accountId, 'pay-account', 'PAY-123']
      ],
      [
        'fee',
        ['CP', 'NOCOL'],
        ['connect', 'pay', accountId, 'fee', 'CP', 'NOCOL', {}]
      ]
    ])(
      'keys.%s() should strictly enforce the expected array hierarchy structure',
      (methodName, args, expected) => {
        // @ts-expect-error - cant index method name
        const result = keys[methodName](...args)
        expect(result).toEqual(expected)
      }
    )
  })
})
