<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps<{
  id: string
  label: string
}>()
</script>

<template>
  <UTextarea
    :id
    v-model.trim="model"
    :data-testid="id"
    placeholder="&nbsp;"
    class="w-full grow"
  >
    <label
      class="floating-label-textarea bg-shade w-[96%] flex-1 pt-1 -mt-1"
      :for="id"
    >
      {{ label }}
    </label>
  </UTextarea>
</template>
