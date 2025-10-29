<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Button Control Component (stacked)' }
  ]
})
const buttonControl = useConnectButtonControl('stacked')

buttonControl.setButtonControl({
  leftGroup: {
    buttons: [
      {
        label: 'Left 1',
        icon: 'i-mdi-chevron-up',
        class: 'min-w-[300px] justify-center',
        color: 'success',
        onClick: () => buttonControl.setAlertText('Alert text no jump', 'left', 0)
      },
      {
        label: 'Left 2',
        icon: 'i-mdi-chevron-left',
        class: 'min-w-[142px] justify-center',
        variant: 'outline',
        removeAlertSpacing: true,
        onClick: () => delay(1000)
      },
      {
        label: 'Left 3',
        icon: 'i-mdi-world',
        class: 'min-w-[142px] justify-center',
        variant: 'ghost',
        removeAlertSpacing: true,
        onClick: () => buttonControl.setAlertText('Left 3 alert text', 'left', 2)
      }
    ]
  },
  rightGroup: {
    buttons: [
      {
        label: 'Right Button 1',
        class: 'min-w-[300px] justify-center',
        trailingIcon: 'i-mdi-chevron-right',
        removeAlertSpacing: true,
        onClick: () => buttonControl.setAlertText('Alert text jump', 'right', 0)
      },
      {
        label: 'Right Button 2',
        class: 'min-w-[300px] justify-center',
        color: 'error',
        variant: 'soft',
        removeAlertSpacing: true,
        onClick: () => buttonControl.setAlertText('Right Button 2 alert text', 'right', 1)
      },
      {
        label: 'Right Button 3',
        class: 'min-w-[300px] justify-center',
        color: 'error',
        variant: 'outline',
        onClick: () => buttonControl.setAlertText('Right Button 3 alert text', 'right', 2)
      }
    ],
    stacked: true
  }
})
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Button Control (stacked example)' }">
      <div class="p-10">
        <ConnectButtonControl state-key="stacked" class="mx-auto max-w-[300px] bg-shade-new" />
      </div>
    </ConnectPageSection>
  </div>
</template>
