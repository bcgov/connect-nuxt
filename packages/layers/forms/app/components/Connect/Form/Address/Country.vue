<script setup lang="ts">
import { iscCountriesListSortedByName as countries } from '#forms/app/utils/isoCountriesList'

const props = defineProps<{
  id: string
  schemaPrefix: string
  disabled?: boolean
}>()

defineEmits<{
  change: []
}>()

const model = defineModel<string>({ default: '' })

const inputId = props.id + '-country'

const displayedCountryName = computed(() => {
  if (model.value) {
    const found = countries.find(c => c.alpha_2 === model.value)?.name
    return found ?? ''
  }
  return ''
})

const options = [
  countries.find(c => c.alpha_2 === 'CA')!,
  countries.find(c => c.alpha_2 === 'US')!,
  ...countries
]
</script>

<template>
  <UFormField
    :name="schemaPrefix + '.country'"
    class="grow"
  >
    <template #default="{ error }">
      <USelect
        v-model="model"
        :data-testid="inputId"
        :id="inputId"
        :items="options"
        value-key="alpha_2"
        label-key="name"
        class="w-full"
        :class="error ? 'shadow-input-error ring-0' : ''"
        :disabled
        :aria-label="$t('connect.label.country')"
        :aria-required="true"
        :ui="{
          base: error
            ? 'shadow-input-error focus:shadow-input-error data-[state=open]:shadow-input-error'
            : '',
          item: 'nth-2:border-b nth-2:border-gray-200',
          itemTrailingIcon: 'hidden',
        }"
        @change="$emit('change')"
      >
        <template #default="{ modelValue }">
          <div class="relative px-2.5 pb-2 pt-6 w-full">
            <span
              aria-hidden="true"
              :class="[
                !modelValue
                  ? 'top-1/2 -translate-y-1/2'
                  : 'top-1 -translate-y-none text-xs',
                error
                  ? 'text-red-600'
                  : '',
                'absolute left-0 px-2.5 text-sm transition-all',
                'group-data-[state=open]:text-primary group-focus:text-primary',
              ]"
            >
              {{ $t('connect.label.country') }}
            </span>
            <div class="h-6">
              <span
                v-if="modelValue"
                class="line-clamp-1 text-left"
              >
                {{ displayedCountryName }}
              </span>
            </div>
          </div>
        </template>
      </USelect>
      <div
        v-if="!$slots.help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
