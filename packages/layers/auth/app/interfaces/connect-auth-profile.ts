export interface ConnectAuthProfile {
  contacts: ConnectAuthContact[]
  created: ApiDateTimeUtc
  id: number
  idpUserid: string
  keycloakGuid: string
  lastname: string
  firstname?: string
  loginSource: ConnectLoginSource
  loginTime: ApiDateTimeUtc
  modified: ApiDateTimeUtc
  modifiedBy: string
  userStatus: number
  type: string // PUBLIC_USER - // TODO: get enum?
  userTerms: ConnectUserTerms
  username: string
  verified: boolean
  version: number
}

export interface ConnectUserTerms {
  isTermsOfUseAccepted: boolean
  termsOfUseAcceptedVersion: string
}
