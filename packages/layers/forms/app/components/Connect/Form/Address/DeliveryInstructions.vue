<script setup lang="ts">
defineProps<{
  parentId: string
  schemaPrefix: string
  disabled?: boolean
}>()

const model = defineModel<string | undefined>({ required: true, default: '' })
</script>

<template>
  <ConnectFormTextarea
    v-model="model"
    :data-testid="`${parentId}-field-locationDescription`"
    :input-id="`${parentId}-input-locationDescription`"
    :name="schemaPrefix + '.locationDescription'"
    :disabled
    :label="$t('connect.label.deliveryInstructionsOpt')"
  />
</template>
