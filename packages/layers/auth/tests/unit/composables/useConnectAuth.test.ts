import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useConnectAuth } from '../../../app/composables/useConnectAuth'

let mockAuthenticated = false
const mockTokenParsed = {
  firstname: 'John',
  lastname: 'Doe',
  name: 'John Doe',
  username: 'jdoe',
  email: 'john.doe@example.com',
  sub: 'mock-guid',
  loginSource: 'bcsc',
  realm_access: {
    roles: ['user', 'admin']
  }
}

const mockConnectAuth = {
  login: vi.fn(),
  logout: vi.fn(),
  updateToken: vi.fn(),
  authenticated: mockAuthenticated,
  token: 'mock-token',
  tokenParsed: mockTokenParsed
}

mockNuxtImport('useNuxtApp', () => () => ({
  $connectAuth: mockConnectAuth
}))

let mockSiteminderUrl = 'https://siteminder.example.com/logout'
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    siteminderLogoutUrl: mockSiteminderUrl
  }
}))

const { mockResetPiniaStores } = vi.hoisted(() => {
  return { mockResetPiniaStores: vi.fn() }
})
vi.mock('../../../app/utils/resetPiniaStores', () => ({
  resetPiniaStores: mockResetPiniaStores
}))

describe('useConnectAuth', () => {
  let composable: ReturnType<typeof useConnectAuth>

  beforeEach(() => {
    // vi.resetAllMocks()
    composable = useConnectAuth()

    vi.spyOn(window, 'location', 'get').mockReturnValue(
      { href: 'http://localhost:3000/test' } as typeof window.location
    )

    mockAuthenticated = false
    mockConnectAuth.tokenParsed = mockTokenParsed
  })

  describe('login', () => {
    it('should call $connectAuth.login with the correct hint and redirect URI', () => {
      composable.login('bcsc', 'http://example.com/redirect')
      expect(mockConnectAuth.login).toHaveBeenCalledWith({
        idpHint: 'bcsc',
        redirectUri: 'http://example.com/redirect'
      })
    })

    it('should use default redirect URL if none is provided', () => {
      composable.login('idir')
      expect(mockConnectAuth.login).toHaveBeenCalledWith({
        idpHint: 'idir',
        redirectUri: 'http://localhost:3000/test'
      })
    })
  })

  describe('logout', () => {
    it('should call $connectAuth.logout with siteminder URL if configured', () => {
      composable.logout('http://example.com/redirect')
      expect(mockResetPiniaStores).toHaveBeenCalled()
      expect(mockConnectAuth.logout).toHaveBeenCalledWith({
        redirectUri: expect.stringContaining('siteminder.example.com')
      })
    })

    it.skip('should call $connectAuth.logout with default URL if no siteminder URL', () => {
      mockSiteminderUrl = ''
      composable.logout()
      expect(mockResetPiniaStores).toHaveBeenCalled()
      expect(mockConnectAuth.logout).toHaveBeenCalledWith({
        redirectUri: expect.stringContaining('http://localhost:3000/test')
      })
      // TODO: unset siteminder url here
      expect(mockConnectAuth.logout).toHaveBeenCalledWith({
        redirectUri: expect.not.stringContaining('siteminder.example.com')
      })
    })
  })

  describe('getToken', () => {
    it('should call updateToken with minValidity of 30 by default', async () => {
      mockConnectAuth.updateToken.mockResolvedValue(true)
      await composable.getToken()
      expect(mockConnectAuth.updateToken).toHaveBeenCalledWith(30)
    })

    it('should call updateToken with minValidity of -1 when forceRefresh is true', async () => {
      mockConnectAuth.updateToken.mockResolvedValue(true)
      await composable.getToken(true)
      expect(mockConnectAuth.updateToken).toHaveBeenCalledWith(-1)
    })

    it('should return the token on success', async () => {
      mockConnectAuth.updateToken.mockResolvedValue(true)
      const token = await composable.getToken()
      expect(token).toBe('mock-token')
    })

    it('should return undefined on failure', async () => {
      mockConnectAuth.updateToken.mockRejectedValue(new Error('Failed'))
      const token = await composable.getToken()
      expect(token).toBeUndefined()
    })
  })

  describe('computed properties', () => {
    // TODO: why cant mockAuthenticated be changed
    it.skip('isAuthenticated should be true when $connectAuth.authenticated is true', async () => {
      expect(composable.isAuthenticated.value).toBe(false)
      mockConnectAuth.authenticated = true
      expect(composable.isAuthenticated.value).toBe(true)
    })

    it('authUser should return a correctly mapped object', () => {
      expect(composable.authUser.value.firstName).toBe('John')
      expect(composable.authUser.value.fullName).toBe('John Doe')
      expect(composable.authUser.value.keycloakGuid).toBe('mock-guid')
      expect(composable.authUser.value.roles).toEqual(['user', 'admin'])
    })

    it('authUser should return an empty object if $connectAuth.tokenParsed is null', () => {
      // @ts-expect-error - cant assign null to tokenParsed
      mockConnectAuth.tokenParsed = null
      expect(composable.authUser.value).toEqual({})
    })
  })
})
