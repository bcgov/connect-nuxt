/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'
import type { ConnectConfig } from '#auth/app/interfaces/connect-presets'

// 2) Now import the composable that calls useAppConfig()
import { mergeAppConfigPresetOverrides } from '#auth/app/composables/useConnectAppConfigs'

// 1) Register the mock BEFORE importing the module under test.
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
    idpEnforcement: false
  },
  header: {
    loginMenu: true,
    whatsNew: true,
    createAccount: true
  },
  logout: {
    redirect: '/logged-out'
  }
}

describe('mergeAppConfigPresetOverrides (connectPresets)', () => {
  beforeEach(() => {
    // If you change the mock per test, call vi.resetModules() and re-import.
    // For a single static mock, this isn’t necessary.
  })

  it('applies "defaultUser" shallow merge', () => {
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG as any, 'defaultUser')
    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR])
    expect(result.login.idpEnforcement).toBe(false)
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('applies "bcscUser" shallow merge', async () => {
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG as any, 'bcscUser')

    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC])
    expect(result.login.idpEnforcement).toBe(true)
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('unknown preset → base unchanged', () => {
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG as any, 'unknown' as any)
    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR])
    expect(result.login.idpEnforcement).toBe(false)
    expect(result.login.redirect).toBe('/dashboard')
  })
})
