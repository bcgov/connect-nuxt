<script setup lang="ts">
const ac = useAppConfig().connect.header
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <ConnectHeader>
    <div class="flex gap-4">
      <ConnectHeaderUnauthenticatedOptions />
      <ConnectLocaleSelect v-if="ac.localeSelect" />
    </div>
  </ConnectHeader>
</template>