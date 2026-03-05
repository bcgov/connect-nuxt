import { describe, expect, it, vi } from 'vitest'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import paramsMiddleware from '../../../app/middleware/02.keycloak-params.global'

vi.stubGlobal('import.meta', { server: false })

const dummyFrom = {} as unknown as RouteLocationNormalizedGeneric

describe('keycloak params middleware', () => {
  it('should remove keycloak-specific query parameters from the URL', () => {
    const to = {
      path: '/dashboard',
      fullPath: '/dashboard?state=abc&session_state=xyz&code=123&other_param=456',
      query: {
        state: 'abc',
        session_state: 'xyz',
        code: '123',
        other_param: '456'
      },
      hash: ''
    }

    paramsMiddleware(to as unknown as RouteLocationNormalizedGeneric, dummyFrom)
    expect(to.fullPath).toBe('/dashboard?other_param=456')
  })

  it('should not change the URL if no keycloak parameters are present', () => {
    const to = {
      path: '/dashboard',
      fullPath: '/dashboard?other_param=456',
      query: {
        other_param: '456'
      },
      hash: ''
    }

    paramsMiddleware(to as unknown as RouteLocationNormalizedGeneric, dummyFrom)
    expect(to.fullPath).toBe('/dashboard?other_param=456')
  })

  it('should handle a URL with no query parameters', () => {
    const to = {
      path: '/dashboard',
      fullPath: '/dashboard',
      query: {},
      hash: ''
    }

    paramsMiddleware(to as unknown as RouteLocationNormalizedGeneric, dummyFrom)
    expect(to.fullPath).toBe('/dashboard')
  })
})
