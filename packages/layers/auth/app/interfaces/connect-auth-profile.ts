export interface ConnectAuthProfile {
  contacts: ConnectAuthContact[]
  created: string // utc date
  id: number
  idpUserid: string
  keycloakGuid: string
  lastname: string
  firstname?: string
  loginSource: ConnectLoginSource
  loginTime: string // utc date
  modified: string // utc date
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
