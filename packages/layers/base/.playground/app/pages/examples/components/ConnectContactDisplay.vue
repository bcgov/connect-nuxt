<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectContactDisplay
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`contact` - ConnectContactItem | ConnectContactItem[] - required</li>
        <li>`hours` - string - optional</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Full Options' }" ui-body="p-4 space-y-4">
      <ConnectContactDisplay
        :contact="[
          { type: 'phone', title: 'Toll Free:', value: '1-877-370-1033', href: 'tel:+1-877-370-1033' },
          { type: 'phone', title: 'Victoria Office:', value: '250-387-7848', href: 'tel:+1-250-387-7848' },
          { type: 'fax', title: 'Fax:', value: '1-250-387-7848' },
          { type: 'email', title: 'Email:', value: 'BCRegistries@gov.bc.ca', href: 'mailto:bcregistries@gov.bc.ca?subject=BC%20Registries%20Support%20Request' }
        ]"
        hours="Monday to Friday, 8:30am - 4:30pm Pacific Time"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Partial Options' }" ui-body="p-4 space-y-4">
      <ConnectContactDisplay
        :contact="[
          { type: 'phone', title: 'Toll Free:', value: '1-877-370-1033', href: 'tel:+1-877-370-1033' },
          { type: 'email', title: 'Email:', value: 'BCRegistries@gov.bc.ca', href: 'mailto:bcregistries@gov.bc.ca?subject=BC%20Registries%20Support%20Request' }
        ]"
        hours="Monday to Friday, 8:30am - 4:30pm Pacific Time"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Without Hours' }" ui-body="p-4 space-y-4">
      <ConnectContactDisplay
        :contact="[
          { type: 'phone', title: 'Toll Free:', value: '1-877-370-1033', href: 'tel:+1-877-370-1033' },
          { type: 'email', title: 'Email:', value: 'BCRegistries@gov.bc.ca', href: 'mailto:bcregistries@gov.bc.ca?subject=BC%20Registries%20Support%20Request' }
        ]"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Single Item' }" ui-body="p-4 space-y-4">
      <ConnectContactDisplay
        :contact="{ type: 'phone', title: 'Toll Free:', value: '1-877-370-1033', href: 'tel:+1-877-370-1033' }"
      />
    </ConnectPageSection>
  </div>
</template>
