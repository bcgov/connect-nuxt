<script setup lang="ts">
definePageMeta({
  layout: 'connect-form',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Form Layout' }
  ]
})
const { setButtonControl, handleButtonLoading, setAlertText } = useButtonControl()
const handleClick = (position: 'left' | 'right', index: number) => {
  if (position === 'right') {
    if (index === 0) {
      setAlertText(false, 'right', undefined, 'Alert text side')
    } else {
      setAlertText(false, 'right', index, 'Alert text underneath')
    }
  } else {
    handleButtonLoading(false, position, index)
    setTimeout(() => {
      handleButtonLoading(true)
    }, 1000)
  }
}
setButtonControl({
  leftButtons: [
    { label: 'Left Button 1', onClick: () => handleClick('left', 0) },
    { label: 'Left Button 2', variant: 'link', icon: 'i-mdi-world', onClick: () => handleClick('left', 1) }
  ],
  rightButtons: [
    { label: 'Right Button 1', color: 'error', variant: 'outline', onClick: () => handleClick('right', 0) },
    {
      label: 'Right Button 2',
      color: 'success',
      trailingIcon: 'i-mdi-chevron-right',
      onClick: () => handleClick('right', 1)
    }
  ]
})
</script>

<template>
  <div class="py-10 bg-shade-secondary text-center">
    Content wrapped by form layout
  </div>
</template>
