<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Button Control Component (options)' }
  ]
})
const controlManualLoading = useConnectButtonControl('manual-loading', { handleLoading: false })
const controlManualAlert = useConnectButtonControl('manual-alert', { clearAlertTextOnClick: false })

controlManualLoading.setButtonControl({
  leftGroup: {
    buttons: [
      {
        label: 'Manual Loading',
        onClick: async () => {
          controlManualLoading.handleButtonLoading(true, 'left', 0)
          await controlManualLoading.setAlertText('Group Loading Alert', 'left')
          await delay(3000)
          controlManualLoading.handleButtonLoading(false)
        }
      },
      {
        label: 'Clear All Alerts',
        variant: 'outline',
        onClick: () => console.info('All Alerts Cleared')
      }
    ]
  },
  rightGroup: {
    buttons: [
      {
        label: 'Set Alert',
        onClick: () => controlManualLoading.setAlertText('Alert Text', 'right')
      }
    ]
  }
})

controlManualAlert.setButtonControl({
  leftGroup: {
    buttons: [
      {
        label: 'Set Alert',
        onClick: () => controlManualAlert.setAlertText('Group Alert', 'left')
      }
    ]
  },
  rightGroup: {
    buttons: [
      {
        label: 'This will not reset the left alert',
        onClick: () => console.info('no alert clear')
      }
    ]
  }
})

onMounted(initSidebar)
</script>

<template>
  <div class="flex flex-col gap-10">
    <ConnectPageSection :heading="{ label: 'Connect Button Control (manual loading)' }">
      <div class="p-10">
        <ConnectButtonControl state-key="manual-loading" />
      </div>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Connect Button Control (Don`t clear alert text on click)' }"
      :actions="[{ label: 'Clear Alert', onClick: () => controlManualAlert.setAlertText() }]"
    >
      <div class="p-10">
        <ConnectButtonControl state-key="manual-alert" />
      </div>
    </ConnectPageSection>
  </div>
</template>
