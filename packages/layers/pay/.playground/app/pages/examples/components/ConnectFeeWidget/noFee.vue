<script setup lang="ts">
const { t } = useI18n()
const feeStore = useConnectFeeStore()

definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Fee Component (no fee)' }
  ]
})

const exampleFeeCode = 'NOCOI'
await feeStore.initFees(
  [{ code: exampleFeeCode, entityType: 'CC', label: 'Officer Change' }],
  { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: exampleFeeCode }
).then(() => {
  feeStore.addReplaceFee(exampleFeeCode)
})
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Fee Widget (No Fee Example)' }">
      <div class="p-10 space-y-5">
        <div>
          The text `No Fee` is displayed if the fee is 0.
        </div>
        <div class="lg:w-[300px]">
          <ConnectFeeWidget />
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
