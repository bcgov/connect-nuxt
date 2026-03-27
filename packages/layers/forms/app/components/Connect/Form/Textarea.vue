<script setup lang="ts">
import type { TextareaProps } from '@nuxt/ui'

defineProps<{
  name: string
  label: string
  inputId: string
  required?: boolean
  autofocus?: boolean
  disabled?: boolean
  help?: string
}>()

const model = defineModel<Exclude<TextareaProps['modelValue'], null>>({ required: true })
</script>

<template>
  <UFormField
    :name
    :help
    class="grow flex-1"
  >
    <template #default="{ error }">
      <ConnectTextarea
        :id="inputId"
        v-model="model"
        :data-testid="inputId"
        :required
        :label
        :autofocus
        :disabled
      />
      <div
        v-if="!help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
