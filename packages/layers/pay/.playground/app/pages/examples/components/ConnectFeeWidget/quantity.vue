<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth'
})

const feeStore = useConnectFeeStore()

const exampleFeeCode = 'BSRCH'

const { t } = useI18n()
await feeStore.initFees(
  [{
    code: exampleFeeCode,
    entityType: 'BUS',
    label: t('connect.label.exampleFee'),
    quantityDesc: t('connect.label.quantityDescriptor')
  }],
  { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: exampleFeeCode }
)

const quantity = ref(1)
feeStore.addReplaceFee(exampleFeeCode, { quantity: quantity.value })

const increaseQuantity = () => {
  quantity.value = quantity.value + 1
  feeStore.addReplaceFee(exampleFeeCode, { quantity: quantity.value })
}
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Fee Widget (Basic Example)' }">
      <div class="p-10 space-y-5">
        <div class="lg:w-[300px]">
          <ConnectFeeWidget />
        </div>
        <div>
          <UButton :label="$t('connect.label.increaseQuantity')" @click="increaseQuantity" />
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
