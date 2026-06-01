<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const authWebUrl = useRuntimeConfig().public.authWebUrl
const accountStore = useConnectAccountStore()
const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const query = useConnectAuthQuery()
const { data } = query.pendingApprovals()
const count = computed(() => data.value?.count || 0)

const dropdownItems = computed<DropdownMenuItem[]>(() => {
  let options: DropdownMenuItem[] = [{ label: t('connect.text.notifications.none') }]
  if (count.value > 0) {
    options = [{
      to: authWebUrl + `account/${accountStore.currentAccount.id}/settings/team-members`,
      label: t('connect.text.notifications.teamMemberApproval', { count: count.value }, count.value)
    }]
  }
  return options
})
</script>

<template>
  <UDropdownMenu :items="dropdownItems">
    <UChip
      color="error"
      position="top-left"
      inset
      :show="count > 0"
    >
      <UButton
        variant="ghost"
        color="secondary"
        :label="isLargeScreen ? $t('connect.label.notifications') : undefined"
        :aria-label="$t('connect.label.notificationsAria', { count })"
        :trailing-icon="isLargeScreen ? 'i-mdi-caret-down' : ''"
        leading-icon="i-mdi-bell-outline"
        class="px-2 py-1 text-sm"
        :ui="{ leadingIcon: 'size-6 shrink-0' }"
      />
    </UChip>
  </UDropdownMenu>
</template>
