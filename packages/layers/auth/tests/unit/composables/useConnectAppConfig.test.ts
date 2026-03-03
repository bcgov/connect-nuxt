/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'
import { ConnectPresetType } from '#auth/app/enums/connect-preset-type'
import type { ConnectConfig } from '#auth/app/interfaces/app-config-shapes'
import { useConnectAppConfig } from '#auth/app/composables/useConnectAppConfig'

mockNuxtImport('useAppConfig', () => () => ({
  connectOverrides: {
    bcscUser: {
      login: {
        idps: [ConnectIdpHint.BCSC],
        idpEnforcement: true
      }
    },
    defaultUser: {
      login: {
        idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
        idpEnforcement: false
      }
    }
  }
}))

const BASE_CONFIG: ConnectConfig = {
  login: {
    idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
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
    const result = mergeAppConfigOverrides(BASE_CONFIG as any, 'defaultUser' as ConnectPresetType)
    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR])
    expect(result.login.idpEnforcement).toBe(false)
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('applies "bcscUser" shallow merge', async () => {
    const result = mergeAppConfigOverrides(BASE_CONFIG as any, ConnectPresetType.BCSC_USER)

    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC])
    expect(result.login.idpEnforcement).toBe(true)
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('unknown preset → base unchanged', () => {
    const result = mergeAppConfigOverrides(BASE_CONFIG as any, 'unknown' as any)
    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR])
    expect(result.login.idpEnforcement).toBe(false)
    expect(result.login.redirect).toBe('/dashboard')
  })
})
