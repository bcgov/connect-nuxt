<script setup lang="ts">
definePageMeta({
  layout: 'connect-pay-tombstone-buttons',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Pay Tombstone Buttons Layout' }
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

const buttonControl = useConnectButtonControl()
buttonControl.setButtonControl({
  leftGroup: {
    class: 'max-w-[400px]',
    buttons: [
      { label: 'Left Button 1', variant: 'link', icon: 'i-mdi-world' },
      { label: 'Left Button 2' }
    ]
  },
  rightGroup: {
    class: 'max-w-[400px]',
    buttons: [
      { label: 'Right Button 1', color: 'error', variant: 'outline' },
      { label: 'Right Button 2', color: 'success', trailingIcon: 'i-mdi-chevron-right' }
    ]
  }
})

const { tombstone } = useConnectTombstone()
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
  <div class="py-10 bg-shade-secondary h-screen">
    <div class="mx-auto mt-20 max-w-md text-center">
      Content wrapped by layout
      <ConnectLayoutSidebar class="ml-30" :items="getBaseSidebarItems()" />
    </div>
  </div>
</template>
