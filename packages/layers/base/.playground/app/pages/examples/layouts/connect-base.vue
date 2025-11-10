<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Base Layout' }
  ]
})
</script>

<template>
  <div class="bg-shade-new border-x border-success min-h-screen">
    <div class="mx-auto mt-20 max-w-md text-center">
      <p>
        Slot content (nav bar below is not included by default)
      </p>
      <ConnectLayoutSidebar :items="getBaseSidebarItems()" class="ml-30" />
    </div>
  </div>
</template>
