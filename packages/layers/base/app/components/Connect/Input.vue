<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'
import type { UInput } from '#components'

const props = defineProps<{
  id: string
  label: string
  mask?: string
  disabled?: boolean
  autoFocus?: boolean
}>()

const model = defineModel<InputProps['modelValue']>({ required: true })
const inputRef = useTemplateRef('input-ref')

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

defineExpose({ input: inputRef })

// vue ignore reason - type mismatch between model and defaultValue prop caused by strict generics
</script>

<template>
  <!-- @vue-ignore -->
  <UInput
    ref="input-ref"
    v-bind="{
      id,
      disabled,
      autoFocus,
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
