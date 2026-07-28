<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect InputDate' }
  ]
})

const basic = ref('')
const optional = ref('')
const minOnly = ref('')
const maxOnly = ref('')
const minAndMax = ref('')
const selfDefined = ref('')

const corpFoundingDate = ref('2026-07-01')
const corpFoundingDateFormatted = computed(() => {
  const [year, month, day] = corpFoundingDate.value.split('-').map(Number) as [number, number, number]
  return new Date(year, month - 1, day).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })
})
const corpFoundingDateErrorMsg = computed(
  () => `Date must not be before the corp founding date (${corpFoundingDateFormatted.value})`
)
const form = reactive({
  date: ''
})

const submittedDate = ref<string | null>(null)
const dateComponentRef = useTemplateRef('date-component-ref')

async function onSubmit() {
  try {
    await dateComponentRef.value?.formRef?.validate()
  }
  catch {
    return
  }
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
        data-testid="basic-date"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Optional (required=false)' }" ui-body="p-4 space-y-4">
      <p>With <code>:required="false"</code>, leaving the field empty does not trigger an error.</p>
      <ConnectInputDate
        id="optional-date"
        v-model="optional"
        label="Optional Date"
        :required="false"
        data-testid="optional-date"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Date Range — Min Date Only (on or after 2026-07-01)' }"
      ui-body="p-4 space-y-4"
    >
      <p>Only <code>minDate</code> is set. Error: <em>"Date must be on or after July 1, 2026"</em></p>
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
      <p>Only <code>maxDate</code> is set. Error: <em>"Date must be on or before July 31, 2026"</em></p>
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
      <p>
        Both <code>minDate</code> and <code>maxDate</code> are set.
        Error: <em>"Date must be between July 1, 2026 and July 31, 2026"</em>
      </p>
      <ConnectInputDate
        id="min-max-date"
        v-model="minAndMax"
        label="Min and Max Date"
        min-date="2026-07-01"
        max-date="2026-07-31"
        data-testid="min-max-date"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Self-Defined Error Message (after 2026-07-01)' }"
      ui-body="p-4 space-y-4"
    >
      <ConnectInputDate
        id="self-defined-date"
        v-model="selfDefined"
        label="Self-Defined Error"
        :min-date="corpFoundingDate"
        data-testid="self-defined-date"
        :error-min-date="corpFoundingDateErrorMsg"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Form Example' }" ui-body="p-4 space-y-4">
      <UForm :state="form" class="space-y-8">
        <ConnectInputDate
          ref="date-component-ref"
          id="form-date"
          v-model="form.date"
          label="Form Date"
          data-testid="form-date"
        />
        <p v-if="submittedDate !== null" class="text-sm">
          Submitted: <code>{{ submittedDate }}</code>
        </p>
        <UButton label="Submit" @click="onSubmit" />
      </UForm>
    </ConnectPageSection>
  </div>
</template>
