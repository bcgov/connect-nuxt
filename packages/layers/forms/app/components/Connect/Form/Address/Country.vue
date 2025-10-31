<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
import { isoCountriesListSortedByName as countries } from '#forms/app/utils/isoCountriesList'

defineProps<{
  parentId: string
  schemaPrefix: string
  disabled?: boolean
}>()

defineEmits<{
  change: []
}>()

const model = defineModel<string | undefined>({ required: true })

const options: SelectItem[] = [
  countries.find(c => c.alpha_2 === 'CA')!,
  countries.find(c => c.alpha_2 === 'US')!,
  { type: 'separator' },
  ...countries
]
</script>

<template>
  <UFormField
    :data-testid="`${parentId}-field-country`"
    :name="schemaPrefix + '.country'"
    class="grow"
  >
    <template #default="{ error }">
      <ConnectSelect
        :id="`${parentId}-input-country`"
        v-model="model"
        :label="$t('connect.label.country')"
        :items="options"
        value-key="alpha_2"
        label-key="name"
        class="w-full"
        :disabled
        @change="$emit('change')"
      />
      <div
        v-if="!$slots.help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
