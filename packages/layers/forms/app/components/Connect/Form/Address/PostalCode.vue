<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
  disabled?: boolean
  country?: string
}>()

const model = defineModel({
  set(value) {
    return value.toUpperCase()
  },
  type: String,
  default: ''
})
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :name="schemaPrefix + '.postalCode'"
    :data-testid="`${parentId}-field-postalCode`"
    :input-id="`${parentId}-input-postalCode`"
    :disabled
    required
    :label="country === 'US'
      ? $t('connect.label.zipCode')
      : $t('connect.label.postalCode')
    "
    :mask="country === 'CA'
      ? 'V#@ #@#'
      : country === 'US'
        ? '#####-####'
        : undefined"
  />
</template>
