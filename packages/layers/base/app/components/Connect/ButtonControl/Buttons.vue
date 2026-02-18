<script setup lang="ts">
defineProps<{ buttons: ConnectButton[], position: 'left' | 'right' }>()

// remove alertText and removeAlertSpacing from being added to button html attrs
const removeButtonAttrs = (button: ConnectButton) => {
  const newButton = { ...button }
  delete newButton['alertText']
  delete newButton['removeAlertSpacing']
  return newButton
}
</script>

<template>
  <div
    v-for="(button, i) in buttons"
    :key="`${position}-button-${i}`"
    data-testid="button-wrapper"
    class="flex flex-col grow"
  >
    <UButton
      class="grow px-7 py-3 mb-1 justify-center"
      v-bind="removeButtonAttrs(button)"
    />
    <p :class="['text-center', !button.removeAlertSpacing ? 'h-[1.25rem]' : '']">
      <span v-if="button.alertText" class="text-error">{{ button.alertText }}</span>
    </p>
  </div>
</template>
