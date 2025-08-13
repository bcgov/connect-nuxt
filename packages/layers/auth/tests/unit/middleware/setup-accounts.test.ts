import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import initAccountMiddleware from '../../../app/middleware/01.setup-accounts.global'

vi.stubGlobal('import.meta', { client: true })
const mockIsAuthenticated = ref(false)
mockNuxtImport('useConnectAuth', () => () => ({ isAuthenticated: mockIsAuthenticated }))
const mockInitAccountStore = vi.fn().mockResolvedValue(undefined)
const mockSwitchCurrentAccount = vi.fn()
mockNuxtImport('useConnectAccountStore', () => () => ({
  initAccountStore: mockInitAccountStore,
  switchCurrentAccount: mockSwitchCurrentAccount
}))

describe('Setup accounts middleware', () => {
  const to: { query: { accountid?: string } } = { query: {} }
  const from = {}

  beforeEach(() => {
    vi.clearAllMocks()
    mockIsAuthenticated.value = false
    to.query = {}
  })

  it('should do nothing if the user is not authenticated', async () => {
    mockIsAuthenticated.value = false
    await initAccountMiddleware(to, from)
    expect(mockInitAccountStore).not.toHaveBeenCalled()
    expect(mockSwitchCurrentAccount).not.toHaveBeenCalled()
  })

  it('should initialize the account store if the user is authenticated (no accountid)', async () => {
    mockIsAuthenticated.value = true
    await initAccountMiddleware(to, from)
    expect(mockInitAccountStore).toHaveBeenCalled()
    expect(mockSwitchCurrentAccount).not.toHaveBeenCalled()
  })

  it('should switch accounts and initialize store if authenticated with an accountid', async () => {
    mockIsAuthenticated.value = true
    to.query.accountid = '123'
    await initAccountMiddleware(to, from)
    expect(mockInitAccountStore).toHaveBeenCalled()
    expect(mockSwitchCurrentAccount).toHaveBeenCalledWith(123)
  })
})
