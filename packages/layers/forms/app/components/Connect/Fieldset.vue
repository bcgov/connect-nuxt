<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

const {
  orientation = 'horizontal',
  bodyVariant = 'none',
  paddingClass = 'x-default',
  error
} = defineProps<{
  label?: string
  description?: string
  error?: FormError | boolean
  showErrorMsg?: boolean
  orientation?: 'vertical' | 'horizontal'
  bodyVariant?: FieldsetBodyVariant
  paddingClass?: 'x-default' | 'xy-default' | string
}>()

const id = useId()
const legendId = id + '-legend'
const descriptionId = id + '-description'

const bodyClassMap = computed<Record<FieldsetBodyVariant, string>>(() => {
  const cardError = error ? 'shadow-section-error' : ''
  return {
    none: '',
    card: 'bg-white rounded shadow-xs overflow-hidden ' + cardError
  }
})

const bodyClass = computed(() => bodyClassMap.value[bodyVariant])

const padding = paddingClass === 'x-default'
  ? 'padding-x-default'
  : paddingClass === 'xy-default'
    ? 'padding-xy-default'
    : paddingClass
</script>

<template>
  <fieldset :aria-labelledby="legendId" :aria-describedby="descriptionId">
    <div
      :class="[
        'flex gap-4 sm:gap-6',
        bodyVariant === 'none' ? padding : '',
        orientation === 'horizontal' ? 'flex-col sm:flex-row' : 'flex-col',
        (error && bodyVariant === 'none') ? 'shadow-section-error' : '',
      ]"
    >
      <div
        class="flex flex-col gap-1"
        :class="{ 'w-full sm:basis-1/4 pb-0': orientation === 'horizontal' }"
      >
        <legend
          :id="legendId"
          class="text-base text-neutral-highlighted font-bold"
        >
          <slot name="label">
            <div class="flex flex-col gap-1">
              <span>{{ label }}</span>
              <span
                v-if="error && typeof error === 'object' && 'message' in error && showErrorMsg"
                class="font-normal text-error"
              >
                {{ error.message }}
              </span>
            </div>
          </slot>
        </legend>
        <div v-if="description || $slots.description" id="descriptionId">
          <slot name="description">
            <p>
              {{ description }}
            </p>
          </slot>
        </div>
      </div>

      <div
        class="flex-1"
        :class="bodyClass"
      >
        <slot />
      </div>
    </div>
  </fieldset>
</template>
