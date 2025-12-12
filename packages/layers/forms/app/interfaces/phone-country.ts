export interface Phone {
  countryIso2?: string
  countryCode?: string
  number: string
  extension?: string
}

export interface PhoneCountry {
  callingCode: string
  iso2?: string
  label?: string
  nameLocal?: string
  nameEn?: string
}
