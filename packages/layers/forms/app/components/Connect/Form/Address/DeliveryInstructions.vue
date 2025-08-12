<script setup lang="ts">
const props = defineProps<{
  id: string
  schemaPrefix: string
  disabled?: boolean
}>()

const model = defineModel<string>({ default: '' })

const inputId = props.id + '-locationDescription'
</script>

<template>
  <ConnectFormTextarea
    v-model="model"
    :input-id="inputId"
    :name="schemaPrefix + '.locationDescription'"
    :disabled
    :label="$t('connect.label.deliveryInstructionsOpt')"
  />
</template>
