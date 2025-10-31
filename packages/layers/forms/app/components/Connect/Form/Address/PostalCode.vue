<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
  disabled?: boolean
  country?: string
  variant?: AddressFormVariant
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
    :required="variant === 'delivery'"
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
