<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */ // allow any for form ref type
import type { Form } from '@nuxt/ui'

const {
  disabledFields,
  excludedFields = ['streetName', 'streetNumber', 'unitNumber'],
  schemaPrefix,
  streetHelpText = 'none',
  formRef
} = defineProps<{
  id: string
  schemaPrefix: string
  formRef?: Form<any> | null
  disabledFields?: Array<keyof ConnectAddress>
  excludedFields?: Array<keyof ConnectAddress>
  disableAddressComplete?: boolean
  streetHelpText?: 'allow-po' | 'no-po' | 'none'
}>()

const state = defineModel<Partial<ConnectAddress>>({ required: true })

async function populateAddressComplete(e: ConnectAddress) {
  // get disabled/excluded fields
  const disabledSet = new Set(disabledFields)
  const excludedSet = new Set(excludedFields)

  // get array of valid keys
  const validKeys = (Object.keys(e) as Array<keyof ConnectAddress>).filter(key =>
    !disabledSet.has(key) && !excludedSet.has(key)
  )

  // set state for each valid key
  validKeys.forEach((key) => {
    state.value[key] = e[key]
  })

  // wait for dom to populate inputs
  await nextTick()

  // validate populated fields if formRef provided
  if (formRef) {
    const fields = validKeys.map(k => `${schemaPrefix}.${k}`)
    await formRef.validate({ name: fields, silent: true })
  }
}
</script>

<template>
  <div class="space-y-2" :data-testid="id + '-container'">
    <ConnectFormAddressCountry
      v-if="!excludedFields.includes('country')"
      :parent-id="id"
      v-model="state.country"
      :schema-prefix="schemaPrefix"
      :disabled="disabledFields?.includes('country')"
      @change="state.region = ''"
    />

    <ConnectFormAddressStreet
      v-if="!excludedFields.includes('street')"
      :parent-id="id"
      v-model="state.street"
      :schema-prefix="schemaPrefix"
      :country="state.country"
      :disable-address-complete="disableAddressComplete"
      :disabled="disabledFields?.includes('street')"
      :help-text="streetHelpText"
      @address-complete="populateAddressComplete"
    />

    <ConnectFormAddressStreetAdditional
      v-if="!excludedFields.includes('streetAdditional')"
      :parent-id="id"
      v-model="state.streetAdditional"
      :schema-prefix="schemaPrefix"
      :disabled="disabledFields?.includes('streetAdditional')"
    />

    <div class="flex flex-col gap-2 sm:gap-4 sm:flex-row">
      <ConnectFormAddressCity
        v-if="!excludedFields.includes('city')"
        :parent-id="id"
        v-model="state.city"
        :schema-prefix="schemaPrefix"
        :disabled="disabledFields?.includes('city')"
      />

      <ConnectFormAddressRegion
        v-if="!excludedFields.includes('region')"
        :parent-id="id"
        v-model="state.region"
        :schema-prefix="schemaPrefix"
        :country="state.country"
        :disabled="disabledFields?.includes('region')"
      />

      <ConnectFormAddressPostalCode
        v-if="!excludedFields.includes('postalCode')"
        :parent-id="id"
        v-model="state.postalCode"
        :schema-prefix="schemaPrefix"
        :country="state.country"
        :disabled="disabledFields?.includes('postalCode')"
      />
    </div>

    <ConnectFormAddressDeliveryInstructions
      v-if="!excludedFields.includes('locationDescription')"
      :parent-id="id"
      v-model="state.locationDescription"
      :schema-prefix="schemaPrefix"
      :disabled="disabledFields?.includes('locationDescription')"
    />
  </div>
</template>
