<script setup lang="ts">
import type { Form, FormError, FormSubmitEvent } from '@nuxt/ui'
import type { AccountProfileSchema } from '#imports'

defineEmits<{
  submit: [event: FormSubmitEvent<AccountProfileSchema>]
}>()

const store = useConnectAccountStore()
const formRef = useTemplateRef<Form<AccountProfileSchema>>('account-create-form')
const statusCode = ref<number | undefined>(undefined)
const schema = computed(() => getAccountCreateSchema(statusCode.value))
const formState = reactive<AccountProfileSchema>(schema.value.parse({}))

const formErrors = computed<{
  accountName: FormError<string> | undefined
  emailAddress: FormError<string> | undefined
  phone: FormError<string> | undefined
  address: FormError<string> | undefined
}>(() => {
  const errors = formRef.value?.getErrors()
  return {
    accountName: errors?.find(e => e.name === 'accountName'),
    emailAddress: errors?.find(e => e.name?.startsWith('emailAddress')),
    phone: errors?.find(e => e.name?.startsWith('phone')),
    address: errors?.find(e => e.name?.startsWith('address'))
  }
})

async function validate(fieldName?: keyof AccountProfileSchema) {
  return formRef.value?.validate({
    name: fieldName as never,
    silent: true
  })
}

watch(() => statusCode.value, async (v) => {
  if (v !== undefined) {
    await nextTick()
    await validate('accountName')
  }
})

onMounted(() => {
  if (store.userEmail) {
    formState.emailAddress = store.userEmail
  }
})
</script>

<template>
  <ConnectPageSection
    :heading="{
      label: $t('connect.label.accountInformation'),
      labelClass: 'font-bold md:ml-4',
    }"
    ui-body="p-0 sm:p-0"
  >
    <UForm
      id="account-create-form"
      ref="account-create-form"
      no-validate
      :validate-on="['input', 'change']"
      :schema="schema"
      :state="formState"
      @error="onFormSubmitError"
      @submit="$emit('submit', $event)"
    >
      <!-- Legal Name -->
      <ConnectFormFieldWrapper
        :label="$t('connect.page.createAccount.contactLabel')"
        orientation="horizontal"
        class="py-6 sm:py-8"
      >
        <p class="font-bold">
          {{ store.userFullName }}
        </p>
        <p class="mt-3">
          {{ $t('connect.page.createAccount.yourNameHelp') }}
        </p>
      </ConnectFormFieldWrapper>

      <USeparator orientation="horizontal" />

      <!-- Account Name -->
      <ConnectAccountCreateName
        v-model:status-code="statusCode"
        v-model:name="formState.accountName"
        :error="formErrors.accountName"
      />

      <!-- Account Email -->
      <ConnectFormFieldWrapper
        :label="$t('connect.page.createAccount.emailLabel')"
        orientation="horizontal"
        :error="formErrors.emailAddress"
        padding-class="py-1 px-4 sm:py-2 sm:px-8"
      >
        <ConnectFormInput
          v-model="formState.emailAddress"
          name="emailAddress"
          input-id="email-input"
          :label="$t('connect.page.createAccount.emailPlaceholder')"
        />
      </ConnectFormFieldWrapper>

      <!-- Account Phone -->
      <ConnectFieldset
        :label="$t('connect.page.createAccount.phoneLabel')"
        orientation="horizontal"
        :error="formErrors.phone"
        padding-class="py-1 px-4 sm:py-2 sm:px-8"
      >
        <div class="flex flex-row gap-2">
          <!-- Disabling country code selection until Auth Model Supports individual property -->
          <!-- <ConnectFormPhoneCountryCode -->
          <!-- v-model:country-calling-code="formState.phone.countryCode" -->
          <!-- v-model:country-iso2="formState.phone.countryIso2" -->
          <!-- :is-invalid="!formState.phone.countryIso2" -->
          <!-- class="w-40 mt-[-20px]" -->
          <!-- /> -->
          <ConnectFormInput
            v-model="formState.phone.phoneNumber"
            name="phone.phoneNumber"
            input-id="phone-number-input"
            class="flex-2"
            :label="$t('connect.page.createAccount.phonePlaceholder')"
            mask="(###) ###-####"
          />
          <ConnectFormInput
            v-model="formState.phone.ext"
            name="phone.ext"
            input-id="phone-ext-input"
            :label="$t('connect.page.createAccount.phoneExtensionLabel')"
          />
        </div>
      </ConnectFieldset>

      <!-- Account Address -->
      <ConnectFieldset
        :label="$t('connect.page.createAccount.addressLabel')"
        orientation="horizontal"
        :error="formErrors.address"
        padding-class="py-1 px-4 sm:pt-2 sm:pb-4 sm:px-8"
      >
        <ConnectFormAddress
          id="account-address"
          v-model="formState.address"
          name="address"
          schema-prefix="address"
          @should-validate="validate"
        />
      </ConnectFieldset>
    </UForm>
  </ConnectPageSection>
</template>
