<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
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
      <p>Might need to refresh the page for the authenticated text to update</p>
      <ClientOnly>
      <UButton v-if="!isAuthenticated" label="Login" @click="login(ConnectIdpHint.BCSC)" />
      <UButton v-else-if="isAuthenticated" label="Logout" @click="logout()" />
      <div>AUTHENTICATED: {{ isAuthenticated }} </div>
    </ClientOnly>
    </div>
  </div>
</template>
