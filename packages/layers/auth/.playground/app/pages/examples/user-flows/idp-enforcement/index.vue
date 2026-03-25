<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  middleware: 'connect-auth',
  breadcrumbs: [
    { to: '/', label: 'Examples' },
    { label: 'IDP Enforcement' }
  ]
})
useHead({ title: 'IDP Enforcement User Flow' })
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>IDP Enforcement</h1>

    <ConnectPageSection
      :heading="{ label: 'Example (login and API integration setup required)' }"
      ui-body="p-20"
    >
      <div class="space-y-4">
        <h3>Steps to reproduce</h3>
        <ol class="list-decimal ml-8">
          <li>Sign in externally with IDIR or BCeID</li>
          <li>Refresh the page (query must have `preset=bcscOnly`) to enforce BCSC only</li>
          <li>Observe the invalid idp modal is displayed</li>
          <li>Select the `Log out` button in the modal</li>
          <li>Observe you have been redirected to the login page and with BCSC as the only login option</li>
        </ol>
      </div>
    </ConnectPageSection>
  </div>
</template>
