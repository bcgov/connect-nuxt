/** Overrides for the app.config subtree, not the full config. */
export interface ConnectPresetOverrides {
  login?: Partial<{
    redirect: string
    idps: ConnectIdpHint[]
    skipAccountRedirect: boolean
    idpEnforcement?: 'strict' | 'soft'
  }>
  header?: Partial<{
    loginMenu: boolean
    createAccount: boolean
    notifications: boolean
    accountOptionsMenu: boolean
  }>
  logout?: Partial<{
    redirect: string
  }>
}

export interface ConnectConfig {
  login: {
    redirect: string
    idps: ConnectIdpHint[]
    skipAccountRedirect: boolean
    idpEnforcement?: 'strict' | 'soft'
  }
  logout: {
    redirect: string
  }
  header: {
    loginMenu: boolean
    createAccount: boolean
    notifications: boolean
    accountOptionsMenu: boolean
  }
}
