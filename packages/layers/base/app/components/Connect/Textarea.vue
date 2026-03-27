<script setup lang="ts">
import type { TextareaProps } from '@nuxt/ui'

const model = defineModel<Exclude<TextareaProps['modelValue'], null>>({ required: true })

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
