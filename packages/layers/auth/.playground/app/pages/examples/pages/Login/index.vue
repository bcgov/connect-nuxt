<script setup lang="ts">
import Login from '#auth/app/pages/auth/login.vue'

definePageMeta({ layout: 'connect-auth' })
useHead({ title: 'Login (Playground Wrapper)' })

// Breadcrumbs
const localePath = useLocalePath()
setBreadcrumbs([
  { to: localePath('/'), label: 'Examples' },
  { label: 'Login' }
])
</script>

<template>
  <Login />
</template>
