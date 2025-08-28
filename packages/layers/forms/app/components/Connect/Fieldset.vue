<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

const {
  orientation = 'vertical'
} = defineProps<{
  label: string
  error?: FormError
  showErrorMsg?: boolean
  orientation?: 'vertical' | 'horizontal'
}>()
// TODO: figure out why text-error doesnt work on the legend text

const legendId = useId()
</script>

<template>
  <fieldset :aria-labelledby="legendId">
    <div
      class="flex"
      :class="[orientation === 'horizontal' ? 'flex-col gap-6 sm:flex-row sm:gap-4' : 'flex-col gap-6']"
    >
      <legend
        :id="legendId"
        class="text-base text-neutral-highlighted font-bold"
        :class="[
          { 'text-red-600': !!error },
          { 'w-full sm:w-1/4 pb-0': orientation === 'horizontal' },
        ]"
      >
        <div class="flex flex-wrap gap-4">
          <span>{{ label }}</span>
          <span
            v-if="!!error && showErrorMsg"
            class="font-normal"
          >
            {{ error.message }}
          </span>
        </div>
      </legend>

      <div class="flex-1">
        <slot />
      </div>
    </div>
  </fieldset>
</template>
