<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Form Address Component (no address complete)' }
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
    </div>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`v-model` - Partial ConnectAddress - required</li>
        <li>`id` - string - required</li>
        <li>`schemaPrefix` - string - required</li>
        <li>`disabledFields` - Array keyof ConnectAddress - optional</li>
        <li>`excludedFields` - Array keyof ConnectAddress - optional</li>
        <li>`disableAddressComplete` - boolean - optional</li>
        <li>`hideStreetHelp` - boolean - optional</li>
        <li>`noPoBox` - boolean - optional</li>
      </ul>
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'Emits' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`shouldValidate` - keys: Array keyof ConnectAddress - emits the keys that were set by address complete</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Connect Form Address Component (default)' }">
      <div class="p-10">
        <ConnectFormAddress
          id="mailing-address"
          v-model="state"
          schema-prefix="mailingAddress"
        />
      </div>
    </ConnectPageSection>
  </div>
</template>
