import { describe, it, expect } from 'vitest'
import { getRequiredAddressSchema, getNonRequiredAddressSchema } from '../../../../app/utils'

describe('zod schemas - address validation', () => {
  describe('getRequiredAddressSchema', () => {
    const schema = getRequiredAddressSchema()

    const validAddress = {
      street: '123 Main St',
      city: 'Victoria',
      region: 'BC',
      postalCode: 'V8V 1A1',
      country: 'CA'
    }

    it('should pass with a valid address', () => {
      const result = schema.safeParse(validAddress)
      expect(result.success).toBe(true)
    })

    it('should fail if a required field is missing', () => {
      const invalidAddress = { ...validAddress, street: '' }
      const result = schema.safeParse(invalidAddress)

      expect(result.success).toBe(false)
      const streetError = result.error?.issues.find(i => i.path[0] === 'street')
      expect(streetError?.message).toBe('This field is required')
    })

    it('should fail if region is missing for Canada', () => {
      const invalidAddress = { ...validAddress, region: '' }
      const result = schema.safeParse(invalidAddress)

      expect(result.success).toBe(false)
      const regionError = result.error?.issues.find(i => i.path[0] === 'region')
      expect(regionError?.message).toBe('This field is required')
    })

    it('should fail if region is missing for the US', () => {
      const invalidAddress = { ...validAddress, country: 'US', region: '' }
      const result = schema.safeParse(invalidAddress)

      expect(result.success).toBe(false)
      const regionError = result.error?.issues.find(i => i.path[0] === 'region')
      expect(regionError?.message).toBe('This field is required')
    })

    it('should pass if region is missing for a country other than CA or US', () => {
      const otherCountryAddress = { ...validAddress, country: 'FR', region: '' }
      const result = schema.safeParse(otherCountryAddress)
      expect(result.success).toBe(true)
    })

    it('should fail if region has more than 2 characters', () => {
      const invalidAddress = { ...validAddress, region: 'ABC' }
      const result = schema.safeParse(invalidAddress)

      expect(result.success).toBe(false)
      const regionError = result.error?.issues.find(i => i.path[0] === 'region')
      expect(regionError?.message).toBe('Maximum 2 characters')
    })

    it('should fail if street exceeds max length', () => {
      const longStreet = 'a'.repeat(51)
      const invalidAddress = { ...validAddress, street: longStreet }

      const result = schema.safeParse(invalidAddress)

      expect(result.success).toBe(false)

      const streetError = result.error?.issues.find(i => i.path[0] === 'street')
      expect(streetError?.message).toBe('Maximum 50 characters')
    })

    describe('Postal Code Format', () => {
      const invalidPostalCodeMessage = 'Invalid Postal Code format (e.g., 1X1 X1X)'
      const invalidZipMessage = 'Invalid ZIP Code format (e.g., 12345 or 12345-6789)'

      it('should pass a valid CA postal code (with space)', () => {
        const caAddress = { ...validAddress, postalCode: 'T2R 1E8', country: 'CA', region: 'AB' }
        const result = schema.safeParse(caAddress)
        expect(result.success).toBe(true)
      })

      it('should pass a valid CA postal code (without space)', () => {
        const caAddress = { ...validAddress, postalCode: 'T2R1E8', country: 'CA', region: 'AB' }
        const result = schema.safeParse(caAddress)
        expect(result.success).toBe(true)
      })

      it('should fail an invalid CA postal code (invalid letter)', () => {
        // 'I' is invalid
        const invalidCaAddress = { ...validAddress, postalCode: 'I5A 1S6', country: 'CA', region: 'BC' }
        const result = schema.safeParse(invalidCaAddress)

        expect(result.success).toBe(false)
        const error = result.error?.issues.find(i => i.path[0] === 'postalCode')
        expect(error?.message).toBe(invalidPostalCodeMessage)
      })

      it('should fail an invalid CA postal code (too short)', () => {
        const invalidCaAddress = { ...validAddress, postalCode: 'T2R', country: 'CA', region: 'BC' }
        const result = schema.safeParse(invalidCaAddress)

        expect(result.success).toBe(false)
        const error = result.error!.issues.find(i => i.path[0] === 'postalCode')
        expect(error!.message).toBe(invalidPostalCodeMessage)
      })

      it('should fail if postal code is missing for CA', () => {
        const invalidAddress = { ...validAddress, postalCode: '', region: 'BC', country: 'CA' }
        const result = schema.safeParse(invalidAddress)

        expect(result.success).toBe(false)
        const error = result.error!.issues.find(i => i.path[0] === 'postalCode')
        expect(error!.message).toBe('This field is required')
      })

      it('should fail if postal code is undefined for CA', () => {
        const invalidAddress = { ...validAddress, postalCode: undefined, region: 'BC', country: 'CA' }
        const result = schema.safeParse(invalidAddress)

        expect(result.success).toBe(false)
        const error = result.error!.issues.find(i => i.path[0] === 'postalCode')
        expect(error!.message).toBe('This field is required')
      })

      it('should pass a valid US ZIP code', () => {
        const usAddress = { ...validAddress, postalCode: '90210', country: 'US', region: 'CA' }
        const result = schema.safeParse(usAddress)
        expect(result.success).toBe(true)
      })

      it('should pass a valid US ZIP code (ZIP+4)', () => {
        const usAddress = { ...validAddress, postalCode: '90210-5555', country: 'US', region: 'CA' }
        const result = schema.safeParse(usAddress)
        expect(result.success).toBe(true)
      })

      it('should fail an invalid US ZIP code (too short)', () => {
        const invalidUsAddress = { ...validAddress, postalCode: '1234', country: 'US', region: 'CA' }
        const result = schema.safeParse(invalidUsAddress)

        expect(result.success).toBe(false)
        const error = result.error!.issues.find(i => i.path[0] === 'postalCode')
        expect(error!.message).toBe(invalidZipMessage)
      })

      it('should fail an invalid US ZIP code (incomplete)', () => {
        const invalidUsAddress = { ...validAddress, postalCode: '12345-6', country: 'US', region: 'CA' }
        const result = schema.safeParse(invalidUsAddress)

        expect(result.success).toBe(false)
        const error = result.error?.issues.find(i => i.path[0] === 'postalCode')
        expect(error?.message).toBe(invalidZipMessage)
      })

      it('should pass an empty postal code with a non CA or US country', () => {
        const validPCAddress = { ...validAddress, postalCode: '', country: 'XX', region: 'XX' }
        const result = schema.safeParse(validPCAddress)
        expect(result.success).toBe(true)
      })

      it('should pass an undefined postal code with a non CA or US country', () => {
        const validPCAddress = { ...validAddress, postalCode: undefined, country: 'XX', region: 'XX' }
        const result = schema.safeParse(validPCAddress)
        expect(result.success).toBe(true)
      })

      it('should fail if non CA/US postal code is greater than 15 characters', () => {
        const longCode = 'A'.repeat(16)
        const longPCAddress = { ...validAddress, postalCode: longCode, country: 'DE', region: 'BY' }
        const result = schema.safeParse(longPCAddress)

        expect(result.success).toBe(false)
        const error = result.error?.issues.find(i => i.path[0] === 'postalCode')
        expect(error?.message).toBe('Maximum 15 characters')
      })

      it('should fail a US ZIP+4 with whitespace instead of "-" separator', () => {
        const usAddress = { ...validAddress, postalCode: '90210 5555', country: 'US', region: 'CA' }
        const result = schema.safeParse(usAddress)
        const error = result.error!.issues.find(i => i.path[0] === 'postalCode')
        expect(error!.message).toBe(invalidZipMessage)
        expect(result.success).toBe(false)
      })

      it('should fail an invalid US ZIP code with double space', () => {
        const invalidUsAddress = { ...validAddress, postalCode: '90210  5555', country: 'US', region: 'CA' }
        const result = schema.safeParse(invalidUsAddress)

        expect(result.success).toBe(false)
        const error = result.error!.issues.find(i => i.path[0] === 'postalCode')
        expect(error!.message).toBe(invalidZipMessage)
      })
    })
  })

  describe('getNonRequiredAddressSchema', () => {
    const schema = getNonRequiredAddressSchema()

    it('should pass if all fields are empty strings or optional fields are missing', () => {
      const emptyAddress = {
        street: '',
        city: '',
        postalCode: '',
        country: ''
      }
      const result = schema.safeParse(emptyAddress)
      expect(result.success).toBe(true)
    })

    it('should fail if region has more than 2 characters', () => {
      const invalidAddress = {
        street: '',
        city: '',
        postalCode: '',
        country: '',
        region: 'ABC'
      }
      const result = schema.safeParse(invalidAddress)

      expect(result.success).toBe(false)
      const regionError = result.error?.issues.find(i => i.path[0] === 'region')
      expect(regionError?.message).toBe('Maximum 2 characters')
    })

    it('should pass even if country is provided but region is not', () => {
      const partialAddress = {
        street: '123 Main St',
        city: 'Victoria',
        postalCode: 'V8V 1A1',
        country: 'CA',
        region: ''
      }
      const result = schema.safeParse(partialAddress)
      expect(result.success).toBe(true)
    })

    it('should pass if the address is partially filled', () => {
      const partialAddress = {
        street: '123 Main St',
        city: '',
        region: '',
        postalCode: '',
        country: ''
      }
      const result = schema.safeParse(partialAddress)
      expect(result.success).toBe(true)
    })
  })
})
