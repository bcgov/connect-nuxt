<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps<{
  id: string
  label: string
  mask?: string
}>()
</script>

<template>
  <UInput
    :id
    v-model.trim="model"
    v-maska="mask"
    :data-testid="id"
    placeholder="&nbsp;"
    class="w-full grow"
  >
    <label
      :for="id"
      class="floating-label-input"
    >
      {{ label }}
    </label>
  </UInput>
</template>
