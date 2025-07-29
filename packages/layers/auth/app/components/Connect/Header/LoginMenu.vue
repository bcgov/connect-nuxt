<script setup lang="ts">
const { loggedOutUserOptions, loggedOutUserOptionsMobile } = useConnectNav()
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>
<template>
  <UDropdownMenu
    id="login-menu"
    :items="isLargeScreen ? loggedOutUserOptions : loggedOutUserOptionsMobile"
  >
    <UButton
      variant="ghost"
      color="secondary"
      :label="isLargeScreen ? $t('connect.label.login') : undefined"
      :aria-label="isLargeScreen ? $t('connect.label.selectLoginMethod') : $t('connect.label.mainMenu')"
      :icon="isLargeScreen ? 'i-mdi-caret-down' : 'i-mdi-menu'"
      trailing
      class="px-2 py-1 text-sm"
    />

    <!-- whats new slot, only shows on small screens -->
    <!-- <template #whats-new="{ item }">
      <UIcon v-if="item.icon" :name="item.icon" class="size-6 shrink-0 text-bcGovColor-midGray" />
      <span class="truncate">{{ item.label }}</span>
      <span v-if="!whatsNewStore.hasViewedWhatsNew && !!whatsNewStore.whatsNewItems.length" class="size-2 rounded-full bg-red-500" />
    </template> -->
  </UDropdownMenu>
</template>
