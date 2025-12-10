<script setup lang="ts">
import type { Form } from '@nuxt/ui'
import type { AccountProfileSchema } from '#auth/app/utils/schemas/account'
import { getAccountCreateSchema } from '#auth/app/utils/schemas/account'

const { accountFormState, userFullName } = useConnectAccountStore()
const accountProfileSchema = getAccountCreateSchema()

const formRef = useTemplateRef<Form<AccountProfileSchema>>('account-create-form')

async function validate() {
  return formRef.value?.validate({ silent: true })
}

defineExpose({
  validate
})
</script>

<template>
  <UForm
    id="account-create-form"
    ref="account-create-form"
    :schema="accountProfileSchema"
    :state="accountFormState"
  >
    <ConnectPageSection
      :heading="{ label: $t('connect.label.accountInformation'), labelClass: 'font-bold md:ml-4' }"
      ui-body="grid grid-cols-12 gap-4 mx-2 my-5 gap-y-6"
    >
      <!-- Legal Name -->
      <div class="col-span-3 font-bold">
        {{ $t('connect.page.createAccount.yourNameLabel') }}
      </div>
      <div class="col-span-9 ">
        <p class="font-bold">
          {{ userFullName }}
        </p>
        <p class="mt-4">
          {{ $t('connect.page.createAccount.yourNameHelp') }}
        </p>
      </div>

      <USeparator orientation="horizontal" class="col-span-12 my-4" />

      <!-- Account Name -->
      <div class="col-span-3 font-bold">
        {{ $t('connect.page.createAccount.accountNameLabel') }}
      </div>
      <div class="col-span-9">
        <ConnectFormInput
          v-model="accountFormState.accountName"
          name="accountName"
          input-id="account-name-input"
          :label="$t('connect.page.createAccount.accountNameLabel')"
          :help="$t('connect.page.createAccount.accountNameHelp')"
        />
      </div>

      <!-- Account Email -->
      <div class="col-span-3 font-bold">
        {{ $t('connect.page.createAccount.emailLabel') }}
      </div>
      <div class="col-span-9">
        <ConnectFormInput
          v-model="accountFormState.emailAddress"
          name="emailAddress"
          input-id="email-input"
          :label="$t('connect.page.createAccount.emailPlaceholder')"
        />
      </div>

      <!-- Account Phone -->
      <div class="col-span-3 font-bold">
        {{ $t('connect.page.createAccount.phoneLabel') }}
      </div>
      <div class="col-span-9">
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
      </div>

      <!-- Account Address -->
      <div class="col-span-3 font-bold">
        {{ $t('connect.page.createAccount.addressLabel') }}
      </div>
      <div class="col-span-9">
        <ConnectFormAddress
          id="account-address"
          v-model="accountFormState.address"
          name="address"
          schema-prefix="address"
          @should-validate="validate"
        />
      </div>
    </ConnectPageSection>
  </UForm>
</template>
