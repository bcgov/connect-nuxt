<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps<{
  id: string
  label: string
  invalid?: boolean
}>()
</script>

<template>
  <UTextarea
    :id
    v-model.trim="model"
    :data-testid="id"
    placeholder="&nbsp;"
    class="w-full grow"
    :ui="{
      base: invalid ? 'ring-0 shadow-inputError focus:shadow-inputError resize-none' : 'resize-none',
    }"
  >
    <label
      class="floating-label-textarea bg-shadePrimary w-[96%] flex-1 pt-1 -mt-1"
      :class="invalid ? 'text-error' : ''"
      :for="id"
    >
      {{ label }}
    </label>
  </UTextarea>
</template>
