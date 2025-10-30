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
    label: 'ConnectFormAddress',
    to: localePath('/examples/components/ConnectFormAddress')
  },
  {
    label: 'ConnectFieldset',
    to: localePath('/examples/components/ConnectFieldset')
  },
  {
    label: 'ConnectFormFieldWrapper',
    to: localePath('/examples/components/ConnectFormFieldWrapper')
  }
]

const formExamples: DropdownMenuItem[] = [
  {
    label: 'ConnectFormAddress',
    to: localePath('/examples/forms/ConnectFormAddress')
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
      <UDropdownMenu
        :items="formExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Form Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
