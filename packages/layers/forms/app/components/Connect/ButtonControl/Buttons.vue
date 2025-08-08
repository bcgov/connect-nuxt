<script setup lang="ts">
defineProps<{ buttons: ConnectButton[], position: 'left' | 'right' }>()
</script>

<template>
  <div
    v-for="(button, i) in buttons"
    :key="`${position}-button-` + i"
    data-testid="button-wrapper"
  >
    <UButton
      class="max-w-fit px-7 py-3 mb-1"
      v-bind="button"
    />
    <p :class="['text-center', !button.removeAlertSpacing ? 'h-[1.25rem]' : '']">
      <span v-if="button.alertText" class="text-error">{{ button.alertText }}</span>
    </p>
  </div>
</template>
