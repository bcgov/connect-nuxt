<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { DateRange } from 'reka-ui'
import { CalendarDate } from '@internationalized/date'
import { DateTime } from 'luxon'
import { DATE_API_INPUT_FORMAT, DATE_DISPLAY_FORMAT, DATE_INPUT_FORMATS } from '../../../utils/schemas/date'

const props = defineProps<{
  label: string
  minDate?: string
  maxDate?: string
  disabled?: boolean
  // accessibility hint (sets aria-required) only — does not enforce anything.
  // actual required/optional validation comes from getDateSchema({ required }) in
  // utils/schemas/date.ts and must be kept in sync with this prop by the consumer
  required?: boolean
  // string form is announced to screen readers via the role="alert" span below;
  // pass a boolean if you only want the red/invalid styling with no announcement
  error?: boolean | string
  // announced (politely, i.e. non-interrupting) via the role="status" span below
  // whenever there is no error; pass the same text given to the wrapping
  // UFormField's `help` prop so it reads consistently with what's shown visually
  help?: string
}>()

const { locale } = useI18n()

// wires the input up to the wrapping UFormField (if any): aria-describedby/
// aria-invalid derived from its help/error text, and blur reported onto the
// form's validation bus. Calling this here (rather than leaving it to the
// inner UInput) makes the relationship explicit and independent of UInput's
// own internal wiring.
const { ariaAttrs, emitFormBlur } = useFormField()

const dateModel = defineModel<string>()

const inputId = `date-input-${useId()}`

const dateInput = ref(dateModel.value ?? '')

const isCalendarOpen = ref(false)
// tracked (rather than read directly off the DOM) so the help live-region below
// can gate on it, forcing a fresh content change - and therefore an announcement -
// on every focus, regardless of whether a given screen reader reads
// aria-describedby content automatically
const hasFocus = ref(false)
// tracks whether the calendar opened from input focus (suppresses auto-focus into calendar)
let calendarOpenedViaInput = false
const inputWrapperRef = useTemplateRef<HTMLElement>('inputWrapperRef')
const calendarContentRef = useTemplateRef<HTMLElement>('calendarContentRef')
let suppressCloseAutoFocus = false
let suppressOpenOnFocus = false

function onCloseAutoFocus(e: Event) {
  if (suppressCloseAutoFocus) {
    e.preventDefault()
    suppressCloseAutoFocus = false
  }
}

function ignoreInputInteraction(e: Event) {
  if (inputWrapperRef.value?.contains(e.target as Node)) {
    e.preventDefault()
  }
}

function onInputBlur(e: FocusEvent) {
  emitFormBlur()
  hasFocus.value = false
  if (calendarContentRef.value?.contains(e.relatedTarget as Node)) {
    return
  }
  suppressCloseAutoFocus = true
  isCalendarOpen.value = false
}

function focusCalendarGrid() {
  nextTick(() => {
    calendarContentRef.value?.querySelector<HTMLElement>('button:not([disabled])')?.focus()
  })
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.key !== 'ArrowDown' || !isCalendarOpen.value) {
    return
  }
  event.preventDefault()
  focusCalendarGrid()
}

const calendarMinValue = computed(() => toCalendarDate(props.minDate))
const calendarMaxValue = computed(() => toCalendarDate(props.maxDate))
const calendarValue = computed(() => toCalendarDate(dateInput.value, DATE_DISPLAY_FORMAT))

const isDateUnavailable = (date: DateValue): boolean => {
  return (
    (!!calendarMinValue.value
      && date.compare(calendarMinValue.value) < 0)
    || (!!calendarMaxValue.value
      && date.compare(calendarMaxValue.value) > 0)
  )
}

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

function getInputEl(): HTMLInputElement | null | undefined {
  return inputWrapperRef.value?.querySelector<HTMLInputElement>(`#${inputId}`)
}

// programmatic value changes (calendar select, clear) don't fire native
// input/blur events, so UInput's own form-validation wiring never sees them;
// a synthetic blur nudges it to revalidate against the current value
function notifyFormOfChange() {
  getInputEl()?.dispatchEvent(new FocusEvent('blur', { relatedTarget: null }))
}

function onDateSelect(date: DateValue | DateRange | DateValue[] | null | undefined) {
  if (!date || Array.isArray(date) || !('year' in date)) {
    return
  }
  const dt = DateTime.fromObject({ year: date.year, month: date.month, day: date.day }, { locale: activeLocale.value })
  dateInput.value = formatDate(dt, DATE_DISPLAY_FORMAT)
  syncModelFromLocal()
  suppressCloseAutoFocus = true
  suppressOpenOnFocus = true
  isCalendarOpen.value = false
  nextTick(() => {
    notifyFormOfChange()
    getInputEl()?.focus()
  })
}

function onOpenAutoFocus(e: Event) {
  if (calendarOpenedViaInput) {
    e.preventDefault()
    calendarOpenedViaInput = false
  }
  // else: let focus enter the calendar so the screen reader announces it naturally
}

function onInputFocus() {
  hasFocus.value = true
  if (isCalendarOpen.value) {
    return // already open (e.g. Shift+Tab back to input)
  }
  calendarOpenedViaInput = true
  if (suppressOpenOnFocus) {
    suppressOpenOnFocus = false
    calendarOpenedViaInput = false
    return
  }
  isCalendarOpen.value = true
}

function normalizeDate(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) {
    return input
  }

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

  // preserve original input (including spaces) while the user is still typing
  return input
}

function syncModelFromLocal() {
  const trimmed = dateInput.value.trim()

  if (!trimmed) {
    dateModel.value = ''
    return
  }

  const parsed = parseDate(trimmed, DATE_DISPLAY_FORMAT)
  if (!parsed.isValid) {
    dateModel.value = trimmed
    return
  }

  const formattedDate = formatDate(parsed, DATE_API_INPUT_FORMAT)
  dateModel.value = formattedDate
}

onMounted(() => {
  const normalized = normalizeDate(dateInput.value)
  if (normalized !== dateInput.value) {
    dateInput.value = normalized
  }
})

let debounceTimer: ReturnType<typeof setTimeout> | undefined
watch(dateInput, (val: string) => {
  // sync immediately so the parent (and its schema validation) always sees the
  // current value instead of waiting for the debounced auto-formatting below
  syncModelFromLocal()

  clearTimeout(debounceTimer)
  if (!val) {
    return
  }

  debounceTimer = setTimeout(async () => {
    const normalized = normalizeDate(val)
    if (normalized !== val) {
      dateInput.value = normalized
      await nextTick()
      syncModelFromLocal()
    }
  }, 500)
})

function clearDate() {
  dateInput.value = ''
  syncModelFromLocal()
  notifyFormOfChange()
  nextTick(() => {
    inputWrapperRef.value?.querySelector<HTMLElement>(`#${inputId}`)?.focus()
  })
}
</script>

<template>
  <div ref="inputWrapperRef">
    <UInput
      :id="inputId"
      v-model="dateInput"
      :disabled="disabled"
      class="w-full"
      placeholder="&nbsp;"
      :aria-required="required"
      v-bind="ariaAttrs"
      @focus="onInputFocus"
      @blur="onInputBlur"
      @keydown="onInputKeydown"
    >
      <label
        :for="inputId"
        :class="['floating-label-input', { 'text-red-500': error }]"
      >
        {{ label }}
      </label>
      <template #trailing>
        <!-- explicit tabindex="0" on both trailing buttons: Safari excludes plain
        <button> elements from Tab order by default (unlike Chrome/Firefox), so
        without this, Tab skips straight past them from the date input -->
        <!-- .stop on both Enter handlers below: type="button" already blocks native
        form submission, but consuming apps may wrap this in a dialog/form with its
        own "Enter activates primary action" keydown listener higher up the tree -
        stopping propagation keeps Enter fully local to whichever icon is focused -->
        <UButton
          v-if="dateInput && !disabled"
          icon="i-mdi-close"
          type="button"
          tabindex="0"
          :color="error ? 'error' : 'neutral'"
          variant="ghost"
          class="date-action-button"
          :aria-label="$t('label.clearDate')"
          @keydown.enter.prevent.stop="clearDate"
          @click="clearDate"
        />
        <!-- capture Enter before Reka UI asChild trigger strips the listener -->
        <UPopover
          v-model:open="isCalendarOpen"
          :reference="inputWrapperRef ?? undefined"
          :content="{
            side: 'top',
            align: 'start',
            onOpenAutoFocus,
            onCloseAutoFocus,
            onFocusOutside: ignoreInputInteraction,
            onInteractOutside: ignoreInputInteraction,
          }"
        >
          <UButton
            icon="i-mdi-calendar"
            type="button"
            tabindex="0"
            :disabled="disabled"
            :color="error && !dateInput ? 'error' : 'neutral'"
            variant="ghost"
            class="date-action-button"
            :aria-label="$t('label.openCalendar')"
            @keydown.enter.prevent.stop="isCalendarOpen = !isCalendarOpen"
          />
          <template #content>
            <div ref="calendarContentRef">
              <UCalendar
                :aria-label="$t('label.chooseDate')"
                :model-value="calendarValue"
                :min-value="calendarMinValue"
                :max-value="calendarMaxValue"
                :is-date-unavailable="isDateUnavailable"
                @update:model-value="onDateSelect"
              />
            </div>
          </template>
        </UPopover>
      </template>
    </UInput>
    <!-- UFormField's own error text has no aria-live/role=alert, so it's only read on
    initial focus, not when it appears/changes later (e.g. after blur). This announces
    it independently of focus position whenever a string error is passed in. -->
    <span role="alert" class="sr-only">{{ typeof error === 'string' ? error : '' }}</span>
    <!-- same reasoning as the alert above, but for the help/hint text: role="status"
    (implicit aria-live="polite") so it doesn't interrupt like the error does. Only
    populated while focused, so the content actually changes (and therefore
    announces) on every focus rather than sitting static since page load. -->
    <span role="status" class="sr-only">{{ hasFocus && typeof error !== 'string' && help ? help : '' }}</span>
  </div>
</template>

<style scoped>
:deep(.date-action-button) {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  color: #1669BB;
}

:deep(.date-action-button:focus-visible) {
  box-shadow: 0 0 0 2px var(--ui-primary);
  border-radius: 1px;
}

:deep([data-slot="header"] button:focus-visible) {
  outline: 2px solid #003366;
  outline-offset: -4px;
  border-radius: 20%;
  background: transparent;
}

:deep([data-slot="cellTrigger"]:focus-visible) {
  outline: 2px solid #003366;
  border-radius: 50%;
}

:deep([data-slot="cellTrigger"][data-selected]) {
  border-radius: 50%;
}

:deep([data-slot="cellTrigger"][data-unavailable]) {
  text-decoration: none;
  color: #C3C3C3 !important;
}

:deep([data-slot="cellTrigger"][data-outside-view]) {
  color: #212529;
}
</style>
