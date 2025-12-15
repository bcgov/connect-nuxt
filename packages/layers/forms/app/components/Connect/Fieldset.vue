<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

const {
  orientation = 'vertical',
  bodyVariant = 'none'
} = defineProps<{
  label?: string
  description?: string
  error?: FormError
  showErrorMsg?: boolean
  orientation?: 'vertical' | 'horizontal'
  bodyVariant?: FieldsetBodyVariant
}>()
// TODO: figure out why text-error doesnt work on the legend text

const id = useId()
const legendId = id + '-legend'
const descriptionId = id + '-description'

const bodyClassMap: Record<FieldsetBodyVariant, string> = {
  none: '',
  card: 'p-4 sm:p-6 bg-white rounded shadow-xs'
}

const bodyClass = bodyClassMap[bodyVariant]
</script>

<template>
  <fieldset :aria-labelledby="legendId" :aria-describedby="descriptionId">
    <div
      class="flex"
      :class="[orientation === 'horizontal' ? 'flex-col gap-6 sm:flex-row sm:gap-4' : 'flex-col gap-6']"
    >
      <div
        class="flex flex-col gap-1"
        :class="{ 'w-full sm:basis-1/4 pb-0': orientation === 'horizontal' }"
      >
        <legend
          :id="legendId"
          class="text-base text-neutral-highlighted font-bold"
          :class="[{ 'text-red-600': !!error }]"
        >
          <slot name="label">
            <div class="flex flex-wrap gap-4">
              <span>{{ label }}</span>
              <span
                v-if="!!error && showErrorMsg"
                class="font-normal"
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
