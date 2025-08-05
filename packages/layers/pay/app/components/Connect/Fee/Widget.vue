<script setup lang="ts">
const { t } = useI18n()
const {
  feeOptions,
  fees,
  placeholderFeeItem,
  total,
  totalServiceFees,
  totalFutureEffectiveFees,
  totalPriorityFees,
  totalProcessingFees,
  totalGst,
  totalPst,
  userSelectedPaymentMethod,
  allowedPaymentMethods,
  userPaymentAccount,
  allowAlternatePaymentMethod
} = storeToRefs(useConnectFeeStore())

const isPlaceholderActive = ref(false)

watch(fees, (v) => {
  if (v && (Object.keys(v).length > 0)) {
    isPlaceholderActive.value = false
  } else {
    isPlaceholderActive.value = true
  }
}, { immediate: true, deep: true })

const feeItems = computed<ConnectFeeItem[]>(() => {
  if (!isPlaceholderActive.value) {
    return Object.values(fees.value)
  }
  return [placeholderFeeItem.value]
})

// folding stuff
const folded = ref(false)

const isFoldable = useMediaQuery('(max-width: 1024px)')
watch(isFoldable, (val) => {
  if (!val) {
    folded.value = false
  }
})

const toggleFolded = () => {
  if (isFoldable.value) {
    folded.value = !folded.value
  }
}

const getItemFee = (feeItem: ConnectFeeItem) => {
  if (feeItem.isPlaceholder) {
    return '$ -'
  }
  if (feeItem.waived) {
    return t('connect.label.noFee')
  }
  return `$${(feeItem.filingFees * (feeItem.quantity || 1)).toFixed(2)}`
}
</script>

<template>
  <div
    data-testid="fee-widget"
    class="z-10 rounded bg-white lg:shadow-sm"
  >
    <UButton
      :tabindex="isFoldable ? 0 : -1"
      :role="isFoldable ? 'button' : 'title'"
      class="flex w-full bg-brand py-2 pl-4 text-lg lg:text-3xl font-bold transition-all"
      :class="[folded ? 'rounded' : 'rounded-b-none rounded-t', isFoldable ? '' : 'pointer-events-none']"
      :aria-label="$t('connect.label.feeSummary')"
      :label="$t('connect.label.feeSummary')"
      @click="toggleFolded"
    >
      <template #trailing>
        <div class="flex grow justify-end pr-1">
          <UIcon
            v-if="isFoldable"
            class="size-7"
            :name="folded ? 'i-mdi-chevron-down' : 'i-mdi-chevron-up'"
          />
        </div>
      </template>
    </UButton>
    <ConnectTransitionCollapse>
      <div v-if="!folded">
        <div class="divide-y divide-line-muted pt-1 text-sm">
          <div
            v-for="feeItem in feeItems"
            :key="feeItem.filingTypeCode"
            data-testid="fee-item"
            class="flex justify-between px-4 py-3"
          >
            <div>
              <p class="flex items-center gap-1 font-bold">
                <span>{{ feeItem.label }}</span>
              </p>
              <p
                v-if="feeItem.quantity !== undefined && feeItem.quantityDesc"
                class="pl-4 text-neutral-toned"
              >
                x {{ feeItem.quantity }} {{ feeItem.quantityDesc }}
              </p>
            </div>
            <p>{{ getItemFee(feeItem) }}</p>
          </div>
          <ConnectFeeExtraFee
            v-if="!!feeOptions.showFutureEffectiveFee"
            data-testid="future-effective-fee"
            :description="$t('connect.label.futureEffectiveFee')"
            :fee="totalFutureEffectiveFees"
            show-fee-value
          />
          <ConnectFeeExtraFee
            v-if="!!feeOptions.showPriorityFee"
            data-testid="priority-fee"
            :description="$t('connect.label.priorityFee')"
            :fee="totalPriorityFees"
            show-fee-value
          />
          <ConnectFeeExtraFee
            v-if="!!feeOptions.showProcessingFee"
            data-testid="processing-fee"
            :description="$t('connect.label.processingFee')"
            :fee="totalProcessingFees"
            show-fee-value
          />
          <ConnectFeeExtraFee
            v-if="!!feeOptions.showServiceFee"
            data-testid="service-fee"
            :description="$t('connect.label.serviceFee')"
            :fee="isPlaceholderActive ? placeholderFeeItem.serviceFees : totalServiceFees"
            show-fee-value
          />
          <ConnectFeeExtraFee
            v-if="!!feeOptions.showPst"
            data-testid="pst-fee"
            :description="$t('connect.label.pst')"
            :fee="totalPst"
            show-fee-value
          />
          <ConnectFeeExtraFee
            v-if="!!feeOptions.showGst"
            data-testid="gst-fee"
            :description="$t('connect.label.gst')"
            :fee="totalGst"
            show-fee-value
          />
        </div>
        <div class="flex flex-row items-end justify-between border-t border-line-muted p-3">
          <p class="mb-1 font-bold">
            {{ $t("connect.label.totalFees") }}
          </p>
          <p class="flex items-end text-sm text-neutral">
            <span class="mb-1">{{ $t("connect.label.cad") }}</span>
            <b class="ml-[5px] flex items-end text-2xl text-black">
              {{ !isPlaceholderActive ? `$${total.toFixed(2)}` : '$ -' }}
            </b>
          </p>
        </div>
        <USelect
          v-if="allowAlternatePaymentMethod && allowedPaymentMethods.length > 1"
          v-model="userSelectedPaymentMethod"
          :items="allowedPaymentMethods"
          variant="none"
          :content="{ sideOffset: -1 }"
          :ui="{
            base: 'rounded-none px-4 py-2 w-full focus-visible:ring-2 focus-visible:ring-primary',
            content: 'rounded-t-none',
            trailingIcon: 'ml-auto',
            itemTrailingIcon: 'hidden',
          }"
        >
          <span class="text-xs text-left">
            {{
              $t(`connect.payMethod.text.${userSelectedPaymentMethod}`, {
                account: userPaymentAccount?.cfsAccount?.bankAccountNumber },
              )
            }}
          </span>
        </USelect>
      </div>
    </ConnectTransitionCollapse>
  </div>
</template>
