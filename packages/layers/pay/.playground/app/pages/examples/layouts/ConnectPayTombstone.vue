<script setup lang="ts">
definePageMeta({
  layout: 'connect-pay-tombstone',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Pay Tombstone Layout' }
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

const { tombstone } = useConnectTombstone('connect-pay-header-tombstone')
tombstone.value.title = { as: 'span', text: 'Basic Title Here' }
tombstone.value.subtitles = [{ text: 'BC Cooperative Association' }]
tombstone.value.sideDetails = [
  { label: 'Business Number', value: '609760293752375' },
  { label: 'Incorporation Number', value: 'BC1234567' },
  { label: 'Email', value: 'email@example.com' },
  { label: 'Phone', value: '250-123-4567' }
]
</script>

<template>
  <div class="py-10 text-center bg-shade-secondary h-[900px]">
    Content wrapped by layout
  </div>
</template>
