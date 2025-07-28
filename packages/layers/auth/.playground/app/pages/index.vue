<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const { $connectAuth: auth } = useNuxtApp()

onMounted(async () => {
  const { getToken } = useConnectAuth()

  const token = await getToken()
  console.log(token)
})
</script>

<template>
  <div>
    <HelloWorldAuth />
    <!-- temporary -->
    <div class="flex flex-col gap-4 my-10">
      <UButton label="Login BCSC" @click="auth.login({ idpHint: 'bcsc' })" />
      <UButton label="Logout" @click="auth.logout()" />
      <p>Might need to refresh the page for the authenticated text to update</p>
      <p class="font-bold text-3xl">
        Authenticated: {{ auth.authenticated }}
      </p>
    </div>
  </div>
</template>
