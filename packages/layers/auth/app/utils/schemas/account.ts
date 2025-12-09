import { z } from 'zod'
import { getRequiredAddressSchema } from '#forms/app/utils'

/**
 * Phone schema — broken into countryCode select + phone + ext
 * - countryCode: use ISO country code or dialing code; here we model ISO country codes in a small enum.
 *   If you want E.164 dialing codes instead (e.g., "+1", "+44"), swap to z.enum(['+1', '+44', ...]).
 */
export function getPhoneSchema() {
  // Example: limit to a small, common set. Expand or change to dialing codes if preferred.
  const CountryCodeEnum = z.enum(['CA', 'US', 'GB', 'AU', 'NZ'])

  return z.object({
    countryIso2: CountryCodeEnum,
    countryCode: z.string(),
    phoneNumber: z
      .string()
      // Basic normalization-friendly pattern; adapt as needed
      .regex(/^[0-9()\-\s]+$/, { message: 'Phone must contain digits and ( ) - or spaces' }),
    ext: z
      .string()
      .regex(/^[0-9]*$/, { message: 'Extension must be digits only' })
      .optional()
  })
}

export type PhoneSchema = z.output<ReturnType<typeof getPhoneSchema>>

/**
 * Account profile schema — single address + name + email + phone
 * Mirrors your .default(...) pattern.
 */
export function getAccountProfileSchema() {
  return z.object({
    address: getRequiredAddressSchema().default({
      street: '',
      streetAdditional: '',
      region: '',
      city: '',
      postalCode: '',
      country: 'CA',
      locationDescription: ''
    }),
    accountName: z.string().default(''),
    email: z.string().email().default(''),
    phone: getPhoneSchema().default({
      countryIso2: 'CA',
      countryCode: '1',
      phoneNumber: '',
      ext: ''
    })
  })
}

export type AccountProfileSchema = z.output<ReturnType<typeof getAccountProfileSchema>>
