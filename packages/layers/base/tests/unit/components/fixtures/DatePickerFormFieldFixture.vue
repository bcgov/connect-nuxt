<script setup lang="ts">
import DatePicker from '../../../../app/components/Connect/Input/DatePicker.vue'

defineProps<{
  help?: string
  error?: boolean | string
}>()

const value = ref('')
</script>

<template>
  <UFormField
    name="dateInput"
    :help="help"
    :error="error"
  >
    <DatePicker v-model="value" label="Test Date" />
  </UFormField>
</template>
