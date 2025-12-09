<script setup lang="ts">
import { getAccountProfileSchema } from '#auth/app/utils/schemas/account'

defineProps<{
  accounts?: ConnectAccount[]
}>()

const { accountFormState } = useConnectAccountStore()
const accountProfileSchema = getAccountProfileSchema()
</script>

<template>
  <UForm
    id="liquidator-filing"
    ref="liquidator-filing"
    :schema="accountProfileSchema"
    schema-prefix=""
    nested
  >
    <ConnectPageSection
      :heading="{ label: $t('connect.label.accountInformation'), labelClass: 'font-bold md:ml-4' }"
      ui-body="grid grid-cols-12 gap-4 mx-2 my-5 gap-y-6"
    >
      <!-- Legal Name -->
      <div class="col-span-3 font-bold">
        Your Name
      </div>
      <div class="col-span-9 ">
        <p class="font-bold">
          Cameron Bowler
        </p>
        <p class="mt-4">
          This is your legal name as it appears on your BC Services Card.
        </p>
      </div>

      <USeparator orientation="horizontal" class="col-span-12" />

      <!-- Account Name -->
      <div class="col-span-3 font-bold">
        Account Name
      </div>
      <div class="col-span-9">
        <ConnectFormInput
          v-model="accountFormState.accountName"
          name="accountName"
          input-id="account-name-input"
          label="Account Name"
          help="This is your default login name."
        />
      </div>

      <!-- Account Email -->
      <div class="col-span-3 font-bold">
        Email
      </div>
      <div class="col-span-9">
        <ConnectFormInput
          v-model="accountFormState.email"
          name="emailAddress"
          input-id="email-input"
          label="enter email Address"
        />
      </div>

      <!-- Account Phone -->
      <div class="col-span-3 font-bold">
        Phone
      </div>
      <div class="col-span-9">
        <div class="flex flex-row gap-2">
          <ConnectFormPhoneNumberCountryCode
            v-model:country-calling-code="accountFormState.phone.countryCode"
            v-model:country-iso2="accountFormState.phone.countryIso2"
            :is-invalid="false"
            class="w-40 mt-[-20px]"
          />
          <ConnectFormInput
            v-model="accountFormState.phone.phoneNumber"
            name="phoneNumber"
            input-id="phone-number-input"
            label="Enter phone number"
          />
          <ConnectFormInput
            v-model="accountFormState.phone.ext"
            name="phoneExt"
            input-id="phone-ext-input"
            label="Phone extension (Optional)"
          />
        </div>
      </div>

      <!-- Account Address -->
      <div class="col-span-3 font-bold">
        Address
      </div>
      <div class="col-span-9">
        <ConnectFormAddress
          v-model="accountFormState.address"
          id="account-address"
          name="account-address"
          schema-prefix="address"
        />
      </div>
    </ConnectPageSection>
  </UForm>
</template>
