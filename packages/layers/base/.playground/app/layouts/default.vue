<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()

const items: NavigationMenuItem[] = [
  [
    {
      label: 'Components',
      type: 'label'
    },
    {
      label: 'Connect Button Control',
      children: [
        {
          label: 'Default',
          to: localePath('/examples/components/ConnectButtonControl/Default')
        },
        {
          label: 'Options',
          to: localePath('/examples/components/ConnectButtonControl/Options')
        },
        {
          label: 'Stacked Buttons',
          to: localePath('/examples/components/ConnectButtonControl/Stacked')
        }
      ]
    },
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
        },
        {
          label: 'Initial State',
          to: localePath('/examples/components/ConnectTombstone/initial-state')
        }
      ]
    },
    {
      label: 'Connect Address Display',
      to: localePath('/examples/components/ConnectAddressDisplay')
    },
    {
      label: 'Connect Breadcrumb',
      to: localePath('/examples/components/ConnectBreadcrumb')
    },
    {
      label: 'Connect Contact Display',
      to: localePath('/examples/components/ConnectContactDisplay')
    },
    {
      label: 'Connect Header',
      to: localePath('/examples/components/ConnectHeader')
    },
    {
      label: 'Connect Footer',
      to: localePath('/examples/components/ConnectFooter')
    },
    {
      label: 'Connect I18n Helper',
      to: localePath('/examples/components/ConnectI18nHelper')
    },
    {
      label: 'Connect Input',
      to: localePath('/examples/components/ConnectInput')
    },
    {
      label: 'Connect Locale Select',
      to: localePath('/examples/components/ConnectLocaleSelect')
    },
    {
      label: 'Connect Modal',
      to: localePath('/examples/components/ConnectModal')
    },
    {
      label: 'Connect Page Section',
      to: localePath('/examples/components/ConnectPageSection')
    },
    {
      label: 'Connect Spinner',
      to: localePath('/examples/components/ConnectSpinner')
    },
    {
      label: 'Connect Textarea',
      to: localePath('/examples/components/ConnectTextarea')
    }
  ]
]
</script>

<template>
  <ConnectLayout>
    <div class="flex gap-4 my-10">
      <UNavigationMenu
        :items
        orientation="vertical"
        class="text-neutral-highlighted"
        variant="pill"
        :ui="{
          label: 'text-base',
          linkLabel: 'text-neutral-highlighted',
        }"
      />
      <div class="flex-1 w-full">
        <slot />
      </div>
    </div>
  </ConnectLayout>
</template>
