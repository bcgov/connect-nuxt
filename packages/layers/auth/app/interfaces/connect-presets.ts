/** Overrides for the app.config subtree, not the full config. */
export interface ConnectPresetOverrides {
  login?: Partial<{
    redirect: string
    idps: ConnectIdpHint[]
    skipAccountRedirect: boolean
    idpEnforcement?: boolean
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
    idpEnforcement?: boolean
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
