/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockQuery = {
  userProfileOptions: vi.fn(() => 'profile-opts'),
  termsOfUseOptions: vi.fn(() => 'tos-opts'),
  userSettingsOptions: vi.fn(() => 'settings-opts')
}
mockNuxtImport('useConnectAuthQuery', () => () => mockQuery)

const { mockGetCachedOrFetch } = vi.hoisted(() => ({
  mockGetCachedOrFetch: vi.fn()
}))
vi.mock('~/services/helpers', () => ({
  getCachedOrFetch: mockGetCachedOrFetch
}))

const mockAuthApi = vi.fn() as any
mockAuthApi.raw = vi.fn()
mockNuxtImport('useNuxtApp', () => () => ({
  $authApi: mockAuthApi
}))

describe('useConnectAuthService', () => {
  const service = useConnectAuthService()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET Requests', () => {
    it('getAuthUserProfile should fetch options and call the cache helper', async () => {
      const mockData = { id: 'user-1', name: 'John Doe' }
      mockGetCachedOrFetch.mockResolvedValue(mockData)

      const result = await service.getAuthUserProfile(true)
      const opts = mockQuery.userProfileOptions
      expect(opts).toHaveBeenCalled()
      expect(mockGetCachedOrFetch).toHaveBeenCalledWith(opts(), true)
      expect(result).toEqual(mockData)
    })

    it('getTermsOfUse should fetch options and call the cache helper', async () => {
      const mockData = { text: 'Terms of use' }
      mockGetCachedOrFetch.mockResolvedValue(mockData)

      const result = await service.getTermsOfUse(false)
      const opts = mockQuery.termsOfUseOptions
      expect(opts).toHaveBeenCalled()
      expect(mockGetCachedOrFetch).toHaveBeenCalledWith(opts(), false)
      expect(result).toEqual(mockData)
    })

    it('getUserAccounts should fetch options, call cache helper, and filter settings correctly', async () => {
      const mockSettings = [
        { id: '1', type: 'ACCOUNT', label: 'Account 1' },
        { id: '2', type: 'PROFILE', label: 'Profile Settings' },
        { id: '3', type: 'ACCOUNT', label: 'Account 2' }
      ]
      mockGetCachedOrFetch.mockResolvedValue(mockSettings)

      const result = await service.getUserAccounts(true)
      const opts = mockQuery.userSettingsOptions
      expect(opts).toHaveBeenCalled()
      expect(mockGetCachedOrFetch).toHaveBeenCalledWith(opts(), true)
      expect(result).toEqual([
        { id: '1', type: 'ACCOUNT', label: 'Account 1' },
        { id: '3', type: 'ACCOUNT', label: 'Account 2' }
      ])
    })

    it('verifyAccountName should call the raw API without cache', async () => {
      const mockResponse = { status: 200 }
      mockAuthApi.raw.mockResolvedValue(mockResponse)

      const accountName = 'Testing Corp'
      const result = await service.verifyAccountName(accountName)

      expect(mockAuthApi.raw).toHaveBeenCalledWith(
        `/orgs?validateName=true&name=${encodeURIComponent(accountName)}`
      )
      expect(mockGetCachedOrFetch).not.toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })
  })

  describe('POST, PUT, PATCH, DELETE Requests', () => {
    it('createAccount should call the correct endpoint with POST and payload', async () => {
      const payload = { name: 'Test Account' } as any
      const mockResponse = { id: '1234' }
      mockAuthApi.mockResolvedValue(mockResponse)

      const result = await service.createAccount(payload)

      expect(mockAuthApi).toHaveBeenCalledWith('/orgs', {
        method: 'POST',
        body: payload
      })
      expect(result).toEqual(mockResponse)
    })

    it('updateAuthUserProfile should call the correct endpoint with POST and login true payload', async () => {
      const mockResponse = { data: 'user-info' }
      mockAuthApi.mockResolvedValue(mockResponse)

      const result = await service.updateAuthUserProfile()

      expect(mockAuthApi).toHaveBeenCalledWith('/users', {
        method: 'POST',
        body: { isLogin: true }
      })
      expect(result).toEqual(mockResponse)
    })

    it('updateOrCreateUserContact should call with PUT method by default', async () => {
      const payload = { email: 'test@example.com', phone: '1234567890', phoneExtension: undefined }
      mockAuthApi.mockResolvedValue({ success: true })

      await service.updateOrCreateUserContact(payload)

      expect(mockAuthApi).toHaveBeenCalledWith('/users/contacts', {
        method: 'PUT',
        body: payload
      })
    })

    it('updateOrCreateUserContact should accept method argument', async () => {
      const payload = { email: 'test@example.com', phone: '1234567890', phoneExtension: undefined }
      mockAuthApi.mockResolvedValue({ success: true })

      await service.updateOrCreateUserContact(payload, 'POST')

      expect(mockAuthApi).toHaveBeenCalledWith('/users/contacts', {
        method: 'POST',
        body: payload
      })
    })

    it('updateTermsOfUse should call correct endpoint with PATCH method and payload', async () => {
      const mockResponse = { success: true }
      mockAuthApi.mockResolvedValue(mockResponse)

      const result = await service.updateTermsOfUse({ accepted: true, version: '1' })

      expect(mockAuthApi).toHaveBeenCalledWith('/users/@me', {
        method: 'PATCH',
        body: {
          istermsaccepted: true,
          termsversion: '1'
        }
      })
      expect(result).toEqual(mockResponse)
    })
  })
})
