<script setup lang="ts">
definePageMeta({
  layout: 'connect-pay-tombstone-buttons-stacked',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Pay Tombstone Buttons Stacked Layout' }
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
  leftGroup: { buttons: [] },
  rightGroup: {
    buttons: [
      {
        label: 'Right Button 1',
        class: 'min-w-[300px] justify-center',
        trailingIcon: 'i-mdi-chevron-right',
        removeAlertSpacing: true
      },
      {
        label: 'Right Button 2',
        class: 'min-w-[300px] justify-center',
        color: 'error',
        variant: 'soft',
        removeAlertSpacing: true
      },
      {
        label: 'Right Button 3',
        class: 'min-w-[300px] justify-center',
        color: 'error',
        variant: 'outline'
      }
    ],
    stacked: true
  }
})

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
  <div class="py-10 bg-shade-secondary h-screen">
    <div class="mx-auto mt-20 max-w-md text-center">
      Content wrapped by layout
      <ConnectLayoutSidebar class="ml-30" :items="getBaseSidebarItems()" />
    </div>
  </div>
</template>
