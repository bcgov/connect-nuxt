<script setup lang="ts">
defineProps<{
  name: string
  label: string
  inputId: string
  required?: boolean
  autofocus?: boolean
  mask?: string
  disabled?: boolean
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <UFormField
    :name
    class="grow flex-1"
  >
    <template #default="{ error }">
      <ConnectInput
        :id="inputId"
        v-model="model"
        :mask
        :aria-required="required"
        :label
        :autofocus
        :disabled
      />
      <div
        v-if="!$slots.help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
