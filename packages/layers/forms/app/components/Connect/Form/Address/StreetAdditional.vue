<script setup lang="ts">
const props = defineProps<{
  id: string
  schemaPrefix: string
}>()

const model = defineModel<string>({ default: '' })

const inputId = props.id + '-streetAdditional'
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :name="schemaPrefix + '.streetAdditional'"
    :input-id="inputId"
    :label="$t('connect.label.streetAdditional')"
  />
</template>
