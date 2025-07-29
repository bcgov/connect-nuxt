<script setup lang="ts">
const { createAccountUrl } = useConnectNav()
</script>
<template>
  <UButton
    variant="ghost"
    color="secondary"
    class="px-2 py-1 text-sm"
    :label="$t('connect.label.createAccount')"
    :to="createAccountUrl()"
  />
</template>
