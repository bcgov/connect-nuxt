export interface ConnectAccount {
  id: number
  accountType: AccountType
  accountStatus: AccountStatus
  additionalLabel?: string
  label: string
  type: UserSettingsType.ACCOUNT
  urlpath: string
  urlorigin: string
}

export interface ConnectCreateAccount {
  accessType: ConnectAccessType
  isBusinessAccount: boolean
  mailingAddress: ConnectAddress
  name: string
  paymentInfo: {
    paymentMethod: ConnectPaymentMethod
  }
  productSubscriptions: Array<{
    productCode: ConnectProductCode
  }>
}
