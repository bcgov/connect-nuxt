<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Footer' }
  ]
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectFooter
    </h1>
    <ConnectPageSection :heading="{ label: 'Example' }">
      <ConnectFooter />
    </ConnectPageSection>
  </div>
</template>
