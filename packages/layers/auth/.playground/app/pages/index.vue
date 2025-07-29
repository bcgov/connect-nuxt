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

        <div class="bg-brandDark p-10">
          <ConnectHeaderUnauthenticatedOptions />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
