<script setup lang="ts">
const props = defineProps<{
  id: string
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

const inputId = props.id + '-postalCode'
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :name="schemaPrefix + '.postalCode'"
    :input-id="inputId"
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
