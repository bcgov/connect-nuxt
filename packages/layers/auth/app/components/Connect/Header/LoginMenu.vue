<script setup lang="ts">
import { useConnectHeaderOptions } from '#auth-composables'
import { useStorage } from '@vueuse/core'

const { loggedOutUserOptions, loggedOutUserOptionsMobile } = useConnectHeaderOptions()
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const whatsNew = useStorage<ConnectWhatsNewState>('connect-whats-new', { viewed: false, items: [] })
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
    <template #whatsnew-trailing>
      <span v-if="!whatsNew.viewed && whatsNew.items.length > 0" class="size-2 rounded-full bg-error" />
    </template>
  </UDropdownMenu>
</template>
