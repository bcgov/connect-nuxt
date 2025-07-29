export interface ConnectAuthUser {
  firstName: string
  lastName: string
  fullName: string
  userName: string
  email: string
  keycloakGuid: string // sub
  loginSource: ConnectLoginSource
  roles: string[]
}
