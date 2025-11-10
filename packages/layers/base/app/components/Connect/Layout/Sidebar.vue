<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{ items: NavigationMenuItem[] }>()

const showSideMenu = ref(true)
</script>

<template>
  <div class="flex gap-4 my-10 relative">
    <UButton
      class="absolute z-1 -top-8"
      color="neutral"
      size="xs"
      :icon="showSideMenu ? 'i-mdi-minus' : 'i-mdi-plus'"
      @click="showSideMenu = !showSideMenu"
    />
    <ConnectTransitionCollapse>
      <div v-if="showSideMenu">
        <UNavigationMenu
          collapsible
          :items
          orientation="vertical"
          class="text-neutral-highlighted"
          variant="pill"
          :ui="{
            label: 'text-base',
            link: 'cursor-pointer',
            linkLabel: 'text-neutral-highlighted',
            root: 'bg-white rounded p-3',
          }"
        />
      </div>
    </ConnectTransitionCollapse>
    <slot />
  </div>
</template>
