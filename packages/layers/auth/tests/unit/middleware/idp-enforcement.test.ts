/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import idpEnforcementMiddleware from '#auth/app/middleware/05.idp-enforcement.global'

// Mocks
// Auth composable: we only need authUser + logout for these tests
const mockLogout = vi.fn()
const mockAuthUser = { value: { loginSource: 'BCSC' } } as any

mockNuxtImport('useConnectAuth', () => () => ({
  authUser: mockAuthUser,
  logout: mockLogout
}))

// AppConfig: connect.login.idpEnforcement + idps matrix
const mockAppConfigConnect: ConnectConfig = {
  login: {
    idpEnforcement: true,
    idps: ['bcsc', 'bceid', 'idir']
  }
} as any

mockNuxtImport('useAppConfig', () => () => ({
  connect: mockAppConfigConnect
}))

// Test suite

describe('connect-idp-enforcement middleware', () => {
  const baseTo = {
    path: '/some-path',
    fullPath: '/some-path',
    query: {},
    meta: {}
  } as unknown as RouteLocationNormalizedGeneric

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset defaults
    mockAuthUser.value = { loginSource: 'BCSC' }
    mockAppConfigConnect.login = {
      idpEnforcement: true,
      idps: ['bcsc', 'bceid', 'idir']
    }
  })

  it('does nothing when idpEnforcement is disabled', async () => {
    mockAppConfigConnect.login.idpEnforcement = false

    const result = await idpEnforcementMiddleware(baseTo)
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('does nothing when authUser has no loginSource', async () => {
    mockAuthUser.value = { loginSource: undefined }
    const result = await idpEnforcementMiddleware(baseTo)
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('does nothing when user loginSource is allowed', async () => {
    // Allowed set contains 'bcsc', middleware lowercases for comparison
    mockAuthUser.value = { loginSource: 'BCSC' }

    const result = await idpEnforcementMiddleware(baseTo)
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('logs out and redirects when user loginSource is NOT allowed', async () => {
    // Restrict allowed IDPs to bceid only
    mockAppConfigConnect.login.idps = ['bceid']
    mockAuthUser.value = { loginSource: 'BCSC' }

    const result = await idpEnforcementMiddleware(baseTo)
    expect(mockLogout).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledWith('http://localhost:3000/en-CA/auth/login')
    // Middleware returns whatever logout resolves to; we don’t assert it here
    expect(result).toBeUndefined()
  })

  it('preserves ?preset=… in redirect when present', async () => {
    // Disallow BCSC
    mockAppConfigConnect.login.idps = ['idir']
    mockAuthUser.value = { loginSource: 'BCSC' }

    const toWithPreset = {
      ...baseTo,
      query: { preset: 'colinuser' }
    } as unknown as RouteLocationNormalizedGeneric

    await idpEnforcementMiddleware(toWithPreset)
    expect(mockLogout).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledWith('http://localhost:3000/en-CA/auth/login?preset=colinuser')
  })

  it('handles case-insensitive loginSource vs idps comparison', async () => {
    // Allow uppercase variant in authUser, lowercase in config
    mockAppConfigConnect.login.idps = ['bcsc'] // lowercase list in config
    mockAuthUser.value = { loginSource: 'BcSc' } // mixed case in user

    const result = await idpEnforcementMiddleware(baseTo)
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
