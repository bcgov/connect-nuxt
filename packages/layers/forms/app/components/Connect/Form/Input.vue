<script setup lang="ts">
defineProps<{
  name: string
  label: string
  inputId: string
  required?: boolean
  mask?: string
  help?: string
}>()

const model = defineModel<string | number | bigint | null | undefined>({ required: true })
</script>

<template>
  <UFormField
    :name
    :help
    class="grow flex-1"
  >
    <template #default="{ error }">
      <ConnectInput
        :id="inputId"
        v-model="model"
        :mask
        :label
        :aria-required="required"
      />
      <div
        v-if="!help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
