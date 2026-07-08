type IdpList = Array<'bcsc' | 'bceid' | 'idir'>

export interface ConnectLoginConfig {
  redirect: string
  idps: IdpList
  skipAccountRedirect: boolean
  idpEnforcement: boolean
  alert?: {
    title?: string
    message?: string
  }
}

export interface ConnectLoginConfigInput extends Omit<ConnectLoginConfig, 'idps'> {
  idps: IdpList | (() => IdpList)
}

export interface ConnectLogoutConfig {
  redirect: string
}

export interface ConnectHeaderConfig {
  loginMenu?: boolean
  createAccount?: boolean
  notifications?: boolean
  accountOptionsMenu?: boolean
  localeSelect?: boolean
  whatsNew?: boolean
}

export interface ConnectFooterConfig {
  versions?: string[]
}

export interface ConnectConfig {
  login: ConnectLoginConfig
  logout: ConnectLogoutConfig
  header: ConnectHeaderConfig
  footer?: ConnectFooterConfig
}

export interface ConnectConfigInput {
  login?: Partial<ConnectLoginConfigInput>
  logout?: Partial<ConnectLogoutConfig>
  header?: Partial<ConnectHeaderConfig>
  footer?: Partial<ConnectFooterConfig>
}

export interface ConnectPresetOverrides {
  login?: Partial<ConnectLoginConfig>
  header?: Partial<ConnectHeaderConfig>
  logout?: Partial<ConnectLogoutConfig>
}
