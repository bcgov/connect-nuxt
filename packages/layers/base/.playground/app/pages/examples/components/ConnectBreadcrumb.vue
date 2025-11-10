<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Breadcrumb' }
  ]
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectBreadcrumb
    </h1>

    <ConnectPageSection :heading="{ label: 'Example' }" ui-body="p-4 space-y-4">
      <ConnectBreadcrumb />
    </ConnectPageSection>
  </div>
</template>
