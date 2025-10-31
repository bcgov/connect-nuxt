<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
}>()

const model = defineModel<string | undefined>({ required: true })
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :name="schemaPrefix + '.streetAdditional'"
    :data-testid="`${parentId}-field-streetAdditional`"
    :input-id="`${parentId}-input-streetAdditional`"
    :label="$t('connect.label.streetAdditional')"
  />
</template>
