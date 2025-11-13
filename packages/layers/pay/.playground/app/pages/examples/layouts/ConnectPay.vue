<script setup lang="ts">
definePageMeta({
  layout: 'connect-pay',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Pay Layout' }
  ]
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
  <div class="py-10 bg-shade-secondary h-screen">
    <div class="mx-auto mt-20 max-w-md text-center">
      Content wrapped by layout
      <ConnectLayoutSidebar class="ml-30" :items="getBaseSidebarItems()" />
    </div>
  </div>
</template>
