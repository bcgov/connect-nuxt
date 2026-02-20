<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
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
        color: 'success',
        onClick: () => buttonControl.setAlertText('Alert text no jump', 'left', 0)
      },
      {
        label: 'Left 2',
        icon: 'i-mdi-chevron-left',
        variant: 'outline',
        onClick: () => delay(1000)
      },
      {
        label: 'Left 3',
        icon: 'i-mdi-world',
        variant: 'ghost',
        removeAlertSpacing: true,
        onClick: () => buttonControl.setAlertText('Left 3 click sets alert text on Right Button 3', 'right', 2)
      }
    ]
  },
  rightGroup: {
    buttons: [
      {
        label: 'Right Button 1',
        trailingIcon: 'i-mdi-chevron-right',
        removeAlertSpacing: true,
        onClick: () => buttonControl.setAlertText('Alert text jump', 'right', 0)
      },
      {
        label: 'Right Button 2',
        color: 'error',
        variant: 'soft',
        removeAlertSpacing: true,
        onClick: () => buttonControl.setAlertText('Right Button 2 alert text', 'right', 1)
      },
      {
        label: 'Right Button 3',
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
  <div>
    <ConnectPageSection :heading="{ label: 'Connect Button Control (stacked example)' }">
      <div class="p-10">
        <ConnectButtonControl state-key="stacked" class="mx-auto max-w-[300px] bg-shade-new" />
      </div>
    </ConnectPageSection>
  </div>
</template>
