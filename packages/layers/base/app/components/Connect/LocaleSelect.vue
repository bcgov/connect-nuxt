<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, setLocale } = useI18n()

const items = computed((): DropdownMenuItem[] => {
  const options = locales.value.map((loc: LocaleObject) => {
    const isCurrentLocal = loc.code === locale.value
    return {
      label: loc.name || 'N/A',
      icon: isCurrentLocal ? 'i-mdi-check' : '',
      onSelect: () => setLocale(loc.code),
      class: isCurrentLocal ? 'bg-gray-100' : 'pl-8',
      color: isCurrentLocal ? 'primary' : 'neutral'
    }
  })
  return [options]
})
</script>

<template>
  <UDropdownMenu
    v-if="items[0] && items[0].length > 1"
    :items
    color="secondary"
  >
    <UButton
      data-testid="locale-select-dropdown"
      icon="i-mdi-web"
      :aria-label="$t('ConnectLocaleSelect.label')"
      size="lg"
      variant="ghost"
      color="secondary"
    />
  </UDropdownMenu>
</template>
