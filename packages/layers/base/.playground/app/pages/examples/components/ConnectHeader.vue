<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Header' }
  ]
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectHeader
    </h1>
    <ConnectPageSection :heading="{ label: 'Example' }">
      <ConnectHeader />
    </ConnectPageSection>
  </div>
</template>
