<script setup lang="ts">
import { isoCountriesListSortedByName as countries } from '#forms/app/utils/isoCountriesList'
import type { Iso3166_1Country } from '#forms/app/utils/isoCountriesList'

defineProps<{
  parentId: string
  schemaPrefix: string
  disabled?: boolean
  required?: boolean
}>()

defineEmits<{
  change: []
}>()

const model = defineModel<string | undefined>({ required: true })

/**
 * Matches when `search` appears in `text` starting at a word boundary (the
 * start of `text`, or right after a non-letter/non-number character).
 * E.g. matchesWordStart('Pending Review', 're') === true (via 'Review')
 *      matchesWordStart('Expired', 're') === false ('re' is mid-word, not a word start)
 *      matchesWordStart('United States', 'united s') === true (matches from the start)
 */
function matchesWordStart(text: string, search: string): boolean {
  const needle = search.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!needle) {
    return true
  }
  const haystack = text.toLowerCase()
  for (let index = haystack.indexOf(needle); index !== -1; index = haystack.indexOf(needle, index + 1)) {
    if (index === 0 || /[^\p{L}\p{N}]/u.test(haystack.charAt(index - 1))) {
      return true
    }
  }
  return false
}

// UInputMenu only allows value-key/label-key to be a key that every item type
// has in common. `{ type: 'separator' }` alone shares no keys with
// Iso3166_1Country, which would make value-key="alpha_2" a type error. Giving
// it Iso3166_1Country's keys as optional fixes the type without changing
// anything at runtime - the separator object itself stays `{ type: 'separator' }`.
type CountryOption = Iso3166_1Country | (Partial<Iso3166_1Country> & { type: 'separator' })

const options: Array<CountryOption> = [
  countries.find(c => c.alpha_2 === 'CA')!,
  countries.find(c => c.alpha_2 === 'US')!,
  { type: 'separator' },
  ...countries.filter(c => c.alpha_2 !== 'CA' && c.alpha_2 !== 'US')
]

const searchTerm = ref('')

const filteredItems = computed(() => {
  if (!searchTerm.value.trim()) {
    return options
  }
  return options.filter((item) => {
    if ('type' in item) {
      return false
    }
    return matchesWordStart(item.name, searchTerm.value)
  })
})
</script>

<template>
  <UFormField
    :data-testid="`${parentId}-field-country`"
    :name="schemaPrefix + '.country'"
    class="grow"
  >
    <template #default="{ error }">
      <ConnectFloatingLabel
        :id="`${parentId}-input-country-label`"
        :label="$t('connect.label.country')"
        variant="input"
      >
        <UInputMenu
          :id="`${parentId}-input-country`"
          v-model="model"
          v-model:search-term="searchTerm"
          :data-testid="`${parentId}-input-country`"
          :aria-labelledby="`${parentId}-input-country-label`"
          ignore-filter
          openOnFocus
          :items="filteredItems"
          value-key="alpha_2"
          label-key="name"
          placeholder="&nbsp;"
          class="w-full"
          :disabled
          :required
          @change="$emit('change')"
        />
      </ConnectFloatingLabel>
      <div
        v-if="!$slots.help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
