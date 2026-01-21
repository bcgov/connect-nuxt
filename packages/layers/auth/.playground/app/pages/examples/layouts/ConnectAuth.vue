<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Auth Layout' }
  ],
  middleware: ['connect-auth']
})
</script>

<template>
  <div class="py-10 bg-shade-secondary h-screen">
    <div class="mx-auto mt-20 max-w-md text-center">
      Content wrapped by layout
    </div>
  </div>
</template>
