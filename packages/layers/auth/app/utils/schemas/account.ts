import { z } from 'zod'
import { getRequiredAddressSchema } from '#forms/app/utils'

/**
 * Phone schema: country dialing code + local phone + optional extension.
 * - countryCode: E.164 dialing code (e.g., "+1", "+44").
 * - phoneNumber: accepts common local formats (e.g., "(123) 456-7890").
 * - ext: digits only (optional).
 */
export function getPhoneSchema() {
  return z.object({
    countryIso2: z.string(),
    countryCode: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: 'Phone must be in the format (123) 123-1231' }),
    ext: z
      .string()
      .regex(/^[0-9]*$/, { message: 'Extension must be digits only' })
      .optional()
  })
}

/**
 * Account create schema — single address + name + email + phone
 * Mirrors your .default(...) pattern.
 */
export function getAccountCreateSchema() {
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
    accountName: z.string().min(1, 'Account name is required').default(''),
    emailAddress: z.string().email().default(''),
    phone: getPhoneSchema().default({
      countryIso2: 'CA',
      countryCode: '1',
      phoneNumber: '',
      ext: ''
    })
  })
}

export type AccountProfileSchema = z.output<ReturnType<typeof getAccountCreateSchema>>
