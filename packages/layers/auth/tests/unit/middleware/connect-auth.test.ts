import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import connectAuthMiddleware from '../../../app/middleware/connect-auth'

const mockIsAuthenticated = ref(false)
mockNuxtImport('useConnectAuth', () => () => ({ isAuthenticated: mockIsAuthenticated }))
mockNuxtImport('useRuntimeConfig', () => () => ({ public: { baseUrl: 'https://app.example.com/' } }))
mockNuxtImport('useLocalePath', () => () => (path: string) => `/en-CA${path}`)
const { mockNavigateTo } = vi.hoisted(() => {
  return { mockNavigateTo: vi.fn() }
})
mockNuxtImport('navigateTo', () => mockNavigateTo)

describe('connect-auth middleware', () => {
  const to = {
    path: '/some-path',
    fullPath: '/some-path',
    query: {}
  }
  const from = { path: '/another-path' }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should do nothing if the user is authenticated', async () => {
    mockIsAuthenticated.value = true
    await connectAuthMiddleware(to, from)
    expect(mockNavigateTo).not.toHaveBeenCalled()
  })

  it('should redirect to the login page if the user is NOT authenticated', async () => {
    mockIsAuthenticated.value = false
    await connectAuthMiddleware(to, from)
    const expectedRedirectUrl = '/en-CA/auth/login?return=https://app.example.com/some-path'
    expect(mockNavigateTo).toHaveBeenCalledWith(expectedRedirectUrl)
  })
})
