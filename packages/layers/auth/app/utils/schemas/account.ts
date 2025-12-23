import { z } from 'zod'
import { getRequiredAddressSchema } from '#forms/app/utils'

export function getAccountNameSchema(status?: number | undefined) {
  const t = useNuxtApp().$i18n.t

  return z.string().min(1, t('connect.validation.requiredAccountName'))
    .superRefine((val, ctx) => {
      // Only run if we have a value and a statusCode
      if (val && status !== undefined) {
        if (status === 200) {
          ctx.addIssue({
            code: 'custom',
            message: t('connect.validation.duplicateAccountName')
          })
        }
        if (status === 500) {
          ctx.addIssue({
            code: 'custom',
            message: t('connect.validation.requestError')
          })
        }
      // 204 (No Content) => valid -> no issue
      }
    })
}

/**
 * Phone schema: country dialing code + local phone + optional extension.
 * - countryCode: E.164 dialing code (e.g., "+1", "+44").
 * - phoneNumber: accepts common local formats (e.g., "(123) 456-7890").
 * - ext: digits only (optional).
 */
export function getPhoneSchema() {
  const t = useNuxtApp().$i18n.t

  return z.object({
    countryIso2: z.string(),
    countryCode: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: t('connect.validation.phoneNumberFormat') }),
    ext: z
      .string()
      .regex(/^[0-9]*$/, { message: t('connect.validation.phoneExtFormat') })
      .optional()
  })
}

/**
 * Account create schema — single address + name + email + phone
 * Mirrors your .default(...) pattern.
 */
export function getAccountCreateSchema(status: number | undefined = undefined) {
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
    accountName: getAccountNameSchema(status).default(''),
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
