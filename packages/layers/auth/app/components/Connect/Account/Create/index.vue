<script setup lang="ts">
import type { Form, FormError } from '@nuxt/ui'
import type { AccountProfileSchema } from '#auth/app/utils/schemas/account'
import { getAccountCreateSchema } from '#auth/app/utils/schemas/account'

const { accountFormState, userFullName } = useConnectAccountStore()
const accountProfileSchema = getAccountCreateSchema()

const formRef = useTemplateRef<Form<AccountProfileSchema>>('account-create-form')

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

async function validate() {
  return formRef.value?.validate({ silent: true })
}
</script>

<template>
  <ConnectPageSection
    :heading="{
      label: $t('connect.label.accountInformation'),
      labelClass: 'font-bold md:ml-4',
    }"
  >
    <UForm
      id="account-create-form"
      ref="account-create-form"
      class="p-8"
      no-validate
      :validate-on="['input', 'change']"
      :schema="accountProfileSchema"
      :state="accountFormState"
      @submit="validate()"
      @error="onFormSubmitError"
    >
      <!-- Legal Name -->
      <ConnectFormFieldWrapper
        :label="$t('connect.page.createAccount.yourNameLabel')"
        orientation="horizontal"
      >
        <p class="font-bold">
          {{ userFullName }}
        </p>
        <p class="mt-3">
          {{ $t('connect.page.createAccount.yourNameHelp') }}
        </p>
      </ConnectFormFieldWrapper>

      <USeparator orientation="horizontal" class="my-8" />

      <!-- Account Name -->
      <ConnectFormFieldWrapper
        class="pt-2 my-6"
        :label="$t('connect.page.createAccount.accountNameLabel')"
        orientation="horizontal"
        :error="formErrors.accountName"
      >
        <ConnectFormInput
          v-model="accountFormState.accountName"
          name="accountName"
          input-id="account-name-input"
          :label="$t('connect.page.createAccount.accountNameLabel')"
          :help="$t('connect.page.createAccount.accountNameHelp')"
        />
      </ConnectFormFieldWrapper>

      <!-- Account Email -->
      <ConnectFormFieldWrapper
        class="my-6"
        :label="$t('connect.page.createAccount.emailLabel')"
        orientation="horizontal"
        :error="formErrors.emailAddress"
      >
        <ConnectFormInput
          v-model="accountFormState.emailAddress"
          name="emailAddress"
          input-id="email-input"
          :label="$t('connect.page.createAccount.emailPlaceholder')"
        />
      </ConnectFormFieldWrapper>

      <!-- Account Phone -->
      <ConnectFormFieldWrapper
        :label="$t('connect.page.createAccount.phoneLabel')"
        orientation="horizontal"
        :error="formErrors.phone"
      >
        <div class="flex flex-row gap-2">
          <ConnectFormPhoneCountryCode
            v-model:country-calling-code="accountFormState.phone.countryCode"
            v-model:country-iso2="accountFormState.phone.countryIso2"
            :is-invalid="!accountFormState.phone.countryIso2"
            class="w-40 mt-[-20px]"
          />
          <ConnectFormInput
            v-model="accountFormState.phone.phoneNumber"
            name="phone.phoneNumber"
            input-id="phone-number-input"
            :label="$t('connect.page.createAccount.phonePlaceholder')"
            mask="(###) ###-####"
          />
          <ConnectFormInput
            v-model="accountFormState.phone.ext"
            name="phone.ext"
            input-id="phone-ext-input"
            :label="$t('connect.page.createAccount.phoneExtensionLabel')"
          />
        </div>
      </ConnectFormFieldWrapper>

      <!-- Account Address -->
      <ConnectFormFieldWrapper
        class="my-6"
        :label="$t('connect.page.createAccount.addressLabel')"
        orientation="horizontal"
        :error="formErrors.address"
      >
        <ConnectFormAddress
          id="account-address"
          v-model="accountFormState.address"
          name="address"
          schema-prefix="address"
          @should-validate="validate"
        />
      </ConnectFormFieldWrapper>
    </UForm>
  </ConnectPageSection>
</template>
