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
  accessType: AccessType
  isBusinessAccount: boolean
  mailingAddress: AccountMailingAddress
  name: string
  paymentInfo: {
    paymentMethod: PaymentMethod
  }
  productSubscriptions: Array<{
    productCode: ProductCode
  }>
}
