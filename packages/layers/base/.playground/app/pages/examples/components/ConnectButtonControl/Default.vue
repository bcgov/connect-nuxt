<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Button Control Component (default)' }
  ]
})

const buttonControl = useConnectButtonControl()
const localePath = useLocalePath()

const handleClick = async (position: 'left' | 'right', index: number) => {
  if (position === 'right') {
    if (index === 0) {
      await buttonControl.setAlertText('Alert text right side', 'right')
    } else {
      await buttonControl.setAlertText('Alert text underneath', 'right', index)
    }
  } else if (index === 1) {
    await buttonControl.setAlertText('Alert text left side', 'left')
  } else {
    await delay(3000)
  }
}
buttonControl.setButtonControl({
  leftGroup: {
    class: 'max-w-[400px]',
    buttons: [
      { label: 'Left 1', variant: 'link', icon: 'i-mdi-world', onClick: () => handleClick('left', 0) },
      { label: 'Left 2', onClick: () => handleClick('left', 1) },
      {
        label: 'Left 3 Link',
        to: localePath('/examples/components/ConnectButtonControl/Default?query=' + Math.random().toString()),
        variant: 'soft'
      }
    ]
  },
  rightGroup: {
    class: 'max-w-[350px]',
    buttons: [
      { label: 'Right 1', color: 'error', variant: 'outline', onClick: () => handleClick('right', 0) },
      {
        label: 'Right 2',
        color: 'success',
        trailingIcon: 'i-mdi-chevron-right',
        onClick: () => handleClick('right', 1)
      }
    ]
  }
})
</script>

<template>
  <div>
    <ConnectPageSection :heading="{ label: 'Connect Button Control (default example)' }">
      <div class="p-10">
        <ConnectButtonControl class="bg-shade-new" />
      </div>
    </ConnectPageSection>
  </div>
</template>
