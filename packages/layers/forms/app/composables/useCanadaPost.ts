/* eslint-disable @typescript-eslint/no-explicit-any */

export const useCanadaPost = () => {
  const activeAddressField = ref<string>()
  const address = reactive<ConnectAddress>({
    street: '',
    streetAdditional: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    locationDescription: '',
    streetName: '',
    streetNumber: '',
    unitNumber: ''
  })

  const createAddressComplete = (
    pca: any, key: string, id: string, countryIso2: string, countrySelect: boolean
  ): object => {
    const fields = [
      { element: id, field: 'Line1', mode: pca.fieldMode.SEARCH }
    ]
    // Conditional to only allow country selection depending on control
    const bar = countrySelect ? { visible: true, showCountry: true } : {}
    const countries = {
      defaultCode: countryIso2,
      ...(countrySelect ? {} : { codesList: 'CA' })
    }
    const options = { key, bar, countries }
    const addressComplete = new pca.Address(fields, options)
    addressComplete.listen('populate', addressCompletePopulate)
    return addressComplete
  }

  const enableAddressComplete = (id: string, countryIso2: string, countrySelect: boolean): void => {
    activeAddressField.value = id
    const config = useRuntimeConfig()
    const pca = (window as any).pca
    const key = config.public.addressCompleteKey as string
    if (!pca || !key) {
      console.warn('AddressComplete not initialized due to missing script and/or key')
      return
    }
    destroyAddressComplete();

    (window as any).currentAddressComplete = createAddressComplete(pca, key, id, countryIso2, countrySelect)
  }

  const addressCompletePopulate = (addressComplete: CanadaPostAddressResponse): void => {
    address.street = addressComplete.Line1 || 'N/A'
    address.streetAdditional = addressComplete.Line2 || ''
    address.city = addressComplete.City
    address.region = addressComplete.ProvinceCode
    address.postalCode = addressComplete.PostalCode
    address.country = addressComplete.CountryIso2
    address.streetName = addressComplete.Street
    address.streetNumber = addressComplete.BuildingNumber
    address.unitNumber = addressComplete.SubBuilding
  }

  const destroyAddressComplete = () => {
    if ((window as any).currentAddressComplete) {
      (window as any).currentAddressComplete.destroy()
    }
  }

  return {
    activeAddressField,
    address,
    enableAddressComplete,
    destroyAddressComplete
  }
}
