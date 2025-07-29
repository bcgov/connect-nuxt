<script setup lang="ts">
const headerConfig = useAppConfig().connect.header
</script>

<template>
  <ConnectHeaderWrapper>
    <div class="flex items-center justify-between">
      <ConnectHeaderLogoHomeLink />
      <div class="flex gap-4">
        <slot>
          <ConnectHeaderWhatsNew v-if="headerConfig.whatsNew" />
          <ConnectLocaleSelect v-if="headerConfig.localeSelect" />
        </slot>
      </div>
    </div>
  </ConnectHeaderWrapper>
</template>
