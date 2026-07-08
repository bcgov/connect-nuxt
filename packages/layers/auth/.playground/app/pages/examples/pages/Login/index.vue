<script setup lang="ts">
import Login from '#auth/app/pages/auth/login.vue'

const appConfig = useAppConfig()

definePageMeta({ layout: 'connect-auth' })
useHead({ title: 'Login (Playground Wrapper)' })

// Breadcrumbs
const localePath = useLocalePath()
setBreadcrumbs([
  { to: localePath('/'), label: 'Examples' },
  { label: 'Login' }
])

onMounted(() => {
  appConfig.connectOverrides = {
    bcscUser: {
      login: {
        idps: ['bcsc'],
        idpEnforcement: true,
        alert: {
          title: 'Welcome to the new Business Registry',
          message: 'To complete the move of your business, sign in or create an account using your BC Services '
            + 'Card below.'
        }
      }
    },
    defaultUser: {
      login: {
        idps: ['bcsc', 'bceid', 'idir'],
        idpEnforcement: false,
        alert: undefined
      }
    }
  }
})
</script>

<template>
  <Login />
</template>
