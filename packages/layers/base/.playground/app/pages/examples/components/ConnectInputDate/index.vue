<script setup lang="ts">
import { z } from 'zod'
import type { Form } from '@nuxt/ui'

definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Datepicker Input' }
  ]
})

const basic = ref('')
const form = reactive({
  date: ''
})

// basic validation
const dateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format"
  })
})

type DateSchema = z.output<typeof dateSchema>

const formRef = useTemplateRef<Form<DateSchema>>('form-ref')
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectDatePickerInput
    </h1>

    <ConnectPageSection :heading="{ label: 'Basic Example' }" ui-body="p-4 space-y-4">
      <ConnectInputDate
        v-model="basic"
        label="Basic Date"
        id="basic-date"
      />
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'Form Example' }" ui-body="p-4 space-y-4">
      <UForm
        ref="form-ref"
        :state="form"
        :schema="dateSchema"
        @submit="(e) => console.info(e.data)"
        @error="(e) => console.info(e.errors)"
        class="space-y-8"
      >
        <UFormField name="date" help="Format: YYYY-MM-DD">
          <ConnectInputDate
            v-model="form.date"
            label="Form Date"
            id="form-date"
            @blur="formRef?.validate({ silent: true })"
          />
          
        </UFormField>
        <UButton type="submit" label="Submit" />
      </UForm>
    </ConnectPageSection>
  </div>
</template>
