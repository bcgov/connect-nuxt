<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'ConnectFormAddress' }
  ]
})

const state = reactive({
  street: '',
  streetAdditional: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'CA',
  locationDescription: ''
})
</script>

<template>
  <div class="my-10 space-y-8">
    <div class="space-y-4">
      <h1>
        ConnectFormAddress
      </h1>
      <p>The `ConnectFormAddress` component is meant to be used inside a UForm component.</p>
      <p>Please see the child components for individual usage.</p>
    </div>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>`v-model` - Partial ConnectAddress - required</li>
        <li>`id` - string - required</li>
        <li>`schemaPrefix` - string - required</li>
        <li>`disabledFields` - Array keyof ConnectAddress - optional</li>
        <li>`excludedFields` - Array keyof ConnectAddress - optional</li>
        <li>`disableAddressComplete` - boolean - optional</li>
        <li>`streetHelpText` - 'allow-po' | 'no-po' | 'none' - default: 'none'</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Emits' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>`shouldValidate` - keys: Array keyof ConnectAddress - emits the keys that were set by address complete</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormAddress (default)' }" ui-body="sm:p-6 space-y-4">
      <p>Default requires the id, v-model and schema-prefix.</p>
      <p>
        `id` will add the id to the wrapper div, and also cascade down to the child components
        (e.g., `id="mailing-address"` will become `mailing-address-street` on the street input.).
      </p>
      <p>`id` will also be set as the inputs `data-testid` attribute.</p>
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormAddress (disabledFields)' }" ui-body="sm:p-6 space-y-4">
      <p>Disable certain inputs.</p>
      <p>:disabled-fields="['country', 'locationDescription', 'streetAdditional']"</p>
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
        :disabled-fields="['country', 'locationDescription', 'streetAdditional']"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormAddress (excludedFields)' }" ui-body="sm:p-6 space-y-4">
      <p>Exclude certain inputs from rendering and address complete populating.</p>
      <p>:excluded-fields="['locationDescription', 'streetAdditional']"</p>
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
        :excluded-fields="['locationDescription', 'streetAdditional']"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormAddress (disableAddressComplete)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
        :disable-address-complete="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormAddress (streetHelpText - none)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
        :excluded-fields="[
          'city',
          'country',
          'locationDescription',
          'postalCode',
          'region',
          'streetAdditional',
          'streetName',
          'streetNumber',
          'unitNumber',
        ]"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormAddress (streetHelpText - no-po)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
        street-help-text="no-po"
        :excluded-fields="[
          'city',
          'country',
          'locationDescription',
          'postalCode',
          'region',
          'streetAdditional',
          'streetName',
          'streetNumber',
          'unitNumber',
        ]"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (streetHelpText - allow-po)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFormAddress
        id="mailing-address"
        v-model="state"
        schema-prefix="mailingAddress"
        street-help-text="allow-po"
        :excluded-fields="[
          'city',
          'country',
          'locationDescription',
          'postalCode',
          'region',
          'streetAdditional',
          'streetName',
          'streetNumber',
          'unitNumber',
        ]"
      />
    </ConnectPageSection>
  </div>
</template>
