export interface ConnectPayAccount {
  accountId: string
  accountName: string
  billable: boolean
  cfsAccount: {
    bankAccountNumber: string
    bankInstitutionNumber: string
    bankTransitNumber: string
    cfsAccountNumber: string
    cfsPartyNumber: string
    cfsSiteNumber: string
    paymentMethod: ConnectPayMethod
    status: ConnectPayCfsStatus
  }
  credit: number
  id: number
  padTosAcceptedBy: string
  padTosAcceptedDate: string
  paymentMethod: ConnectPayMethod
  version: number
}
