<script setup lang="ts">
withDefaults(defineProps<{
  accounts: ConnectAccount[]
  showPaymentMethodBadge?: boolean
  showStatusBadge?: boolean
  showAddress?: boolean
}>(), {
  showPaymentMethodBadge: true,
  showStatusBadge: true,
  showAddress: true
})

defineEmits<{
  select: [id: number]
}>()
</script>

<template>
  <section class="space-y-4">
    <ConnectI18nHelper
      as="h2"
      class="font-normal"
      translation-path="connect.label.yourExistingAccounts"
      :count="accounts.length"
    />
    <ul
      class="bg-white flex flex-col divide-y divide-line-muted rounded p-8 max-h-[50dvh] overflow-y-auto"
    >
      <ConnectAccountExistingListItem
        v-for="account in accounts"
        :key="account.id"
        :account
        :show-payment-method-badge="showPaymentMethodBadge"
        :show-status-badge="showStatusBadge"
        :show-address="showAddress"
        @select="$emit('select', $event)"
      />
    </ul>
  </section>
</template>
