<script setup lang="ts">
import Select from '#auth/app/pages/auth/account/select.vue'

definePageMeta({ layout: 'connect-auth' })
useHead({ title: 'Account Select (Playground Wrapper)' })

// Breadcrumbs
const localePath = useLocalePath()
setBreadcrumbs([
  { to: localePath('/'), label: 'Examples' },
  { label: 'Account' }
])
</script>

<template>
  <Select />
</template>
