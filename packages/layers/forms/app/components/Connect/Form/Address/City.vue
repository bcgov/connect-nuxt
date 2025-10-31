<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
  variant?: AddressFormVariant
}>()

const model = defineModel<string | undefined>({ required: true })
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :data-testid="`${parentId}-field-city`"
    :input-id="`${parentId}-input-city`"
    :name="schemaPrefix + '.city'"
    :required="variant === 'delivery'"
    :label="$t('connect.label.city')"
  />
</template>
