import { z } from 'zod'
import { getRequiredAddressSchema } from '#forms/app/utils'

export function getAccountNameSchema(status?: number | undefined) {
  const t = useNuxtApp().$i18n.t

  return z.string().min(1, t('connect.validation.requiredAccountName'))
    .superRefine((val, ctx) => {
      // Validate account name uniqueness based on API response status code
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
    emailAddress: z.email().default(''),
    phone: getPhoneSchema().default({
      countryIso2: 'CA',
      countryCode: '1',
      phoneNumber: '',
      ext: ''
    })
  })
}

export type AccountProfileSchema = z.output<ReturnType<typeof getAccountCreateSchema>>

export function formatCreateAccountPayload(
  data: AccountProfileSchema
): {
  accountPayload: ConnectCreateAccount
  contactPayload: { email: string, phone: string, phoneExtension: string | undefined }
} {
  const accountPayload = {
    accessType: ConnectAccessType.REGULAR,
    mailingAddress: {
      city: data.address.city,
      country: data.address.country,
      region: data.address.region ?? '',
      postalCode: data.address.postalCode ?? '',
      street: data.address.street,
      streetAdditional: data.address.streetAdditional || '',
      deliveryInstructions: data.address.locationDescription || ''
    },
    name: data.accountName,
    paymentInfo: { paymentMethod: ConnectPaymentMethod.DIRECT_PAY },
    productSubscriptions: [{ productCode: ConnectProductCode.BUSINESS }]
  }

  const contactPayload = {
    email: data.emailAddress,
    phone: data.phone.phoneNumber,
    phoneExtension: data.phone.ext
  }

  return { accountPayload, contactPayload }
}
