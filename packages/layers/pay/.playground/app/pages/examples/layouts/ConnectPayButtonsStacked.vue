<script setup lang="ts">
definePageMeta({
  layout: 'connect-pay-buttons-stacked',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Pay Buttons Stacked Layout' }
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
    buttons: [
      {
        label: 'Left 1',
        icon: 'i-mdi-chevron-left',
        removeAlertSpacing: true,
        variant: 'outline'
      },
      {
        label: 'Left 2',
        trailingIcon: 'i-mdi-chevron-right',
        removeAlertSpacing: true
      }
    ]
  },
  rightGroup: {
    buttons: [
      {
        label: 'Right Button 1',
        trailingIcon: 'i-mdi-chevron-right',
        removeAlertSpacing: true
      },
      {
        label: 'Right Button 2',
        color: 'error',
        variant: 'soft',
        removeAlertSpacing: true
      },
      {
        label: 'Right Button 3',
        color: 'error',
        variant: 'outline'
      }
    ],
    stacked: true
  }
})
</script>

<template>
  <div class="py-10 bg-shade-secondary h-screen">
    <div class="mx-auto mt-20 max-w-md text-center">
      Content wrapped by layout
      <ConnectLayoutSidebar class="ml-30" :items="getBaseSidebarItems()" />
    </div>
  </div>
</template>
