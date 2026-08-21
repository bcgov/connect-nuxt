import { z } from 'zod'
import { DateTime } from 'luxon'

export const DATE_API_INPUT_FORMAT = 'yyyy-MM-dd'
export const DATE_DISPLAY_FORMAT = 'MMMM d, yyyy'

export const DATE_INPUT_FORMATS = [
  'MMMM d, yyyy',
  'MMMM d yyyy',
  'MMM d, yyyy',
  'MMM d yyyy',
  'M/d/yyyy',
  'MM/dd/yyyy',
  'yyyy-MM-dd',
  'd MMMM yyyy',
  'd MMM yyyy'
]

type DateSchemaOptions = {
  minDate?: string
  maxDate?: string
  required?: boolean
  messages?: {
    invalidDate?: string
    minDate?: string
    maxDate?: string
    dateRange?: string
    required?: string
  }
}

export function getDateSchema(options: DateSchemaOptions = {}) {
  const {
    minDate,
    maxDate,
    required = true,
    messages = {}
  } = options

  const { t } = useI18n()

  function addBoundaryRefinement(
    schema: z.ZodString,
    boundaryDate: string,
    compare: (entered: DateTime, boundary: DateTime) => boolean,
    message: string
  ) {
    const boundary = DateTime.fromFormat(
      boundaryDate,
      DATE_API_INPUT_FORMAT
    )

    if (!boundary.isValid) {
      return schema
    }

    return schema.refine(
      (val) => {
        const entered = parseInputDate(val)

        // Invalid formats are handled by the format refinement.
        return !entered || compare(entered, boundary)
      },
      message
    )
  }

  const base = required
    ? z.string().min(1, messages.required ? messages.required : t('connect.validation.fieldRequired'))
    : z.string()

  const invalidDateMsg = messages.invalidDate ?? t('connect.validation.invalidDate')
  let dateField = base.refine(
    val => !val || !!parseInputDate(val),
    invalidDateMsg
  )

  if (minDate && maxDate) {
    const minBoundary = DateTime.fromFormat(
      minDate,
      DATE_API_INPUT_FORMAT
    )

    const maxBoundary = DateTime.fromFormat(
      maxDate,
      DATE_API_INPUT_FORMAT
    )

    if (minBoundary.isValid && maxBoundary.isValid) {
      const rangeMsg = messages.dateRange
        ? messages.dateRange
        : t('connect.validation.dateNotInRange', {
          minDate: minBoundary.toFormat(DATE_DISPLAY_FORMAT),
          maxDate: maxBoundary.toFormat(DATE_DISPLAY_FORMAT)
        })

      dateField = dateField.refine(
        (val) => {
          const entered = parseInputDate(val)

          // Invalid formats are handled by the format refinement.
          return !entered
            || (
              entered >= minBoundary
              && entered <= maxBoundary
            )
        },
        rangeMsg
      )
    }
  } else if (minDate) {
    const minBoundary = DateTime.fromFormat(
      minDate,
      DATE_API_INPUT_FORMAT
    )

    const minMsg = minBoundary.isValid
      ? messages.minDate
        ? messages.minDate
        : t('connect.validation.dateNotBeforeMin', {
          date: minBoundary.toFormat(DATE_DISPLAY_FORMAT)
        })
      : ''

    dateField = addBoundaryRefinement(
      dateField,
      minDate,
      (entered, boundary) => entered >= boundary,
      minMsg
    )
  } else if (maxDate) {
    const maxBoundary = DateTime.fromFormat(
      maxDate,
      DATE_API_INPUT_FORMAT
    )

    const maxMsg = maxBoundary.isValid
      ? messages.maxDate
        ? messages.maxDate
        : t('connect.validation.dateNotAfterMax', {
          date: maxBoundary.toFormat(DATE_DISPLAY_FORMAT)
        })
      : ''

    dateField = addBoundaryRefinement(
      dateField,
      maxDate,
      (entered, boundary) => entered <= boundary,
      maxMsg
    )
  }

  return z.object({
    dateInput: dateField
  })
}

/**
 * Parses a user-entered date using any supported input format.
 */
export function parseInputDate(
  dateStr?: string
): DateTime | undefined {
  if (!dateStr) {
    return undefined
  }

  for (const format of DATE_INPUT_FORMATS) {
    const parsed = DateTime.fromFormat(
      dateStr.trim(),
      format
    )

    if (parsed.isValid) {
      return parsed
    }
  }

  return undefined
}
