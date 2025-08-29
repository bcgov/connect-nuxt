<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'test 1', to: '/' }, { label: 'test 2', to: '/fake' }, { label: 'test 3' }
  ]
})
</script>

<template>
  <div>
    <HelloWorld />
    <span class="text-highlighted font-bold">This should be 212529</span>
  </div>
</template>
