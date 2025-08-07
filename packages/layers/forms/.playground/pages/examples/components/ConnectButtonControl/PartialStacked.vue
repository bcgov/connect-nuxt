<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Button Control Component (partial stacked)' }
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
      label: 'Left 1',
      icon: 'i-mdi-chevron-left',
      class: 'justify-center',
      variant: 'outline',
      removeAlertSpacing: true,
      onClick: () => showLoading('left', 0)
    },
    {
      label: 'Left 2',
      icon: 'i-mdi-world',
      class: 'justify-center',
      variant: 'ghost',
      removeAlertSpacing: true,
      onClick: () => showLoading('left', 1)
    }
  ],
  rightButtons: [
    {
      label: 'Right Button 1',
      class: 'min-w-[260px] justify-center',
      trailingIcon: 'i-mdi-chevron-right',
      onClick: () => showAlertText('right', 0, 'Alert text')
    }
  ]
})
</script>

<template>
  <div class="my-10">
    <ConnectPageSection :heading="{ label: 'Connect Button Control (partial stacked container example)' }">
      <div class="p-10">
        <ConnectButtonControl class="mx-auto max-w-[300px] bg-shade-new" />
      </div>
    </ConnectPageSection>
  </div>
</template>
