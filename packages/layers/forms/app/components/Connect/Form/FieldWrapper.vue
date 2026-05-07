<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

const {
  orientation = 'horizontal',
  paddingClass = 'x-default',
  detailsAriaHidden = false
} = defineProps<{
  label: string
  error?: FormError | boolean
  detailsAriaHidden?: boolean
  showErrorMsg?: boolean
  orientation?: 'vertical' | 'horizontal'
  paddingClass?: 'x-default' | 'xy-default' | string
}>()

const padding = paddingClass === 'x-default'
  ? 'padding-x-default'
  : paddingClass === 'xy-default'
    ? 'padding-xy-default'
    : paddingClass
</script>

<template>
  <div
    :class="[
      'flex gap-4 sm:gap-6',
      padding,
      orientation === 'horizontal' ? 'flex-col sm:flex-row' : 'flex-col',
      error ? 'shadow-section-error' : '',
    ]"
  >
    <span
      :aria-hidden="detailsAriaHidden"
      class="text-base text-neutral-highlighted font-bold"
      :class="{ 'w-full sm:basis-1/4': orientation === 'horizontal' }"
    >
      <div class="flex flex-col gap-1">
        <span>{{ label }}</span>
        <span
          v-if="error && typeof error === 'object' && 'message' in error && showErrorMsg"
          class="font-normal text-error"
        >
          {{ error.message }}
        </span>
      </div>
    </span>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
