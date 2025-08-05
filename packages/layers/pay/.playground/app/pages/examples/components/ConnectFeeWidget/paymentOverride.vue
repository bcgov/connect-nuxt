<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Fee Component (payment override)' }
  ]
})

const feeStore = useConnectFeeStore()
const { userSelectedPaymentMethod } = storeToRefs(feeStore)

const exampleFeeCode = 'BSRCH'

await feeStore.initFees(
  [{ code: exampleFeeCode, entityType: 'BUS', label: 'Example Fee' }],
  { label: 'Placeholder Example', matchServiceFeeToCode: 'BSRCH' }
)
feeStore.addReplaceFee(exampleFeeCode)
await feeStore.initAlternatePaymentMethod()
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Fee Widget (Payment Override Example)' }">
      <div class="p-10 space-y-5">
        <div class="lg:w-[300px]">
          <ConnectFeeWidget />
        </div>
        <div>
          <p class="text-sm">
            Selected Payment: {{ userSelectedPaymentMethod }}
            <br>
            <span class="italic">
              This is the value to pass with your api submission
            </span>
          </p>
        </div>
      </div>
    </ConnectPageSection>
  </div>
</template>
