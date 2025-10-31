<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
}>()

defineEmits<{
  change: []
}>()

const labelId = props.id + '-label'
</script>

<template>
  <ConnectFloatingLabel
    :id="labelId"
    :label
    variant="select"
  >
    <USelect
      :id
      :data-testid="id"
      :aria-labelledby="labelId"
      v-bind="$attrs"
      @change="$emit('change')"
    />
  </ConnectFloatingLabel>
</template>
