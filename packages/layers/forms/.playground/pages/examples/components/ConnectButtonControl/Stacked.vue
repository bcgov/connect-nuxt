<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Button Control Component (stacked)' }
  ]
})
const { setButtonControl, handleButtonLoading, setAlertText } = useButtonControl()
const showLoading = (position: 'left' | 'right', index: number) => {
  setAlertText(true)
  handleButtonLoading(false, position, index)
  setTimeout(() => {
    handleButtonLoading(true)
  }, 1000)
}
const showAlertText = (position: 'left' | 'right', index: number, text: string) => {
  setAlertText(false, position, index, text)
}
setButtonControl({
  leftGroup: {
    buttons: [
      {
        label: 'Left 1',
        icon: 'i-mdi-chevron-up',
        class: 'min-w-[300px] justify-center',
        color: 'success',
        onClick: () => showAlertText('left', 0, 'Alert text no jump')
      },
      {
        label: 'Left 2',
        icon: 'i-mdi-chevron-left',
        class: 'min-w-[142px] justify-center',
        variant: 'outline',
        removeAlertSpacing: true,
        onClick: () => showLoading('left', 1)
      },
      {
        label: 'Left 3',
        icon: 'i-mdi-world',
        class: 'min-w-[142px] justify-center',
        variant: 'ghost',
        removeAlertSpacing: true,
        onClick: () => showAlertText('right', 2, 'Left 3 alert text')
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
        onClick: () => showAlertText('right', 0, 'Alert text jump')
      },
      {
        label: 'Right Button 2',
        class: 'min-w-[300px] justify-center',
        color: 'error',
        variant: 'soft',
        removeAlertSpacing: true,
        onClick: () => showAlertText('right', 2, 'Right Button 2 alert text')
      },
      {
        label: 'Right Button 3',
        class: 'min-w-[300px] justify-center',
        color: 'error',
        variant: 'outline',
        onClick: () => showAlertText('right', 2, 'Right Button 3 alert text')
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
        <ConnectButtonControl class="mx-auto max-w-[300px] bg-shade-new" />
      </div>
    </ConnectPageSection>
  </div>
</template>
