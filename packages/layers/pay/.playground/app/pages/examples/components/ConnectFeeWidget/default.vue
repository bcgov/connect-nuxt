<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Fee Component (default)' }
  ]
})

const feeStore = useConnectFeeStore()
const { fees } = storeToRefs(feeStore)

const exampleFeeCode = 'BSRCH'

const { t } = useI18n()
await feeStore.initFees(
  [{ code: exampleFeeCode, entityType: 'BUS', label: t('connect.label.exampleFee') }],
  { label: t('connect.label.examplePlaceholder'), matchServiceFeeToCode: exampleFeeCode }
)

const feeAdded = computed(() => !!fees.value[exampleFeeCode])

const toggleFee = () => {
  if (feeAdded.value) {
    feeStore.removeFee(exampleFeeCode)
  } else {
    feeStore.addReplaceFee(exampleFeeCode)
  }
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
          <UButton :label="$t('connect.label.toggleFee')" @click="toggleFee" />
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
