<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const { $connectAuth: auth } = useNuxtApp()
</script>

<template>
  <div>
    <HelloWorldAuth />
    <!-- temporary -->
     <div class="flex flex-col gap-4 my-10">
      <UButton @click="auth.login({ idpHint: 'bcsc' })" label="Login BCSC" />
      <UButton @click="auth.logout()" label="Logout" />
      <p>Might need to refresh the page for the authenticated text to update</p>
      <p class="font-bold text-3xl">Authenticated: {{ auth.authenticated }}</p>
     </div>
  </div>
</template>
