<script setup lang="ts">
const {
  maxlength = '1000',
  country,
  disabled = true
} = defineProps<{
  parentId: string
  country?: string
  schemaPrefix: string
  disabled?: boolean
  maxlength?: string
}>()

const model = defineModel<string | undefined>({ required: true, default: '' })

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
</script>

<template>
  <UFormField
    :name="schemaPrefix + '.region'"
    class="grow flex-1"
    :data-testid="`${parentId}-field-region`"
  >
    <template #default="{ error }">
      <ConnectSelect
        v-if="country === 'US' || country === 'CA'"
        :id="`${parentId}-input-region`"
        v-model="model"
        :label="country === 'CA' ? $t('connect.label.province') : $t('connect.label.state')"
        :items="regions"
        value-key="code"
        label-key="name"
        formnovalidate
        :required="country === 'US' || country === 'CA'"
        :disabled
        class="w-full grow"
      />
      <ConnectInput
        v-else
        :id="`${parentId}-input-region`"
        v-model="model"
        :data-testid="`${parentId}-input-region`"
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
