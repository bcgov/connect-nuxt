<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth'
})

const feeStore = useConnectFeeStore()

const exampleFeeCode1 = 'BSRCH'
const exampleFeeCode2 = 'CGOOD'
const exampleFeeCode3 = 'NM620'
const exampleFeeCode4 = 'BCINC'

const { t } = useI18n()
await feeStore.initFees(
  [
    { code: exampleFeeCode1, entityType: 'BUS', label: t('connect.label.exampleFee') + '1' },
    { code: exampleFeeCode2, entityType: 'BUS', label: t('connect.label.exampleFee') + '2' },
    { code: exampleFeeCode3, entityType: 'NRO', label: t('connect.label.exampleFee') + '3' },
    { code: exampleFeeCode4, entityType: 'BC', label: t('connect.label.exampleFee') + '4' }
  ],
  { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: exampleFeeCode1 }
)
feeStore.addReplaceFee(exampleFeeCode1)
feeStore.addReplaceFee(exampleFeeCode2)
feeStore.addReplaceFee(exampleFeeCode3)
feeStore.addReplaceFee(exampleFeeCode4)
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Fee Widget (Basic Example)' }">
      <div class="p-10 space-y-5">
        <div class="lg:w-[300px]">
          <ConnectFeeWidget />
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
