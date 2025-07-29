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
    <!-- login options dropdown or main menu on small screens -->
    <ConnectHeaderLoginMenu v-if="ac.loginMenu" />
    <!-- create account button, hidden on small screens -->
    <ConnectHeaderCreateAccountButton v-if="ac.createAccount && isLargeScreen" />
  </div>
</template>
