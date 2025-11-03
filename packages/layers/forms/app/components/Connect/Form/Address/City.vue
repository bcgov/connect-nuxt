<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
  required?: boolean
}>()

const model = defineModel<string | undefined>({ required: true })
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :data-testid="`${parentId}-field-city`"
    :input-id="`${parentId}-input-city`"
    :name="schemaPrefix + '.city'"
    :required
    :label="$t('connect.label.city')"
  />
</template>
