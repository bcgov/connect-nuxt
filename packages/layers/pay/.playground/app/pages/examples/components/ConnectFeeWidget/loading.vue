<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Fee Component (loading)' }
  ]
})

const feeStore = useConnectFeeStore()

const exampleFeeCode = 'BSRCH'

const { t } = useI18n()

const loadFees = async () => {
  await feeStore.initFees(
    [{ code: exampleFeeCode, entityType: 'BUS', label: t('connect.label.exampleFee') }],
    { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: exampleFeeCode }
  )
  feeStore.addReplaceFee(exampleFeeCode)
}
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Fee Widget (Loading Example)' }">
      <div class="p-10 space-y-5">
        <div>
          A loading state will be displayed if no fees have been fetched yet or fees are being initialized.
        </div>
        <div class="lg:w-[300px]">
          <ConnectFeeWidget />
        </div>
        <div class="space-x-4">
          <UButton :label="$t('connect.label.loadFees')" @click="loadFees" />
          <UButton :label="$t('connect.label.resetFees')" @click="feeStore.$reset()" />
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
