<script setup lang="ts">
const {
  account,
  showPaymentMethodBadge = false,
  showStatusBadge = false,
  showAddress = false
} = defineProps<{
  account: ConnectAccount
  showPaymentMethodBadge?: boolean
  showStatusBadge?: boolean
  showAddress?: boolean
}>()

const emit = defineEmits<{
  select: [id: number]
}>()

// ACTIVE is always selectable. Of the non-active statuses, only NSF_SUSPENDED also stays
// enabled (it redirects below instead of emitting select) - everything else stays disabled.
const isNsfSuspended = computed(() => account.accountStatus === AccountStatus.NSF_SUSPENDED)
const isUnusable = computed(() => account.accountStatus !== AccountStatus.ACTIVE && !isNsfSuspended.value)

function handleSelect() {
  if (isNsfSuspended.value) {
    useConnectAccountStore().redirectToAccountInfo(account)
    return
  }
  emit('select', account.id)
}

const statusBadgeLabel = computed(() => {
  if (!isNsfSuspended.value) {
    return undefined
  }
  if (account.hasOverdueInvoices) {
    return 'connect.badge.statementOverdue'
  }
  return 'connect.badge.nonSufficientFunds'
})

const paymentMethodIcons: Record<string, string> = {
  CASH: 'i-mdi-cash',
  CC: 'i-mdi-credit-card-outline',
  CHEQUE: 'i-mdi-checkbook',
  DIRECT_PAY: 'i-mdi-credit-card-outline',
  DRAWDOWN: 'i-mdi-link-variant',
  EFT: 'i-mdi-arrow-right-circle-outline',
  EJV: 'i-mdi-file-document-outline',
  ONLINE_BANKING: 'i-mdi-currency-usd',
  PAD: 'i-mdi-bank-outline'
}
const paymentMethodIcon = computed(() => paymentMethodIcons[account.paymentMethod ?? ''])

const address = computed(() => account.address)
const addressLine = computed(() => {
  const addr = address.value
  if (!addr) {
    return undefined
  }
  return [addr.street, addr.city, addr.region, addr.postalCode, addr.country].filter(Boolean).join(', ')
})
</script>

<template>
  <li class="flex flex-col items-start justify-between gap-4 py-8 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
    <div
      class="flex flex-row items-center gap-4 sm:gap-6"
      :class="{
        'opacity-50': isUnusable
      }"
    >
      <UAvatar
        :alt="account.label[0]"
        :ui="{
          root: 'bg-blue-300 rounded-sm',
          fallback: 'text-white font-bold text-xl'
        }"
      />
      <div class="flex w-full flex-col text-left">
        <span class="text-lg font-bold text-neutral-highlighted">
          {{ account.label }}
        </span>
        <span v-if="showAddress && addressLine" class="text-sm text-neutral">
          {{ addressLine }}
        </span>
        <div class="mt-1 flex flex-wrap gap-2">
          <UBadge
            v-if="showPaymentMethodBadge && account.paymentMethod"
            :label="$t(`connect.badge.paymentMethod.${account.paymentMethod}`)"
            :icon="paymentMethodIcon"
            variant="subtle"
            color="neutral"
            class="rounded-sm px-3 text-center font-bold uppercase"
          />
          <UBadge
            v-if="showStatusBadge && statusBadgeLabel"
            :label="$t(statusBadgeLabel)"
            icon="i-mdi-alert-outline"
            color="error"
            variant="solid"
            class="rounded-sm px-3 text-center font-bold uppercase"
          />
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 sm:w-fit sm:flex-row">
      <div class="my-auto flex gap-2">
        <UBadge
          v-if="isUnusable"
          :label="$t('connect.badge.inactiveAccount')"
          class="bg-[#fff7e3] px-3 text-center font-bold text-neutral"
        />
      </div>

      <UButton
        :label="$t('connect.label.useThisAccount')"
        :aria-label="$t('connect.label.useThisAccountAria', { name: account.label })"
        :icon="'i-mdi-chevron-right'"
        trailing
        :disabled="isUnusable"
        size="xl"
        data-testid="choose-existing-account-button"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="handleSelect"
      />
    </div>
  </li>
</template>
