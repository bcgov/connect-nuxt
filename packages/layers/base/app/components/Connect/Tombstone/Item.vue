<script setup lang="ts">
import type { IconProps, BadgeProps, LinkProps } from '@nuxt/ui'
import type { VNode } from 'vue'

interface ConnectTombstoneLink extends LinkProps {
  label?: string
}

// cant use imported interface here as it causes vue comiler to break when extended
// must also update connect-tombstone interface if changing these props
defineProps<{
  text?: string
  itemClass?: string
  icon?: IconProps
  badge?: BadgeProps
  link?: ConnectTombstoneLink
  vNode?: VNode
}>()
</script>

<template>
  <div class="flex space-x-1">
    <UIcon
      v-if="icon"
      v-bind="icon"
      :class="itemClass || 'mt-1 text-primary'"
    />
    <UBadge
      v-if="badge"
      v-bind="badge"
      :class="itemClass || 'px-3'"
    />
    <ULink
      v-else-if="link"
      v-bind="link"
      :class="itemClass || 'mt-[2px] text-sm text-primary underline'"
    >
      {{ link.label }}
    </ULink>
    <component
      :is="vNode"
      v-else-if="vNode"
    />
    <p
      v-else-if="text"
      :class="itemClass || 'mt-[2px] text-sm'"
    >
      {{ text }}
    </p>
  </div>
</template>
