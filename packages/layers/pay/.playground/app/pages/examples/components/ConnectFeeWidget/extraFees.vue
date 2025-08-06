<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Fee Component (extra fees)' }
  ]
})

const feeStore = useConnectFeeStore()
const { feeOptions } = storeToRefs(feeStore)

const examplePriorityFeeCode = 'NM620'
const exampleFutureEffectiveFeeCode = 'BCINC'

const { t } = useI18n()
await feeStore.initFees(
  [
    { code: examplePriorityFeeCode, entityType: 'NRO', label: t('connect.label.exampleFeePriority') },
    { code: exampleFutureEffectiveFeeCode, entityType: 'BC', label: t('connect.label.exampleFeeFutureEffective') }
  ],
  { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: examplePriorityFeeCode },
  { showFutureEffectiveFee: true, showPriorityFee: true }
)

feeStore.addReplaceFee(examplePriorityFeeCode, { priority: true })
feeStore.addReplaceFee(exampleFutureEffectiveFeeCode, { futureEffective: true })

const togglePriorityFee = () => {
  feeStore.addReplaceFee(examplePriorityFeeCode, { priority: !feeOptions.value.showPriorityFee })
  feeOptions.value.showPriorityFee = !feeOptions.value.showPriorityFee
}
const toggleFutureEffectiveFee = () => {
  feeStore.addReplaceFee(exampleFutureEffectiveFeeCode, { futureEffective: !feeOptions.value.showFutureEffectiveFee })
  feeOptions.value.showFutureEffectiveFee = !feeOptions.value.showFutureEffectiveFee
}
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Fee Widget (Extra Fees Example)' }">
      <div class="p-10 space-y-5">
        <div class="lg:w-[300px]">
          <ConnectFeeWidget />
        </div>
        <div class="flex gap-5">
          <UButton
            :label="$t('connect.label.togglePriority')"
            @click="togglePriorityFee"
          />
          <UButton
            :label="$t('connect.label.toggleFutureEffective')"
            @click="toggleFutureEffectiveFee"
          />
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
