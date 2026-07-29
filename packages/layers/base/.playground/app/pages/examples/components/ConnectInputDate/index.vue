<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect InputDate' }
  ]
})

const basic = ref('')
const disabledDate = ref('2026-07-28') // API format
const minOnly = ref('')
const maxOnly = ref('')
const minAndMax = ref('')

const form = reactive({
  date: ''
})

const submittedDate = ref<string | null>(null)

function onSubmit() {
  submittedDate.value = form.date
  console.info(form.date)
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectInputDate
    </h1>

    <ConnectPageSection :heading="{ label: 'Basic Example' }" ui-body="p-4 space-y-4">
      <ConnectInputDate
        id="basic-date"
        v-model="basic"
        label="Basic Date"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Error Example' }" ui-body="p-4 space-y-4">
      <ConnectInputDate
        id="basic-date"
        v-model="basic"
        label="Error Date"
        error
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Disabled Example' }" ui-body="p-4 space-y-4">
      <p>The date input is disabled</p>
      <ConnectInputDate
        id="optional-date"
        v-model="disabledDate"
        label="Optional Date"
        disabled
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Date Range — Min Date Only (on or after 2026-07-01)' }"
      ui-body="p-4 space-y-4"
    >
      <p>Only <code>minDate</code> is set.</p>
      <ConnectInputDate
        id="min-only-date"
        v-model="minOnly"
        label="Min Date Only"
        min-date="2026-07-01"
        data-testid="min-only-date"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Date Range — Max Date Only (on or before 2026-07-31)' }"
      ui-body="p-4 space-y-4"
    >
      <p>Only <code>maxDate</code> is set.</p>
      <ConnectInputDate
        id="max-only-date"
        v-model="maxOnly"
        label="Max Date Only"
        max-date="2026-07-31"
        data-testid="max-only-date"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Date Range — Both Min and Max (2026-07-01 to 2026-07-31)' }"
      ui-body="p-4 space-y-4"
    >
      <p>Both <code>minDate</code> and <code>maxDate</code> are set.</p>
      <ConnectInputDate
        id="min-max-date"
        v-model="minAndMax"
        label="Min and Max Date"
        min-date="2026-07-01"
        max-date="2026-07-31"
        data-testid="min-max-date"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Form Example' }" ui-body="p-4 space-y-4">
      <div class="space-y-8">
        <ConnectInputDate
          id="form-date"
          v-model="form.date"
          label="Form Date"
          data-testid="form-date"
        />
        <p v-if="submittedDate !== null" class="text-sm">
          Submitted: <code>{{ submittedDate }}</code>
        </p>
        <UButton label="Submit" @click="onSubmit" />
      </div>
    </ConnectPageSection>
  </div>
</template>
