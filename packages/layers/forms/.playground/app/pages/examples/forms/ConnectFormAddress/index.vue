<script setup lang="ts">
import { getRequiredAddressSchema, getNonRequiredAddressSchema } from '#forms/app/utils'
import type { FormErrorEvent, Form, FormSubmitEvent, FormError } from '@nuxt/ui'
import { z } from 'zod'
import { delay } from 'es-toolkit'

useHead({
  title: 'ConnectFormAddress - Forms - Forms Layer Examples'
})

definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'ConnectFormAddress' }
  ]
})

const defaultState = {
  deliveryAddress: {
    street: '',
    streetAdditional: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'CA',
    locationDescription: ''
  },
  mailingAddress: {
    street: '',
    streetAdditional: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'CA',
    locationDescription: ''
  }
}

const reqSchema = getRequiredAddressSchema()
const nonReqSchema = getNonRequiredAddressSchema()

const schema = z.object({
  deliveryAddress: reqSchema,
  mailingAddress: nonReqSchema
})

type Schema = z.output<typeof schema>
const state = reactive<Schema>({ ...defaultState })

const formRef = useTemplateRef<Form<Schema>>('address-form')

const formErrors = computed<{
  mailing: FormError<string> | undefined
  delivery: FormError<string> | undefined
}>(() => {
  const errors = formRef.value?.getErrors()
  return {
    mailing: errors?.find(e => e.name?.startsWith('mailingAddress')),
    delivery: errors?.find(e => e.name?.startsWith('deliveryAddress'))
  }
})
const hasErrors = computed(() => Object.values(formErrors.value).some(v => v !== undefined))

function resetForm() {
  state.deliveryAddress = {
    street: '',
    streetAdditional: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'CA',
    locationDescription: ''
  }
  state.mailingAddress = {
    street: '',
    streetAdditional: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'CA',
    locationDescription: ''
  }
  formRef.value?.clear()
}

function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        element.focus({ preventScroll: true })
      }, 0)
    }
  }
}

const loading = ref(false)
async function onSubmit(e: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    // do stuff
    await delay(2000)

    const data = e.data
    const isMailingValid = reqSchema.safeParse(data.mailingAddress)

    if (isMailingValid.success) {
      console.info('Form data: ', data)
    } else {
      const { mailingAddress, ...noMailing } = data
      console.info('Form data: ', noMailing)
    }
  } catch {
    // handle errors
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="my-10 space-y-8">
    <div class="space-y-4">
      <h1>
        ConnectFormAddress
      </h1>
      <p>This example shows how to use the ConnectFormAddress component inside a form with validation.</p>
      <UButton label="Reset" @click="resetForm" />
    </div>

    <UForm
      ref="address-form"
      :state
      :schema
      class="bg-white p-6 shadow max-w-full sm:max-w-2/3 mx-auto rounded space-y-6"
      :class="{
        'border-l-3 border-error': hasErrors,
      }"
      aria-labelledby="form-title"
      @error="onError"
      @submit="onSubmit"
    >
      <div
        id="form-title"
        class="font-bold text-xl text-neutral-highlighted"
        :class="{
          'text-red-600': hasErrors,
        }"
      >
        Address Form
      </div>
      <ConnectFieldset label="Delivery Address" :error="formErrors.delivery">
        <ConnectFormAddress
          id="delivery-address"
          v-model="state.deliveryAddress"
          schema-prefix="deliveryAddress"
          :form-ref="formRef"
        />
      </ConnectFieldset>
      <ConnectFieldset label="Mailing Address" :error="formErrors.mailing">
        <ConnectFormAddress
          id="mailing-address"
          v-model="state.mailingAddress"
          schema-prefix="mailingAddress"
          :form-ref="formRef"
        />
      </ConnectFieldset>

      <div class="flex justify-end">
        <UButton
          label="Submit"
          type="submit"
          size="xl"
          :loading
        />
      </div>
    </UForm>
  </div>
</template>
