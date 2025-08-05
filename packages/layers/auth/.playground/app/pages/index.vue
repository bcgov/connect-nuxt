<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-auth',
  // onBeforeSessionExpired: () => console.log('Session expired'),
  onAccountChange: (oldAccount, newAccount) => {
    console.log('Old Account: ', oldAccount.label)
    console.log('New Account: ', newAccount.label)
    return true
  }
})

setOnBeforeSessionExpired(async () => {
  console.log('Starting onBeforeSessionExpired promise')
  await delay(3000)
  console.log('onBeforeSessionExpired promise fulfilled')
})

const { isAuthenticated, login, logout } = useConnectAuth()

// onMounted(async () => {
//   const { getToken } = useConnectAuth()

//   const token = await getToken()
//   console.log(token)
// })

// console.log('AUTHENTICATED: ', auth.authenticated)
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
