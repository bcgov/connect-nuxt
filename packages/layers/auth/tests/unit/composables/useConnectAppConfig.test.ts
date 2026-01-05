import { describe, it, expect } from 'vitest'
import { ConnectIdpHint } from '#auth/app/enums/connect-idp-hint'
import type { ConnectConfig } from '#auth/app/interfaces/connect-presets'
import { CONNECT_PRESETS, mergeAppConfigPresetOverrides } from '#auth/app/composables/useConnectAppConfigs'

const BASE_CONFIG: ConnectConfig = {
  login: {
    idps: [ConnectIdpHint.BCSC, ConnectIdpHint.BCEID, ConnectIdpHint.IDIR],
    redirect: '/dashboard'
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

describe('CONNECT_PRESETS', () => {
  it('DEFAULT preset exposes all three IdPs', () => {
    const preset = CONNECT_PRESETS[ConnectPresetType.DEFAULT]
    expect(preset).toBeTruthy()
    expect(preset?.login?.idps).toEqual([
      ConnectIdpHint.BCSC,
      ConnectIdpHint.BCEID,
      ConnectIdpHint.IDIR
    ])
  })

  it('COLIN_USER preset exposes only BCSC', () => {
    const preset = CONNECT_PRESETS[ConnectPresetType.COLIN_USER]
    expect(preset).toBeTruthy()
    expect(preset?.login?.idps).toEqual([ConnectIdpHint.BCSC])
  })
})

describe('mergeAppConfigPresetOverrides()', () => {
  it('returns a new object (does not mutate base config)', () => {
    const baseCopy: ConnectConfig = JSON.parse(JSON.stringify(BASE_CONFIG))
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG, ConnectPresetType.DEFAULT)

    // different reference
    expect(result).not.toBe(BASE_CONFIG)

    // base remains unchanged
    expect(BASE_CONFIG).toEqual(baseCopy)
  })

  it('applies DEFAULT preset shallow merge', () => {
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG, ConnectPresetType.DEFAULT)

    // login subtree shallow-merged: idps from preset, keep redirect from base
    expect(result.login.idps).toEqual([
      ConnectIdpHint.BCSC,
      ConnectIdpHint.BCEID,
      ConnectIdpHint.IDIR
    ])
    expect(result.login.redirect).toBe('/dashboard')

    // header subtree shallow-merged (no overrides provided => keeps base)
    expect(result.header).toEqual({
      loginMenu: true,
      whatsNew: true,
      createAccount: true
    })

    // logout is passed through unchanged
    expect(result.logout).toEqual({ redirect: '/logged-out' })
  })

  it('applies COLIN_USER preset shallow merge', () => {
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG, ConnectPresetType.COLIN_USER)

    // login.idps replaced by preset - preserve other base login fields
    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC])
    expect(result.login.redirect).toBe('/dashboard')

    // header preserved (no header overrides in preset)
    expect(result.header).toEqual({
      loginMenu: true,
      whatsNew: true,
      createAccount: true
    })

    // logout preserved
    expect(result.logout).toEqual({ redirect: '/logged-out' })
  })

  it('falls back to DEFAULT preset for unknown preset names', () => {
    // @ts-expect-error - simulate an unknown preset
    const result = mergeAppConfigPresetOverrides(BASE_CONFIG, 'unknown')

    // same expectations as DEFAULT
    expect(result.login.idps).toEqual([
      ConnectIdpHint.BCSC,
      ConnectIdpHint.BCEID,
      ConnectIdpHint.IDIR
    ])
    expect(result.login.redirect).toBe('/dashboard')
  })

  it('handles base config without header gracefully (still shallow merges login, preserves logout)', () => {
    const baseWithoutHeader: ConnectConfig = {
      login: { idps: [ConnectIdpHint.BCEID], redirect: '/mock-foo' },
      // header intentionally missing
      logout: { redirect: '/mock-bar' }
    }

    const result = mergeAppConfigPresetOverrides(baseWithoutHeader, ConnectPresetType.DEFAULT)

    // login merge: preset idps + keep redirect
    expect(result.login.idps).toEqual([
      ConnectIdpHint.BCSC,
      ConnectIdpHint.BCEID,
      ConnectIdpHint.IDIR
    ])
    expect(result.login.redirect).toBe('/mock-foo')

    // header should remain undefined (no overrides in preset)
    expect(result.header).toBeUndefined()

    // logout preserved
    expect(result.logout).toEqual({ redirect: '/mock-bar' })
  })

  it('does not overwrite unrelated login fields when adding overrides', () => {
    const baseWithExtraLoginFields: ConnectConfig = {
      login: {
        idps: [ConnectIdpHint.IDIR],
        redirect: '/extra',
        // extra fields that should be retained
        extraFlag: true as unknown as undefined // adjust typing if needed
      },
      header: { loginMenu: false },
      logout: { redirect: '/logout' }
    }

    const result = mergeAppConfigPresetOverrides(baseWithExtraLoginFields, ConnectPresetType.COLIN_USER)

    // idps replaced by preset, other fields retained
    expect(result.login.idps).toEqual([ConnectIdpHint.BCSC])
    expect(result.login.redirect).toBe('/extra')
    expect((result.login).extraFlag).toBe(true)

    // header preserved
    expect(result.header).toEqual({ loginMenu: false })

    // logout preserved
    expect(result.logout).toEqual({ redirect: '/logout' })
  })
})
