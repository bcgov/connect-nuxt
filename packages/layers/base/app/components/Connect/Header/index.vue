<script setup lang="ts">
const headerConfig = useAppConfig().connect.header
</script>

<template>
  <ConnectHeaderWrapper>
    <div class="flex items-center justify-between">
      <ConnectHeaderLogoHomeLink />
      <ClientOnly>
        <div class="flex gap-4">
          <slot />
          <ConnectHeaderWhatsNew v-if="headerConfig.whatsNew" />
          <ConnectLocaleSelect v-if="headerConfig.localeSelect" />
        </div>
      </ClientOnly>
    </div>
  </ConnectHeaderWrapper>
</template>
