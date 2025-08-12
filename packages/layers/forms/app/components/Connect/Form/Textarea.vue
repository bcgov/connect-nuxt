<script setup lang="ts">
defineProps<{
  name: string
  label: string
  help?: string
  inputId: string
  required?: boolean
  autofocus?: boolean
  disabled?: boolean
}>()

const model = defineModel<string>({ required: true })
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
        :data-testid="inputId"
        v-model="model"
        :required
        :invalid="!!error"
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
