<script setup lang="ts">
definePageMeta({
  layout: 'connect-pay'
})

const feeStore = useConnectFeeStore()

const exampleFeeCode = 'BSRCH'

const { t } = useI18n()
await feeStore.initFees(
  [{ code: exampleFeeCode, entityType: 'BUS', label: t('connect.label.exampleFee') }],
  { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: exampleFeeCode }
)
feeStore.addReplaceFee(exampleFeeCode)
</script>

<template>
  <div>
    Layout
  </div>
</template>
