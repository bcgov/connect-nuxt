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
</script>

<template>
  <div class="py-10 text-center bg-shade-secondary h-[1200px]">
    Content wrapped by layout
  </div>
</template>
