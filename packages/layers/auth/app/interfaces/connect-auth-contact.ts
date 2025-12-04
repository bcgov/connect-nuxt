export interface ConnectAuthContact {
  email: string
  phone: string
  phoneExtension: string
  city?: string
  country?: string
  street?: string
  streetAdditional?: string
  postalCode?: string
  region?: string
}

export interface ConnectAuthContacts {
  contacts: ConnectAuthContact[]
}
