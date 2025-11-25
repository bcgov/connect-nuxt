<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'

const props = defineProps<{
  id: string
  label: string
  mask?: string
  disabled?: boolean
  autoFocus?: boolean
}>()

const model = defineModel<string | number | bigint | null | undefined>({ required: true })

// Inject props
const injectedProps = inject<InputProps>(
  `UInput-props${props.id ? `-${props.id}` : ''}`,
  {} as InputProps
)

// Inject slots
const injectedSlots = inject<{ [key: string]: VNode }>(
  `UInput-slots${props.id ? `-${props.id}` : ''}`,
  {}
)
</script>

<template>
  <UInput
    v-bind="{
      ...props,
      ...injectedProps, // injected props will default when provided
    }"
    v-model.trim="model"
    v-maska="mask"
    class="w-full grow"
    :data-testid="id"
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
      v-for="(comp, name) in injectedSlots"
      #[name]
      :key="name"
    >
      <component
        :is="comp"
      />
    </template>
  </UInput>
</template>
