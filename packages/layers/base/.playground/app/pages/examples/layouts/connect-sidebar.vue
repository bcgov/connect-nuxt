<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Sidebar Layout' }
  ]
})

onMounted(initSidebar)
</script>

<template>
  <div class="bg-shade-new border border-success min-h-screen text-center">
    <p class="mt-20">
      Slot content
    </p>
  </div>
</template>
