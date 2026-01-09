/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import connectAuthMiddleware from '#auth/app/middleware/connect-auth'

const mockRtc = ref({
  baseUrl: 'https://app.example.com/',
  playwright: false
})
mockNuxtImport('useRuntimeConfig', () => () => ({ public: mockRtc.value }))

const mockIsAuthenticated = ref(false)
mockNuxtImport('useConnectAuth', () => () => ({ isAuthenticated: mockIsAuthenticated }))
mockNuxtImport('useLocalePath', () => () => (path: string) => `/en-CA${path}`)
const { mockNavigateTo } = vi.hoisted(() => {
  return { mockNavigateTo: vi.fn() }
})
mockNuxtImport('navigateTo', () => mockNavigateTo)

const mockAuthApi = vi.fn()
const mockConnectAuth = vi.hoisted(() => ({
  tokenParsed: null as any,
  authenticated: false
}))

mockNuxtImport('useNuxtApp', () => () => ({
  $connectAuth: mockConnectAuth,
  $authApi: mockAuthApi
}))

const mockCurrentAccount = ref<object | null>(null)
mockNuxtImport('storeToRefs', () => () => ({
  currentAccount: mockCurrentAccount
}))
mockNuxtImport('useConnectAccountStore', () => () => ({
  currentAccount: mockCurrentAccount
}))

describe('connect-auth middleware', () => {
  const to = {
    path: '/some-path',
    fullPath: '/some-path',
    query: {},
    meta: {}
  } as unknown as RouteLocationNormalizedGeneric
  const from = { path: '/another-path', meta: {} } as unknown as RouteLocationNormalizedGeneric

  beforeEach(() => {
    vi.resetAllMocks()
    vi.restoreAllMocks()
    useQueryCache().invalidateQueries()
    mockIsAuthenticated.value = false
    mockRtc.value.playwright = false
    mockConnectAuth.tokenParsed = null
    mockConnectAuth.authenticated = false
    mockCurrentAccount.value = null
  })

  it('should do nothing if the user is authenticated and has accepted the latest terms of use', async () => {
    mockAuthApi.mockResolvedValue({
      userTerms: {
        isTermsOfUseAccepted: true
      }
    })
    mockIsAuthenticated.value = true
    await connectAuthMiddleware(to, from)
    expect(mockNavigateTo).not.toHaveBeenCalled()
    expect(mockAuthApi).toHaveBeenCalledOnce()
  })

  it('should redirect to the login page if the user is NOT authenticated', async () => {
    mockIsAuthenticated.value = false
    await connectAuthMiddleware(to, from)
    const expectedRedirectUrl = {
      path: '/en-CA/auth/login',
      query: {
        return: 'https://app.example.com/some-path'
      }
    }

    expect(mockNavigateTo).toHaveBeenCalledWith(expectedRedirectUrl)
  })

  it('should set mock values and not redirect if rtc.playwright = true', async () => {
    mockIsAuthenticated.value = false
    mockRtc.value.playwright = true

    await connectAuthMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()

    expect(mockConnectAuth.authenticated).toBe(true)
    expect(mockConnectAuth.tokenParsed).toEqual({
      firstname: 'TestFirst',
      lastname: 'TestLast',
      name: 'TestFirst TestLast',
      username: 'testUsername',
      email: 'testEmail@test.com',
      sub: 'test',
      loginSource: 'IDIR',
      realm_access: { roles: ['public_user'] }
    })

    expect(mockCurrentAccount.value).toEqual({
      id: 1,
      label: 'Playwright',
      accountStatus: 'ACTIVE',
      accountType: 'PREMIUM',
      type: 'ACCOUNT',
      urlorigin: '',
      urlpath: ''
    })
  })

  it('should redirect to the TOS page if the user is authenticated and has not accepted the latest TOS', async () => {
    mockIsAuthenticated.value = true
    mockAuthApi.mockResolvedValue({
      userTerms: {
        isTermsOfUseAccepted: false
      }
    })
    await connectAuthMiddleware(to, from)
    expect(mockAuthApi).toHaveBeenCalledOnce()
    expect(mockNavigateTo).toHaveBeenCalledWith(expect.objectContaining({ path: '/en-CA/auth/terms-of-use' }))
  })
})
