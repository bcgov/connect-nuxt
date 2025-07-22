<script setup lang="ts">
const localeSelect = useAppConfig().connect.header.localeSelect
</script>
<template>
  <ConnectHeaderWrapper>
    <div class="flex items-center justify-between">
      <ConnectHeaderLogoHomeLink />
      <ClientOnly>
        <div class="flex gap-4">
          <slot />
          <ConnectLocaleSelect v-if="localeSelect" />
        </div>
      </ClientOnly>
    </div>
  </ConnectHeaderWrapper>
</template>
