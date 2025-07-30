<script setup lang="ts">
const ac = useAppConfig().connect.header
const { isAuthenticated } = useConnectAuth()
</script>

<template>
  <ConnectHeader>
    <div class="flex gap-4">
      <ConnectHeaderAuthenticatedOptions v-if="isAuthenticated" />
      <ConnectHeaderUnauthenticatedOptions v-else />
      <ConnectLocaleSelect v-if="ac.localeSelect" />
    </div>
  </ConnectHeader>
</template>
