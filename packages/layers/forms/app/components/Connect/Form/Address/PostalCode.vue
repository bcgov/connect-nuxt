<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
  disabled?: boolean
  country?: string
  required?: boolean
}>()

const model = defineModel<string | undefined>({
  set(value) {
    if (value) {
      return value.toUpperCase()
    }
  },
  required: true
})
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :name="schemaPrefix + '.postalCode'"
    :data-testid="`${parentId}-field-postalCode`"
    :input-id="`${parentId}-input-postalCode`"
    :disabled
    :required
    :label="country === 'US'
      ? $t('connect.label.zipCode')
      : $t('connect.label.postalCode')
    "
    :mask="country === 'CA'
      ? '@#@ #@#'
      : country === 'US'
        ? '#####-####'
        : undefined"
  />
</template>
