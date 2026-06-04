/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockAuthUser = ref<any>({ keycloakGuid: 'GUID-111' })
const mockCurrentAccount = ref<any>({ id: 'ACC-123' })

mockNuxtImport('useConnectAuth', () => {
  return () => ({
    authUser: mockAuthUser
  })
})

mockNuxtImport('useConnectAccountStore', () => {
  return () => ({
    currentAccount: mockCurrentAccount
  })
})

mockNuxtImport('storeToRefs', () => {
  return (store: any) => store
})

describe('useConnectAuthQueryKeys', () => {
  beforeEach(() => {
    mockAuthUser.value = { keycloakGuid: 'GUID-111' }
    mockCurrentAccount.value = { id: 'ACC-123' }
  })

  it('should be reactive when user GUID or account ID changes', () => {
    const { keys } = useConnectAuthQueryKeys()

    expect(keys.userProfile()).toEqual(['connect', 'auth', 'GUID-111', 'user-profile'])
    expect(keys.pendingApprovals()).toEqual(['connect', 'auth', 'GUID-111', 'org', 'ACC-123', 'pending-approvals'])

    mockAuthUser.value = { keycloakGuid: 'GUID-NEW' }
    mockCurrentAccount.value = { id: 'ACC-NEW' }

    expect(keys.userProfile()).toEqual(['connect', 'auth', 'GUID-NEW', 'user-profile'])
    expect(keys.pendingApprovals()).toEqual(['connect', 'auth', 'GUID-NEW', 'org', 'ACC-NEW', 'pending-approvals'])
  })

  it('should handle undefined or empty guid and/or accountId', () => {
    const { keys } = useConnectAuthQueryKeys()

    mockAuthUser.value = null
    mockCurrentAccount.value = null

    expect(keys.userProfile()).toEqual(['connect', 'auth', undefined, 'user-profile'])
    expect(keys.pendingApprovals()).toEqual(['connect', 'auth', undefined, 'org', undefined, 'pending-approvals'])
  })

  describe('Key Structure', () => {
    const { keys } = useConnectAuthQueryKeys()
    const guid = 'GUID-111'
    const accountId = 'ACC-123'

    it.each([
      [
        'userProfile',
        ['connect', 'auth', guid, 'user-profile']
      ],
      [
        'pendingApprovals',
        ['connect', 'auth', guid, 'org', accountId, 'pending-approvals']
      ],
      [
        'termsOfUse',
        ['connect', 'auth', guid, 'terms-of-use']
      ],
      [
        'userSettings',
        ['connect', 'auth', guid, 'user-settings']
      ]
    ])('keys.%s() should strictly enforce the expected array hierarchy structure', (methodName, expected) => {
      // @ts-expect-error - can't index method name
      const result = keys[methodName]()
      expect(result).toEqual(expected)
    })
  })
})
