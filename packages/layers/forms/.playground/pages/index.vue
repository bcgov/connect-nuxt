<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples' }
  ]
})

const localePath = useLocalePath()

const layoutExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Form Layout',
    to: localePath('/examples/layouts/ConnectForm')
  }
]

const componentExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Button Control (default)',
    to: localePath('/examples/components/ConnectButtonControl/Default')
  },
  {
    label: 'Connect Button Control (partial stacked buttons)',
    to: localePath('/examples/components/ConnectButtonControl/PartialStacked')
  },
  {
    label: 'Connect Button Control (full stacked buttons)',
    to: localePath('/examples/components/ConnectButtonControl/FullStacked')
  }
]
</script>

<template>
  <div class="my-10 space-y-5">
    <h1>Connect Form Layer Examples</h1>
    <div class="flex gap-3 max-w-[300px]">
      <UDropdownMenu
        :items="layoutExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Layout Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
      <UDropdownMenu
        :items="componentExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Component Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
