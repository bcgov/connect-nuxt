<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

defineProps<{
  heading?: {
    label?: string
    labelClass?: string
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    icon?: string
    iconClass?: string
    ui?: string
  },
  uiBody?: string
  actions?: ButtonProps[]
}>()
</script>
<template>
  <UCard
    as="section"
    class="w-full"
    variant="outline"
    :ui="{
      header: heading?.ui ?? 'bg-shadeSecondary px-4 py-4 sm:px-4 rounded-t-md',
      body: uiBody ?? 'p-0 sm:p-0',
      footer: 'p-0 sm:p-0'
    }"
  >
    <template v-if="heading?.label || $slots.header" #header>
      <slot name="header">
        <div class="flex items-center justify-between gap-2.5">
          <component :is="heading?.level || 'h2'">
            <div class="flex items-center gap-2.5">
              <UIcon
                v-if="heading?.icon"
                :name="heading.icon"
                :class="heading?.iconClass || 'size-6 shrink-0 text-primary'"
              />
              <span :class="heading?.labelClass || 'font-semibold text-neutralDark text-base'">{{ heading?.label }}</span>
            </div>
          </component>

          <div class="flex items-center gap-2.5">
            <UButton
              v-for="(action, i) in actions"
              :key="i"
              v-bind="action"
            />
          </div>
        </div>
      </slot>
    </template>
    <slot />
  </UCard>
</template>