import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setBreadcrumbs } from '../../../app/utils/setBreadcrumbs'

let mockRoute = {
  meta: {
    breadcrumbs: []
  }
}

mockNuxtImport('useRoute', () => () => mockRoute)

describe('setBreadcrumbs', () => {
  beforeEach(() => {
    mockRoute.meta.breadcrumbs = []
    vi.clearAllMocks()
  })

  test('should assign the breadcrumbs array to route.meta.breadcrumbs', () => {
    const newBreadcrumbs = [
      { label: 'Home', to: '/' },
      { label: 'Dashboard' }
    ]

    setBreadcrumbs(newBreadcrumbs)
    expect(mockRoute.meta.breadcrumbs).toEqual(newBreadcrumbs)
  })

  test('should overwrite any existing breadcrumbs on route.meta', () => {
    // @ts-expect-error
    mockRoute.meta.breadcrumbs = [{ label: 'Old Crumb' }]

    const newBreadcrumbs = [
      { label: 'New Home', to: '/new' }
    ]

    setBreadcrumbs(newBreadcrumbs)

    expect(mockRoute.meta.breadcrumbs).toEqual(newBreadcrumbs)
    expect(mockRoute.meta.breadcrumbs).toHaveLength(1)
  })

  test('should handle an empty breadcrumbs array', () => {
    // @ts-expect-error
    mockRoute.meta.breadcrumbs = [{ label: 'Existing Crumb' }]

    setBreadcrumbs([])
    expect(mockRoute.meta.breadcrumbs).toEqual([])
  })
})
