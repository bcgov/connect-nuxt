<script setup lang="ts">
const ac = useAppConfig().connect.header
</script>
<template>
  <div
    id="connect-header-authenticated-options"
    class="flex gap-4"
  >
    <ConnectHeaderNotifications v-if="ac.notifications" />
    <ConnectHeaderAccountOptionsMenu v-if="ac.accountOptionsMenu" />
  </div>
</template>