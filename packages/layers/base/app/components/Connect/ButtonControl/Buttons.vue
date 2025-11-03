<script setup lang="ts">
const props = defineProps<{ buttons: ConnectButton[], position: 'left' | 'right' }>()

console.log(props)
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
  >
    <UButton
      class="max-w-fit px-7 py-3 mb-1"
      v-bind="removeButtonAttrs(button)"
    />
    <p :class="['text-center', !button.removeAlertSpacing ? 'h-[1.25rem]' : '']">
      <span v-if="button.alertText" class="text-error">{{ button.alertText }}</span>
    </p>
  </div>
</template>
