<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'

const props = defineProps<{
  id: string
  label: string
  mask?: string
}>()

const model = defineModel<string | number | bigint | null | undefined>({ required: true })

const uInputProps = inject<InputProps>(
  `UInput-props${props.id ? `-${props.id}` : ''}`,
  {} as InputProps
)

const uInputSlots = inject<{ [key: string]: VNode }>(
  `UInput-slots${props.id ? `-${props.id}` : ''}`,
  {}
)
</script>

<template>
  <UInput
    :id
    v-model.trim="model"
    v-maska="mask"
    v-bind="uInputProps"
    class="w-full grow"
    placeholder="&nbsp;"
  >
    <label
      :for="id"
      class="floating-label-input"
    >
      {{ label }}
    </label>

    <!-- Render injected slots -->
    <template
      v-for="(comp, name) in uInputSlots"
      #[name]
      :key="name"
    >
      <component
        :is="comp"
      />
    </template>
  </UInput>
</template>
