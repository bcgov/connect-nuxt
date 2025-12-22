export default {
  /* Ordering should be alphabetical unless otherwise specified */
  connect: {
    label: {
      address: 'Address',
      addressResidential: 'Residential Address',
      city: 'City',
      code: 'Code',
      country: 'Country',
      countryCode: 'Country Code',
      deliveryAddress: 'Delivery Address',
      deliveryInstructions: 'Delivery Instructions',
      deliveryInstructionsOpt: 'Delivery Instructions (Optional)',
      line1: 'Address Line 1',
      line2: 'Address Line 2 (Optional)',
      locationDescription: 'Location Description',
      locationDescriptionOpt: 'Location Description (Optional)',
      mailingAddress: 'Mailing Address',
      postalCode: 'Postal Code',
      province: 'Province',
      region: 'Region',
      regionOpt: 'Region (Optional)',
      sameAsMailAddress: 'Same as Mailing Address',
      sameAsDeliveryAddress: 'Same as Delivery Address',
      state: 'State',
      street: 'Street Address',
      streetAdditional: 'Additional Street Address (Optional)',
      streetName: 'Street Name',
      streetNumber: 'Street Number',
      unitNumber: 'Unit Number',
      unitNumberOpt: 'Unit Number (Optional)',
      zipCode: 'Zip Code'
    },
    text: {
      addressCanBePOBox: 'Street address, PO box, rural route, or general delivery address.',
      addressCannotBePOBox: 'Address cannot be a PO Box.'
    },
    validation: {
      fieldRequired: 'This field is required',
      maxChars: 'Maximum 0 characters | Maximum 1 character | Maximum {count} characters', // 0/1 most likely will never be used but required for pluralization
      minChars: 'Minimum 0 characters | Minimum 1 character | Minimum {count} characters', // 0/1 most likely will never be used but required for pluralization
      required: 'Required',
      invalidPostalCode: 'Enter a valid postal code',
      invalidPostalCodeFormat: 'Format must be A1A 1A1',
      invalidZipCodeFormat: 'Format must be 12345 or 12345-6789'
    }
  }
}
