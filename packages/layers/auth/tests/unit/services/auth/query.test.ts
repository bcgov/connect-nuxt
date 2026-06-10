// NB: Only testing options definitions here - query definitions are simply returning the options wrapped by useQuery
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockKeys = {
  userProfile: vi.fn(() => ['connect', 'auth', 'GUID-123', 'user-profile']),
  pendingApprovals: vi.fn(() => ['connect', 'auth', 'GUID-123', 'org', 'ACC-123', 'pending-approvals']),
  termsOfUse: vi.fn(() => ['connect', 'auth', 'GUID-123', 'terms-of-use']),
  userSettings: vi.fn(() => ['connect', 'auth', 'GUID-123', 'user-settings'])
}

mockNuxtImport('useConnectAuthQueryKeys', () => {
  return () => ({
    keys: mockKeys
  })
})

const mockAuthUser = ref<any>({ keycloakGuid: 'GUID-123' })
mockNuxtImport('useConnectAuth', () => {
  return () => ({
    authUser: mockAuthUser
  })
})

const mockCurrentAccount = { id: 'ACC-123' }
mockNuxtImport('useConnectAccountStore', () => {
  return () => ({
    currentAccount: mockCurrentAccount
  })
})

const mockAuthApi = vi.fn()
mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $authApi: mockAuthApi
  })
})

describe('useConnectAuthQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthUser.value = { keycloakGuid: 'GUID-123' }
    mockCurrentAccount.id = 'ACC-123'
  })

  const DEFAULT_STALE_TIME = 60000

  it('pendingApprovalsOptions should have correct config', () => {
    const { pendingApprovalsOptions } = useConnectAuthQuery()

    const options = pendingApprovalsOptions()
    options.query({} as any)

    expect(mockAuthApi).toHaveBeenCalledWith('/users/GUID-123/org/ACC-123/notifications')
    expect(mockKeys.pendingApprovals).toHaveBeenCalled()
    expect(options.staleTime).toBe(DEFAULT_STALE_TIME)
    expect(options.enabled).toBe(true)
    expect(options.key).toEqual(['connect', 'auth', 'GUID-123', 'org', 'ACC-123', 'pending-approvals'])

    const custom = pendingApprovalsOptions({ staleTime: 30000, enabled: false })
    expect(custom.staleTime).toBe(30000)
    expect(custom.enabled).toBe(false)
  })

  it('pendingApprovalsOptions should disable when accountId or keycloakGuid is missing', () => {
    const { pendingApprovalsOptions } = useConnectAuthQuery()

    mockAuthUser.value = null
    const noGuid = pendingApprovalsOptions()
    expect(noGuid.enabled).toBe(false)

    mockAuthUser.value = { keycloakGuid: 'GUID-123' }
    mockCurrentAccount.id = undefined as any
    const noAccount = pendingApprovalsOptions()
    expect(noAccount.enabled).toBe(false)
  })

  it('termsOfUseOptions should have correct config', () => {
    const { termsOfUseOptions } = useConnectAuthQuery()

    const options = termsOfUseOptions()
    options.query({} as any)

    expect(mockAuthApi).toHaveBeenCalledWith('/documents/termsofuse')
    expect(mockKeys.termsOfUse).toHaveBeenCalled()
    expect(options.staleTime).toBe(DEFAULT_STALE_TIME)
    expect(options.key).toEqual(['connect', 'auth', 'GUID-123', 'terms-of-use'])

    const custom = termsOfUseOptions({ staleTime: 5000 })
    expect(custom.staleTime).toBe(5000)
  })

  it('userProfileOptions should have correct config', () => {
    const { userProfileOptions } = useConnectAuthQuery()

    const options = userProfileOptions()
    options.query({} as any)

    expect(mockAuthApi).toHaveBeenCalledWith('/users/@me', { parseResponse: JSON.parse })
    expect(mockKeys.userProfile).toHaveBeenCalled()
    expect(options.staleTime).toBe(DEFAULT_STALE_TIME)
    expect(options.key).toEqual(['connect', 'auth', 'GUID-123', 'user-profile'])

    const custom = userProfileOptions({ staleTime: 10000 })
    expect(custom.staleTime).toBe(10000)
  })

  it('userSettingsOptions should have correct config', () => {
    const { userSettingsOptions } = useConnectAuthQuery()

    const options = userSettingsOptions()
    options.query({} as any)

    expect(mockAuthApi).toHaveBeenCalledWith('/users/GUID-123/settings')
    expect(mockKeys.userSettings).toHaveBeenCalled()
    expect(options.staleTime).toBe(DEFAULT_STALE_TIME)
    expect(options.enabled).toBe(true)
    expect(options.key).toEqual(['connect', 'auth', 'GUID-123', 'user-settings'])

    const custom = userSettingsOptions({ staleTime: 15000, enabled: false })
    expect(custom.staleTime).toBe(15000)
    expect(custom.enabled).toBe(false)
  })

  it('userSettingsOptions should disable when keycloakGuid is missing', () => {
    const { userSettingsOptions } = useConnectAuthQuery()
    mockAuthUser.value = null

    const options = userSettingsOptions()
    expect(options.enabled).toBe(false)
  })
})
