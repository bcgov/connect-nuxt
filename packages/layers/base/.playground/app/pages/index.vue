<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples' }
  ]
})

onMounted(() => {
  initSidebar()
})
</script>

<template>
  <div>
    <h1>Connect Base Layer Examples</h1>
    <p class="mt-6">
      Select an item from the menu to view an example
    </p>
  </div>
</template>
