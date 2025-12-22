import { z } from 'zod'

/**
 * Canadian postal code regex (eg, accepts A1A 1A1 or A1A1A1).
 * Ref: https://en.wikipedia.org/wiki/Postal_codes_in_Canada
 */
const CanadaPostalCodeRegex = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ ]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i
const CanadaPostalCodeFormatOnlyRegex = /^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/i

/**
 * US ZIP code regex (eg, accepts 12345 or 12345-6789).
 * Ref: https://faq.usps.com/s/article/ZIP-Code-The-Basics
*/
const USZipCodeRegex = /^\d{5}(?:-\d{4})?$/

export function getRequiredAddressSchema() {
  const t = useNuxtApp().$i18n.t

  return z.object({
    street: z
      .string()
      .min(1, t('connect.validation.fieldRequired'))
      .max(50, t('connect.validation.maxChars', { count: 50 })),
    streetAdditional: z
      .string()
      .max(50, t('connect.validation.maxChars', { count: 50 }))
      .optional(),
    city: z
      .string()
      .min(1, t('connect.validation.fieldRequired'))
      .max(40, t('connect.validation.maxChars', { count: 40 })),
    region: z
      .string()
      .optional(),
    postalCode: z
      .string()
      .max(15, t('connect.validation.maxChars', { count: 15 }))
      .optional(),
    country: z
      .string()
      .min(1, t('connect.validation.fieldRequired')),
    locationDescription: z
      .string()
      .max(80, t('connect.validation.maxChars', { count: 80 }))
      .optional()
  }).superRefine((data, ctx) => {
    const { country, region, postalCode } = data

    if (region && region.length > 2) {
      ctx.addIssue({
        code: 'custom',
        message: t('connect.validation.maxChars', { count: 2 }),
        path: ['region']
      })
    }

    const isRequiredRegion = country === 'US' || country === 'CA'

    if (isRequiredRegion) {
      if (!region) {
        ctx.addIssue({
          code: 'custom',
          message: t('connect.validation.fieldRequired'),
          path: ['region']
        })
      }

      if (!postalCode) {
        ctx.addIssue({
          code: 'custom',
          message: t('connect.validation.fieldRequired'),
          path: ['postalCode']
        })
      }
    }

    if (!postalCode) {
      return
    }

    if (country === 'CA') {
      if (!CanadaPostalCodeFormatOnlyRegex.test(postalCode)) {
        ctx.addIssue({
          code: 'custom',
          message: t('connect.validation.invalidPostalCodeFormat'),
          path: ['postalCode']
        })
      } else if (!CanadaPostalCodeRegex.test(postalCode)) {
        ctx.addIssue({
          code: 'custom',
          message: t('connect.validation.invalidPostalCode'),
          path: ['postalCode']
        })
      }
    } else if (country === 'US') {
      if (!USZipCodeRegex.test(postalCode)) {
        ctx.addIssue({
          code: 'custom',
          message: t('connect.validation.invalidZipCodeFormat'),
          path: ['postalCode']
        })
      }
    }
  })
}

export function getNonRequiredAddressSchema() {
  const t = useNuxtApp().$i18n.t

  return z.object({
    street: z
      .string()
      .min(1, t('connect.validation.fieldRequired'))
      .max(50, t('connect.validation.maxChars', { count: 50 }))
      .optional()
      .or(z.literal('')),
    streetAdditional: z
      .string()
      .max(50, t('connect.validation.maxChars', { count: 50 }))
      .optional(),
    city: z
      .string()
      .min(1, t('connect.validation.fieldRequired'))
      .max(40, t('connect.validation.maxChars', { count: 40 }))
      .optional()
      .or(z.literal('')),
    region: z
      .string()
      .optional(),
    postalCode: z
      .string()
      .max(15, t('connect.validation.maxChars', { count: 15 }))
      .optional(),
    country: z
      .string()
      .min(1, t('connect.validation.fieldRequired'))
      .optional()
      .or(z.literal('')),
    locationDescription: z
      .string()
      .max(80, t('connect.validation.maxChars', { count: 80 }))
      .optional()
  }).superRefine((data, ctx) => {
    // validate region based on country
    // required if country is US or CA
    // optional and max 2 characters if not US or CA
    // const country = data.country
    const region = data.region

    if (region && region.length > 2) {
      ctx.addIssue({
        code: 'custom',
        message: t('connect.validation.maxChars', { count: 2 }),
        path: ['region']
      })
    }
  })
}
