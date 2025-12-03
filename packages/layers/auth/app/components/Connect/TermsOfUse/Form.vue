<script setup lang="ts">
import { z } from 'zod'
import type { FormErrorEvent, Form } from '@nuxt/ui'

const { t } = useI18n()
const { openDeclineTosModal } = useConnectTosModals()

const props = defineProps<{
  hasReachedBottom: boolean
  disableButtons: boolean
  loading: boolean
}>()

const state = reactive({
  agreeToTerms: false
})

const formRef = useTemplateRef<Form<unknown>>('form-ref')

const schema = z.object({
  agreeToTerms: z.boolean()
}).superRefine((val, ctx) => {
  if (!val.agreeToTerms) {
    ctx.addIssue({
      code: 'custom',
      message: t('connect.validation.acceptTermsOfUse'),
      path: ['agreeToTerms']
    })
  } else if (!props.hasReachedBottom) {
    ctx.addIssue({
      code: 'custom',
      message: t('connect.validation.termsOfUseScrollToBottom'),
      path: ['agreeToTerms']
    })
  }
})

function onFormSubmitError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    if (element) {
      setTimeout(() => {
        element.focus({ preventScroll: true })
      }, 0)
    }
  }
}

// reset form errors if user reaches bottom of page
watch(() => props.hasReachedBottom, (newVal) => {
  if (newVal) {
    formRef.value?.clear()
  }
})
</script>

<template>
  <UForm
    ref="form-ref"
    class="sticky bottom-0 flex w-full flex-col items-start justify-between
        gap-4 border-t border-line bg-shade py-4 sm:flex-row sm:items-center sm:gap-0 sm:pb-8"
    :state
    :schema
    @error="onFormSubmitError"
  >
    <UFormField
      v-slot="{ error }"
      name="agreeToTerms"
      :ui="{
        error: 'text-base',
      }"
    >
      <UCheckbox
        ref="checkboxRef"
        v-model="state.agreeToTerms"
        :label="$t('connect.text.iHaveReadAndAcceptTermsOfUse')"
        :ui="{
          label: error ? 'text-lg text-error' : 'text-lg',
        }"
      />
    </UFormField>
    <div class="flex w-full gap-4 sm:w-fit">
      <UButton
        class="flex-1 sm:flex-none"
        :ui="{ base: 'flex justify-center items-center' }"
        :label="$t('connect.label.accept')"
        :disabled="disableButtons"
        :loading
        type="submit"
      />
      <UButton
        class="flex-1 sm:flex-none"
        :ui="{ base: 'flex justify-center items-center' }"
        :label="$t('connect.label.decline')"
        variant="outline"
        :disabled="disableButtons"
        @click="openDeclineTosModal"
      />
    </div>
  </UForm>
</template>
