/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import idpEnforcementMiddleware from '#auth/app/middleware/04.idp-enforcement.global'

// Auth composable
const mockLogout = vi.fn().mockResolvedValue(undefined)
const mockAuthUser = { value: { loginSource: 'BCSC' } } as any

mockNuxtImport('useConnectAuth', () => () => ({
  authUser: mockAuthUser,
  logout: mockLogout
}))

// AppConfig
const mockAppConfigConnect: ConnectConfig = {
  login: {
    idpEnforcement: true,
    idps: ['bcsc', 'bceid', 'idir']
  }
} as any

mockNuxtImport('useAppConfig', () => () => ({
  connect: mockAppConfigConnect
}))

// Locale path used to build redirect URL
mockNuxtImport('useLocalePath', () => () => (path: string) => `/en-CA${path}`)

// Overlay: make .open() resolve immediately
const mockOpen = vi.fn().mockResolvedValue({ acknowledged: true })
const mockCreate = vi.fn(() => ({ open: mockOpen }))
mockNuxtImport('useOverlay', () => () => ({ create: mockCreate }))

describe('connect-idp-enforcement middleware (with modal)', () => {
  const baseTo = {
    path: '/some-path',
    fullPath: '/some-path',
    query: {},
    meta: {}
  } as unknown as RouteLocationNormalizedGeneric

  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthUser.value = { loginSource: 'BCSC' }
    mockAppConfigConnect.login = { idpEnforcement: true, idps: ['bcsc', 'bceid', 'idir'] }
  })

  it('does nothing when idpEnforcement is disabled', async () => {
    mockAppConfigConnect.login.idpEnforcement = false

    const result = await idpEnforcementMiddleware(baseTo)

    expect(mockOpen).not.toHaveBeenCalled()
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('does nothing when authUser has no loginSource', async () => {
    mockAuthUser.value = { loginSource: undefined }

    const result = await idpEnforcementMiddleware(baseTo)

    expect(mockOpen).not.toHaveBeenCalled()
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('does nothing when user loginSource is allowed', async () => {
    mockAuthUser.value = { loginSource: 'BCSC' } // allowed by default

    const result = await idpEnforcementMiddleware(baseTo)

    expect(mockOpen).not.toHaveBeenCalled()
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('opens modal and logs out when user loginSource is NOT allowed', async () => {
    // Disallow BCSC
    mockAppConfigConnect.login.idps = ['bceid'] // only bceid allowed
    mockAuthUser.value = { loginSource: 'BCSC' }

    const result = await idpEnforcementMiddleware(baseTo)

    // middleware didn't await showInvalidIdpModal(); flush microtasks:
    await Promise.resolve()

    expect(mockCreate).toHaveBeenCalledWith(expect.anything()) // ConnectModalInvalidIdp
    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledWith('http://localhost:3000/en-CA/auth/login')
    expect(result).toBeUndefined()
  })

  it('preserves ?preset=… in redirect when present', async () => {
    mockAppConfigConnect.login.idps = ['idir'] // disallow bcsc
    mockAuthUser.value = { loginSource: 'BCSC' }

    const toWithPreset = {
      ...baseTo,
      query: { preset: 'colinuser' }
    } as unknown as RouteLocationNormalizedGeneric

    await idpEnforcementMiddleware(toWithPreset)

    // flush microtasks (modal open resolves asynchronously)
    await Promise.resolve()

    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockLogout).toHaveBeenCalledWith('http://localhost:3000/en-CA/auth/login?preset=colinuser')
  })

  it('handles case-insensitive loginSource vs idps comparison', async () => {
    mockAppConfigConnect.login.idps = ['bcsc']
    mockAuthUser.value = { loginSource: 'BcSc' } // mixed case

    const result = await idpEnforcementMiddleware(baseTo)

    // Should not open modal or logout as it's allowed
    expect(mockOpen).not.toHaveBeenCalled()
    expect(mockLogout).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })
})
