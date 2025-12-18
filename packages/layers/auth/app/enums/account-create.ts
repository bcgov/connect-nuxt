/** Fixed values used in payload */
// ToDo: update as required
export enum AccessType {
  REGULAR = 'REGULAR'
}

export enum PaymentMethod {
  DIRECT_PAY = 'DIRECT_PAY'
}

export enum ProductCode {
  BUSINESS = 'BUSINESS'
}

export enum ProductTypeCode {
  PREMIUM = 'PREMIUM'
}

/** Mailing address */
export interface AccountMailingAddress {
  city: string
  country: string
  region: string
  postalCode: string
  street: string
  streetAdditional?: string
  deliveryInstructions?: string
}
