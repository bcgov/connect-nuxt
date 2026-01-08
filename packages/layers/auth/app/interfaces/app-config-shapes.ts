export interface ConnectLoginConfig {
  redirect: string
  idps: ConnectIdpHint[]
  skipAccountRedirect: boolean
  idpEnforcement: boolean
}

export interface ConnectLogoutConfig {
  redirect: string
}

export interface ConnectHeaderConfig {
  loginMenu: boolean
  createAccount: boolean
  notifications: boolean
  accountOptionsMenu: boolean
}

export interface ConnectConfig {
  login: ConnectLoginConfig
  logout: ConnectLogoutConfig
  header: ConnectHeaderConfig
}

export interface ConnectPresetOverrides {
  login?: Partial<ConnectLoginConfig>
  header?: Partial<ConnectHeaderConfig>
  logout?: Partial<ConnectLogoutConfig>
}
