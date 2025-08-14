<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <ConnectFormInput
    :data-testid="`${parentId}-field-city`"
    :input-id="`${parentId}-input-city`"
    v-model="model"
    :name="schemaPrefix + '.city'"
    required
    :label="$t('connect.label.city')"
  />
</template>
