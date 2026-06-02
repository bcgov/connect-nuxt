import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockAuthApi = vi.fn()
mockNuxtImport('useNuxtApp', () => {
  return () => ({
    $authApi: mockAuthApi
  })
})

const mockOpenErrorModal = vi.fn()
mockNuxtImport('useConnectAuthModals', () => {
  return () => ({
    openPatchTosErrorModal: mockOpenErrorModal
  })
})

const mockInvalidateQueries = vi.fn()
vi.mock('@pinia/colada', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual as object,
    useQueryCache: () => ({ invalidateQueries: mockInvalidateQueries })
  }
})

describe('useAuthApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
})
