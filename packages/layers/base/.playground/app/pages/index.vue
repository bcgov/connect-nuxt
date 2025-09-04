<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples' }
  ]
})

const localePath = useLocalePath()

const componentExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Tombstone',
    children: [
      {
        label: 'Basic',
        to: localePath('/examples/components/ConnectTombstone/basic')
      },
      {
        label: 'Full Options',
        to: localePath('/examples/components/ConnectTombstone/full-options')
      },
      {
        label: 'Multiple',
        to: localePath('/examples/components/ConnectTombstone/multiple')
      },
      {
        label: 'vNode',
        to: localePath('/examples/components/ConnectTombstone/vNode')
      },
      {
        label: 'Reset',
        to: localePath('/examples/components/ConnectTombstone/reset')
      },
      {
        label: 'Slots',
        to: localePath('/examples/components/ConnectTombstone/slots')
      }
    ]
  }
]
</script>

<template>
  <div class="my-10 space-y-5">
    <h1>Connect Base Layer Examples</h1>
    <div class="flex gap-3 max-w-[300px]">
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
