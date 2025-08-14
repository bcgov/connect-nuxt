<script setup lang="ts">
const {
  maxlength = '1000',
  country
} = defineProps<{
  parentId: string
  country?: string
  schemaPrefix: string
  disabled?: boolean
  maxlength?: string
}>()

const model = defineModel<string>({ default: '' })

const regions = computed(() => {
  switch (country) {
    case 'US':
      return countrySubdivisions.us
    case 'CA':
      return countrySubdivisions.ca
    default:
      return []
  }
})

const displayedRegionName = computed(() => {
  if (model.value) {
    const found = regions.value.find(r => r.code === model.value)?.name
    return found ?? ''
  }
  return ''
})
</script>

<template>
  <UFormField
    :name="schemaPrefix + '.region'"
    class="grow flex-1"
    :data-testid="`${parentId}-field-region`"
  >
    <template #default="{ error }">
      <USelect
        v-if="country === 'US' || country === 'CA'"
        v-model="model"
        :id="`${parentId}-input-region`"
        :data-testid="`${parentId}-input-region`"
        :items="regions"
        :aria-label="country === 'CA' ? $t('connect.label.province') : $t('connect.label.state')"
        value-key="code"
        label-key="name"
        :aria-required="country === 'US' || country === 'CA'"
        :disabled
        class="w-full grow ring-0"
        :ui="{
          base: error
            ? 'shadow-input-error focus:shadow-input-error data-[state=open]:shadow-input-error'
            : '',
          trailingIcon: error
            ? 'text-error group-data-[state=open]:text-error group-focus:text-error'
            : '',
        }"
      >
        <template #default="{ modelValue }">
          <div class="relative px-2.5 pb-2 pt-6 w-full">
            <span
              aria-hidden="true"
              class="absolute left-0 px-2.5 text-sm transition-all"
              :class="[
                !modelValue
                  ? 'top-1/2 -translate-y-1/2'
                  : 'top-1 -translate-y-none text-xs',
                error
                  ? 'text-error group-data-[state=open]:text-error group-focus:text-error'
                  : 'group-data-[state=open]:text-primary group-focus:text-primary',
                'absolute left-0 px-2.5 text-sm transition-all',
                '',
              ]"
            >
              {{ country === 'CA' ? $t('connect.label.province') : $t('connect.label.state') }}
            </span>
            <div class="h-6">
              <span
                v-if="modelValue"
                class="line-clamp-1 text-left"
              >
                {{ displayedRegionName }}
              </span>
            </div>
          </div>
        </template>
      </USelect>
      <ConnectInput
        v-else
        :id="`${parentId}-input-region`"
        :data-testid="`${parentId}-input-region`"
        v-model="model"
        :disabled
        :label="$t('connect.label.regionOpt')"
        :maxlength
      />
      <div
        v-if="!$slots.help && !error"
        class="h-4 mt-1"
      />
    </template>
  </UFormField>
</template>
