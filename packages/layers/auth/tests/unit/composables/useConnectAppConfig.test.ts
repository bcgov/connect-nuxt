/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useAppConfig', () => () => ({
  connectOverrides: {
    bcscUser: {
      login: {
        idps: ['bcsc'],
        idpEnforcement: true
      }
    },
    defaultUser: {
      login: {
        idps: ['bcsc', 'bceid', 'idir'],
        idpEnforcement: false
      }
    }
  }
}))

const BASE_CONFIG: ConnectConfig = {
  login: {
    idps: ['bcsc', 'bceid', 'idir'],
    redirect: '/dashboard',
    idpEnforcement: false,
    skipAccountRedirect: false
  },
  header: {
    loginMenu: true,
    whatsNew: true,
    createAccount: true,
    notifications: false,
    accountOptionsMenu: false
  },
  logout: {
    redirect: '/logged-out'
  }
}

describe('mergeAppConfigOverrides (connectPresets)', () => {
  const { mergeAppConfigOverrides } = useConnectAppConfig()

  it('applies "defaultUser" shallow merge', () => {
    const result = mergeAppConfigOverrides(BASE_CONFIG as any, 'defaultUser')
    expect(result.login.idps).toEqual(['bcsc', 'bceid', 'idir'])
    expect(result.login.idpEnforcement).toBe(false)
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('applies "bcscUser" shallow merge', async () => {
    const result = mergeAppConfigOverrides(BASE_CONFIG as any, 'bcscUser')

    expect(result.login.idps).toEqual(['bcsc'])
    expect(result.login.idpEnforcement).toBe(true)
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('unknown preset → base unchanged', () => {
    const result = mergeAppConfigOverrides(BASE_CONFIG as any, 'unknown' as any)
    expect(result.login.idps).toEqual(['bcsc', 'bceid', 'idir'])
    expect(result.login.idpEnforcement).toBe(false)
    expect(result.login.redirect).toBe('/dashboard')
  })
})
