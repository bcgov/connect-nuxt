<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { UCalendar } from '#components'
import { CalendarDate } from '@internationalized/date'
import { DateTime } from 'luxon'

const props = withDefaults(defineProps<{
  label: string
  id: string
  minDate?: string
  maxDate?: string
  disabled?: boolean
  error?: boolean
}>(), {})

const { locale } = useI18n()

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

const dateModel = defineModel<string | null | undefined>({ required: true })

const localState = reactive({ dateInput: dateModel.value ?? '' })

const isCalendarOpen = ref(false)

const calendarMinValue = computed(() => toCalendarDate(props.minDate))
const calendarMaxValue = computed(() => toCalendarDate(props.maxDate))
const calendarValue = computed(() => toCalendarDate(localState.dateInput, DATE_DISPLAY_FORMAT))

const activeLocale = computed(() => {
  if (typeof locale === 'string') {
    return locale
  }
  return locale.value || 'en-CA'
})

function parseDate(dateStr: string, format: string): DateTime {
  return DateTime.fromFormat(dateStr, format, { locale: activeLocale.value })
}

function formatDate(date: DateTime, format: string): string {
  return date.setLocale(activeLocale.value).toFormat(format)
}

function toCalendarDate(dateStr?: string, format = DATE_API_INPUT_FORMAT): CalendarDate | undefined {
  if (!dateStr) {
    return undefined
  }
  const dt = parseDate(dateStr, format)
  if (!dt.isValid) {
    return undefined
  }
  return new CalendarDate(dt.year, dt.month, dt.day)
}

function onDateSelect(date: DateValue | null | undefined) {
  if (!date) {
    return
  }
  if (Array.isArray(date) || 'start' in date) {
    return
  }
  const dt = DateTime.fromObject({ year: date.year, month: date.month, day: date.day }, { locale: activeLocale.value })
  localState.dateInput = formatDate(dt, DATE_DISPLAY_FORMAT)
  syncModelFromLocal()
  isCalendarOpen.value = false
}

function normalizeDate(input: string): string {
  if (!input.trim()) {
    return input
  }

  const trimmed = input.trim()

  if (parseDate(trimmed, DATE_DISPLAY_FORMAT).isValid) {
    return trimmed
  }

  // Ensure space between letters and digits, and after commas
  const preprocessed = trimmed
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/,(\S)/g, ', $1')
    .replace(/\b([a-z])/g, (_, c) => c.toUpperCase())

  for (const fmt of DATE_INPUT_FORMATS) {
    const dt = parseDate(preprocessed, fmt)
    if (dt.isValid) {
      return formatDate(dt, DATE_DISPLAY_FORMAT)
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

  const parsed = parseDate(trimmed, DATE_DISPLAY_FORMAT)
  if (!parsed.isValid) {
    return
  }

  const formattedDate = formatDate(parsed, DATE_API_INPUT_FORMAT)
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
      syncModelFromLocal()
      return
    }
    const normalized = normalizeDate(val)
    if (normalized !== val) {
      localState.dateInput = normalized
      await nextTick()
    }
    syncModelFromLocal()
  }, 500)
})

function clearDate() {
  localState.dateInput = ''
  syncModelFromLocal()
}
</script>

<template>
  <div>
    <UInput
      :id="`${id}-input`"
      v-model="localState.dateInput"
      :disabled="disabled"
      class="w-full"
      placeholder="&nbsp;"
      :aria-invalid="error"
    >
      <label
        :for="`${id}-input`"
        :class="['floating-label-input', { 'text-red-500': error }]"
      >
        {{ label }}
      </label>
      <template #trailing>
        <UButton
          v-if="localState.dateInput && !disabled"
          icon="i-mdi-close"
          :color="error ? 'error' : 'neutral'"
          variant="ghost"
          tabindex="0"
          :ui="{ base: 'size-7 p-0 flex items-center justify-center icon-btn-focus' }"
          :aria-label="$t('connect.label.clear')"
          @click="clearDate"
        />
        <UPopover v-model:open="isCalendarOpen" :content="{ side: 'top' }">
          <UButton
            icon="i-mdi-calendar"
            :disabled="disabled"
            :color="error && !localState.dateInput ? 'error' : 'neutral'"
            variant="ghost"
            tabindex="0"
            :ui="{ base: 'size-7 p-0 flex items-center justify-center icon-btn-focus' }"
            :aria-label="$t('connect.label.selectDate')"
          />
          <template #content>
            <UCalendar
              :model-value="calendarValue"
              :min-value="calendarMinValue"
              :max-value="calendarMaxValue"
              initial-focus
              @update:model-value="onDateSelect"
            />
          </template>
        </UPopover>
      </template>
    </UInput>
  </div>
</template>

<style scoped>
:deep(.icon-btn-focus) {
  outline: none;
}

:deep(.icon-btn-focus:focus-visible) {
  box-shadow: 0 0 0 2px var(--ui-primary);
  border-radius: 1px;
}
</style>
