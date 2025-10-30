<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Locale Select' }
  ]
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectLocaleSelect
    </h1>

    <ConnectPageSection :heading="{ label: 'Example' }">
      <div class="p-10 bg-midnightBlue-900">
        <ConnectLocaleSelect />
      </div>
    </ConnectPageSection>
  </div>
</template>
