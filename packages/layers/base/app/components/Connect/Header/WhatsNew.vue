<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { ConnectSlideoverWhatsNew } from '#components'

const state = useStorage<ConnectWhatsNewState>('connect-whats-new', { viewed: false, items: [] })
const overlay = useOverlay()
const slideover = overlay.create(ConnectSlideoverWhatsNew)

function open() {
  slideover.open({
    items: state.value.items
  })
  state.value.viewed = true
}
</script>

<template>
  <UChip
    :show="!state.viewed && state.items.length > 0"
    color="error"
    position="top-left"
    inset
    :ui="{
      base: 'ring-(--ui-error)',
    }"
  >
    <UButton
      variant="ghost"
      color="secondary"
      class="px-2 py-1 text-sm"
      :label="$t('connect.label.whatsNew')"
      :aria-label="$t('connect.label.whatsNewAria', { count: state.viewed ? 0 : state.items.length })"
      @click="open"
    />
  </UChip>
</template>
