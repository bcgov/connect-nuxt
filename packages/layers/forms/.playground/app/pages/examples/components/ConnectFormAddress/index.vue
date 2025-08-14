<script setup lang="ts">
useHead({
  title: 'ConnectFormAddress - Components - Forms Layer Examples'
})

definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'ConnectFormAddress' }
  ]
})

const defaultAddress = {
  street: '',
  streetAdditional: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'CA',
  locationDescription: ''
}

const state = ref({ ...defaultAddress })

function resetAddress() {
  state.value = { ...defaultAddress }
}
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

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (default)' }"
      ui-body="sm:p-6 space-y-4"
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <p>Default requires the id, v-model and schema-prefix.</p>
      <p>
        `id` will add the id to the wrapper div, and also cascade down to the child components
        (e.g., `id="mailing-address"` will become `mailing-address-street` on the street input.).
      </p>
      <p>`id` will also be set as the inputs `data-testid` attribute.</p>
      <p class="font-bold">
        Default state includes address complete.
      </p>
      <ConnectFormAddress
        id="default"
        v-model="state"
        schema-prefix="mailingAddress"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (disableAddressComplete)' }"
      ui-body="sm:p-6 space-y-4"
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <ConnectFormAddress
        id="disable-address-complete"
        v-model="state"
        schema-prefix="mailingAddress"
        :disable-address-complete="true"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (disabledFields)' }"
      ui-body="sm:p-6 space-y-4"
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <p>Disable certain inputs.</p>
      <p>:disabled-fields="['country', 'locationDescription', 'streetAdditional']"</p>
      <ConnectFormAddress
        id="disabled-fields"
        v-model="state"
        schema-prefix="mailingAddress"
        :disabled-fields="['country', 'locationDescription', 'streetAdditional']"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (excludedFields)' }"
      ui-body="sm:p-6 space-y-4"
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <p>Exclude certain inputs from rendering and address complete populating.</p>
      <p>:excluded-fields="['locationDescription', 'streetAdditional']"</p>
      <ConnectFormAddress
        id="excluded-fields"
        v-model="state"
        schema-prefix="mailingAddress"
        :excluded-fields="['locationDescription', 'streetAdditional']"
      />
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (streetHelpText - none)' }"
      ui-body="sm:p-6 space-y-4"
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <ConnectFormAddress
        id="no-street-help"
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

    <ConnectPageSection
      :heading="{ label: 'ConnectFormAddress (streetHelpText - no-po)' }"
      ui-body="sm:p-6 space-y-4"
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <ConnectFormAddress
        id="no-po-box"
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
      :actions="[{ label: 'Reset', onClick: () => resetAddress() }]"
    >
      <ConnectFormAddress
        id="allow-po-box"
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
