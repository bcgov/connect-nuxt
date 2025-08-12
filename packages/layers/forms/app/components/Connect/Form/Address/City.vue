<script setup lang="ts">
const props = defineProps<{
  id: string
  schemaPrefix: string
  disabled?: boolean
}>()

const model = defineModel<string>({ default: '' })

const inputId = props.id + '-city'
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :name="schemaPrefix + '.city'"
    :input-id="inputId"
    required
    :label="$t('connect.label.city')"
    :disabled
  />
</template>
