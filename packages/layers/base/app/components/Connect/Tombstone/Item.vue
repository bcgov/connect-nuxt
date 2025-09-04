<script setup lang="ts">
import type { ConnectTombstoneItem } from '#imports'

defineProps<ConnectTombstoneItem>()
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
