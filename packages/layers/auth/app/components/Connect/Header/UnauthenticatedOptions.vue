<script setup lang="ts">
const ac = useAppConfig().connect.header
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <div
    id="connect-header-unauthenticated-options"
    class="flex gap-4"
  >
    <!-- whats new slideover -->
    <ConnectHeaderWhatsNew v-if="ac.whatsNew && isLargeScreen" />
    <ConnectHeaderLoginMenu v-if="ac.loginMenu" />
    <ConnectHeaderCreateAccountButton v-if="ac.createAccount && isLargeScreen" />
  </div>
</template>
