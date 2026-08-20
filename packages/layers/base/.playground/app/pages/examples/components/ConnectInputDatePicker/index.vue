<script setup lang="ts">
import { getDateSchema } from '#base/app/utils/schemas/date'

definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect InputDatePicker' }
  ]
})

const basic = ref('')
const disabledDate = ref('2026-07-28') // API format

const requiredHelpText = 'Format: Month Day, Year (e.g. January 1, 2026)'
const rangeHelpText = 'Enter a date between July 1 and July 31, 2026'

const requiredSchema = getDateSchema({
  required: true,
  messages: {
    required: 'Please enter a date',
    invalidDate: 'Please enter a valid date'
  }
})
const requiredForm = reactive({ dateInput: '' })

const rangeSchema = getDateSchema({
  required: false,
  minDate: '2026-07-01',
  maxDate: '2026-07-31',
  messages: {
    dateRange: 'Date must be between July 1 and July 31, 2026'
  }
})
const rangeForm = reactive({ dateInput: '' })
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectInputDatePicker
    </h1>

    <ConnectPageSection :heading="{ label: 'Basic Example' }" ui-body="p-4 space-y-4">
      <ConnectInputDatePicker
        id="basic-date-picker"
        v-model="basic"
        label="Basic Date"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Disabled Example' }" ui-body="p-4 space-y-4">
      <p>The date input is disabled</p>
      <ConnectInputDatePicker
        id="disabled-date-picker"
        v-model="disabledDate"
        label="Optional Date"
        disabled
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Schema Validation — Required & Format' }" ui-body="p-4 space-y-4">
      <p>
        Uses <code>getDateSchema({ required: true })</code> from <code>utils/schemas/date.ts</code>.
        Try submitting empty, or type text that isn't a date.
      </p>
      <UForm
        :state="requiredForm"
        :schema="requiredSchema"
        class="space-y-8"
        @submit="(e) => console.info(e.data.dateInput)"
        @error="(e) => console.info(e.errors)"
      >
        <UFormField
          v-slot="{ error }"
          name="dateInput"
          :help="requiredHelpText"
        >
          <ConnectInputDatePicker
            id="required-date-picker"
            v-model="requiredForm.dateInput"
            label="Required Date"
            required
            :error="error"
            :help="requiredHelpText"
          />
        </UFormField>
        <UButton type="submit" label="Submit" />
      </UForm>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Schema Validation — Date Range' }" ui-body="p-4 space-y-4">
      <p>
        Uses <code>getDateSchema({ minDate, maxDate })</code> from <code>utils/schemas/date.ts</code>.
        Pick or type a date outside July 2026 to see the range error.
      </p>
      <UForm
        :state="rangeForm"
        :schema="rangeSchema"
        class="space-y-8"
        @submit="(e) => console.info(e.data.dateInput)"
        @error="(e) => console.info(e.errors)"
      >
        <UFormField
          v-slot="{ error }"
          name="dateInput"
          :help="rangeHelpText"
        >
          <ConnectInputDatePicker
            id="range-date-picker"
            v-model="rangeForm.dateInput"
            label="Date In Range"
            :required="false"
            min-date="2026-07-01"
            max-date="2026-07-31"
            :error="error"
            :help="rangeHelpText"
          />
        </UFormField>
        <UButton type="submit" label="Submit" />
      </UForm>
    </ConnectPageSection>
  </div>
</template>
