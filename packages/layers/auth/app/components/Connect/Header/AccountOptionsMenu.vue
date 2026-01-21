<script setup lang="ts">
const { loggedInUserOptions } = useConnectHeaderOptions()
const { authUser } = useConnectAuth()
const accountStore = useConnectAccountStore()
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <UDropdownMenu
    id="account-options-menu"
    :items="loggedInUserOptions"
    :ui="{
      content: 'max-w-[90dvw] account-options-menu-pw-selector',
    }"
  >
    <UButton
      id="account-options-button"
      color="secondary"
      variant="ghost"
      :aria-label="$t('connect.label.accountOptionsMenu')"
      :icon="isLargeScreen ? 'i-mdi-caret-down' : ''"
      trailing
      class="px-2 py-1"
    >
      <ConnectHeaderAccountLabel
        v-if="isLargeScreen"
        :username="parseSpecialCharacters(authUser.fullName, 'USER')"
        :account-name="accountStore.currentAccount.label
          ? parseSpecialCharacters(accountStore.currentAccount.label, 'ACCOUNT')
          : ''
        "
      />

      <UAvatar
        v-if="!isLargeScreen"
        :text="parseSpecialCharacters(authUser.fullName, 'U')[0]!.toUpperCase()"
        size="md"
        :ui="{ root: 'bg-blue-300 rounded-none text-lg', fallback: 'text-inverted font-bold' }"
      />
    </UButton>
    <template #account>
      <ConnectHeaderAccountLabel
        :username="parseSpecialCharacters(authUser.fullName, 'USER')"
        :account-name="accountStore.currentAccount.label
          ? parseSpecialCharacters(accountStore.currentAccount.label, 'ACCOUNT')
          : ''
        "
        theme="dropdown"
      />
    </template>
  </UDropdownMenu>
</template>
