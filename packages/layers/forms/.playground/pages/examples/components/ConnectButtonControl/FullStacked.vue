<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Button Control Component (full stacked)' }
  ]
})
const { setButtonControl, handleButtonLoading, setAlertText } = useButtonControl()
const showLoading = (position: 'left' | 'right', index: number) => {
  handleButtonLoading(false, position, index)
  setTimeout(() => {
    handleButtonLoading(true)
  }, 1000)
}
const showAlertText = (position: 'left' | 'right', index: number, text: string) => {
  setAlertText(false, position, index, text)
  setTimeout(() => {
    setAlertText(true)
  }, 5000)
}
setButtonControl({
  leftButtons: [
    {
      label: 'Left Button 1',
      icon: 'i-mdi-chevron-left',
      class: 'min-w-[250px] justify-center',
      variant: 'outline',
      removeAlertSpacing: true,
      onClick: () => showLoading('left', 0)
    },
    {
      label: 'Left Button 2',
      icon: 'i-mdi-world',
      class: 'min-w-[250px] justify-center',
      variant: 'ghost',
      removeAlertSpacing: true,
      onClick: () => showAlertText('left', 1, 'Alert text jumps')
    }
  ],
  rightButtons: [
    {
      label: 'Right Button 1',
      class: 'min-w-[250px] justify-center',
      trailingIcon: 'i-mdi-chevron-right',
      onClick: () => showAlertText('right', 0, 'Alert text no jump (default)')
    }
  ]
})
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Button Control (full stacked container example)' }">
      <div class="p-10">
        <ConnectButtonControl class="mx-auto max-w-[280px] bg-shade-new" />
      </div>
    </ConnectPageSection>
  </div>
</template>
