<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { z } from 'zod'
import type { UCalendar } from '#components'
import { CalendarDate } from '@internationalized/date'
import type { Form } from '@nuxt/ui'
import { DateTime } from 'luxon'

// FUTURE: update props as needed (disabled days)
const props = withDefaults(defineProps<{
  label: string
  id: string
  minDate?: string
  maxDate?: string
  required?: boolean
  /** Override the default i18n error messages **/
  errorRequired?: string
  errorMinDate?: string
  errorMaxDate?: string
  errorRange?: string
}>(), {
  required: true
})

const DATE_API_INPUT_FORMAT = 'yyyy-MM-dd'
const DATE_DISPLAY_FORMAT = 'MMMM d, yyyy'
const DATE_INPUT_FORMATS = [
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

type DateSchema = z.output<ReturnType<typeof getDateSchema>>
const dateSchema = getDateSchema(
  props.minDate,
  props.maxDate,
  props.required ?? true,
  {
    required: props.errorRequired,
    minDate: props.errorMinDate,
    maxDate: props.errorMaxDate,
    range: props.errorRange
  }
)
const dateModel = defineModel<string | null | undefined>({ required: true })

const formRef = useTemplateRef<Form<DateSchema>>('date-form')

const localState = reactive<DateSchema>({ dateInput: dateModel.value ?? '' })

const isCalendarOpen = ref(false)

const calendarMinValue = computed(() => toCalendarDate(props.minDate))
const calendarMaxValue = computed(() => toCalendarDate(props.maxDate))
const calendarValue = computed(() => toCalendarDate(localState.dateInput, DATE_DISPLAY_FORMAT))

function getDateSchema(
  minDate?: string,
  maxDate?: string,
  required = true,
  errorOverrides?: { required?: string, minDate?: string, maxDate?: string, range?: string }
) {
  function addBoundaryRefinement(
    schema: z.ZodString,
    boundaryDate: string,
    compare: (entered: DateTime, boundary: DateTime) => boolean,
    message: string
  ) {
    const boundary = DateTime.fromFormat(boundaryDate, DATE_API_INPUT_FORMAT)
    if (!boundary.isValid) {
      return schema
    }

    return schema.refine(
      (val) => {
        const entered = DateTime.fromFormat(val, DATE_DISPLAY_FORMAT)
        return !entered.isValid || compare(entered, boundary)
      },
      message
    )
  }

  let dateField = required
    ? z.string()
      .min(1, errorOverrides?.required ?? $t('connect.text.dateFormat'))
      .refine(val => DateTime.fromFormat(val, DATE_DISPLAY_FORMAT).isValid)
    : z.string()
      .refine(val => !val || DateTime.fromFormat(val, DATE_DISPLAY_FORMAT).isValid)

  if (minDate && maxDate) {
    const minBoundary = DateTime.fromFormat(minDate, DATE_API_INPUT_FORMAT)
    const maxBoundary = DateTime.fromFormat(maxDate, DATE_API_INPUT_FORMAT)
    if (minBoundary.isValid && maxBoundary.isValid) {
      const rangeMsg = errorOverrides?.range
        ?? $t('connect.validation.dateNotInRange', {
          minDate: minBoundary.toFormat(DATE_DISPLAY_FORMAT),
          maxDate: maxBoundary.toFormat(DATE_DISPLAY_FORMAT)
        })
      dateField = dateField.refine(
        (val) => {
          const entered = DateTime.fromFormat(val, DATE_DISPLAY_FORMAT)
          return !entered.isValid || (entered >= minBoundary && entered <= maxBoundary)
        },
        rangeMsg
      )
    }
  } else if (minDate) {
    const minBoundary = DateTime.fromFormat(minDate, DATE_API_INPUT_FORMAT)
    const minMsg = errorOverrides?.minDate
      ?? (
        minBoundary.isValid
          ? $t('connect.validation.dateNotBeforeMin', {
            date: minBoundary.toFormat(DATE_DISPLAY_FORMAT)
          })
          : ''
      )
    dateField = addBoundaryRefinement(
      dateField, minDate,
      (entered, boundary) => entered >= boundary,
      minMsg
    )
  } else if (maxDate) {
    const maxBoundary = DateTime.fromFormat(maxDate, DATE_API_INPUT_FORMAT)
    const maxMsg = errorOverrides?.maxDate
      ?? (
        maxBoundary.isValid
          ? $t('connect.validation.dateNotAfterMax', {
            date: maxBoundary.toFormat(DATE_DISPLAY_FORMAT)
          })
          : ''
      )
    dateField = addBoundaryRefinement(
      dateField, maxDate,
      (entered, boundary) => entered <= boundary,
      maxMsg
    )
  }

  return z.object({ dateInput: dateField })
}

function toCalendarDate(dateStr?: string, format = DATE_API_INPUT_FORMAT): CalendarDate | undefined {
  if (!dateStr) {
    return undefined
  }
  const dt = DateTime.fromFormat(dateStr, format)
  if (!dt.isValid) {
    return undefined
  }
  return new CalendarDate(dt.year, dt.month, dt.day)
}

function onDateSelect(date: DateValue | null | undefined) {
  if (!date) {
    return
  }
  const dt = DateTime.fromObject({ year: date.year, month: date.month, day: date.day })
  localState.dateInput = dt.toFormat(DATE_DISPLAY_FORMAT)
  syncModelFromLocal()
  isCalendarOpen.value = false
}

function normalizeDate(input: string): string {
  if (!input.trim()) {
    return input
  }

  const trimmed = input.trim()

  if (DateTime.fromFormat(trimmed, DATE_DISPLAY_FORMAT).isValid) {
    return trimmed
  }

  // Ensure space between letters and digits, and after commas
  const preprocessed = trimmed
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/,(\S)/g, ', $1')
    .replace(/\b([a-z])/g, (_, c) => c.toUpperCase())

  for (const fmt of DATE_INPUT_FORMATS) {
    const dt = DateTime.fromFormat(preprocessed, fmt)
    if (dt.isValid) {
      return dt.toFormat(DATE_DISPLAY_FORMAT)
    }
  }

  return trimmed
}

function syncModelFromLocal() {
  const trimmed = localState.dateInput.trim()

  if (!trimmed) {
    dateModel.value = ''
    return
  }

  const parsed = DateTime.fromFormat(trimmed, DATE_DISPLAY_FORMAT)
  if (!parsed.isValid) {
    return
  }

  const formattedDate = parsed.toFormat(DATE_API_INPUT_FORMAT)
  dateModel.value = formattedDate
}

onMounted(() => {
  const normalized = normalizeDate(localState.dateInput)
  if (normalized !== localState.dateInput) {
    localState.dateInput = normalized
  }
})

let debounceTimer: ReturnType<typeof setTimeout> | undefined
watch(() => localState.dateInput, (val: string) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (!val) {
      formRef.value?.validate({ silent: true })
      syncModelFromLocal()
      return
    }
    const normalized = normalizeDate(val)
    if (normalized !== val) {
      localState.dateInput = normalized
      await nextTick()
    }
    formRef.value?.validate({ silent: true })
    syncModelFromLocal()
  }, 500)
})

function clearDate() {
  localState.dateInput = ''
  syncModelFromLocal()
}

defineExpose({ formRef: formRef })
</script>

<template>
  <UForm
    ref="date-form"
    :schema="dateSchema"
    :state="localState"
    :validate-on="[]"
  >
    <UFormField
      name="dateInput"
      :ui="{ error: 'sr-only' }"
    >
      <template #default="{ error }">
        <UInput
          :id="`${id}-input`"
          v-model="localState.dateInput"
          class="w-full"
          placeholder="&nbsp;"
          :color="error ? 'error' : 'neutral'"
          :highlight="!!error"
          @blur="formRef?.validate({ silent: true })"
        >
          <label
            :for="`${id}-input`"
            class="floating-label-input"
          >
            {{ label }}
          </label>
          <template #trailing>
            <UButton
              v-if="localState.dateInput"
              icon="i-mdi-close"
              :color="error ? 'error' : 'neutral'"
              variant="ghost"
              tabindex="0"
              :class="['icon-btn', { 'icon-btn-error': !!error }]"
              :ui="{ base: 'size-7 p-0 flex items-center justify-center icon-btn-focus' }"
              :aria-label="$t('connect.label.clear')"
              @click="clearDate"
            />
            <UPopover v-model:open="isCalendarOpen" :content="{ side: 'top' }">
              <UButton
                icon="i-mdi-calendar"
                color="neutral"
                variant="ghost"
                tabindex="0"
                class="icon-btn"
                :aria-label="$t('connect.label.selectDate')"
              />
              <template #content>
                <UCalendar
                  :model-value="calendarValue"
                  :min-value="calendarMinValue"
                  :max-value="calendarMaxValue"
                  @update:model-value="onDateSelect"
                />
              </template>
            </UPopover>
          </template>
        </UInput>
        <p :class="['mt-1 text-sm flex items-center gap-1', error ? 'text-error' : 'text-neutral']">
          <UIcon
            v-if="error"
            name="i-mdi-alert"
            class="size-4 shrink-0"
          />
          {{ error || $t('connect.text.dateFormat') }}
        </p>
      </template>
    </UFormField>
  </UForm>
</template>

<style scoped>
:deep(.icon-btn) {
  color: var(--ui-primary);
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.icon-btn-error) {
  color: var(--ui-error);
}

:deep(.icon-btn:focus-visible) {
  box-shadow: 0 0 0 2px var(--ui-primary);
  border-radius: 1px;
}
</style>
