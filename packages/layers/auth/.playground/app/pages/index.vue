<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-auth',
  onAccountChange: (oldAccount, newAccount) => {
    console.info('Old Account: ', oldAccount.label)
    console.info('New Account: ', newAccount.label)
    return true
  },
  breadcrumbs: [{ label: 'test1', to: '/test1', appendAccountId: true }, { label: 'test2', to: '/test2' }]
})

setOnBeforeSessionExpired(async () => {
  console.info('Starting onBeforeSessionExpired promise')
  await delay(3000)
  console.info('onBeforeSessionExpired promise fulfilled')
})

const { isAuthenticated, login, logout } = useConnectAuth()

// onMounted(async () => {
//   const { getToken } = useConnectAuth()

//   const token = await getToken()
//   console.info(token)
// })

// console.info('AUTHENTICATED: ', auth.authenticated)
</script>

<template>
  <div>
    <HelloWorldAuth />
    <!-- temporary -->
    <div class="flex flex-col gap-4 my-10">
      <ClientOnly>
        <UButton
          v-if="!isAuthenticated"
          label="Login"
          @click="login(ConnectIdpHint.BCSC)"
        />
        <UButton
          v-else-if="isAuthenticated"
          label="Logout"
          @click="logout()"
        />
        <div>AUTHENTICATED: {{ isAuthenticated }} </div>
      </ClientOnly>
    </div>
  </div>
</template>
