<script setup lang="ts">
const {
  id,
  schemaPrefix,
  helpText = 'none',
  country,
  disableAddressComplete
} = defineProps<{
  id: string
  country?: string
  schemaPrefix: string
  disableAddressComplete?: boolean
  helpText?: 'allow-po' | 'no-po' | 'none'
}>()

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  addressComplete: [value: ConnectAddress]
}>()

const inputId = id + '-street'

const { address: canadaPostAddress, enableAddressComplete } = useCanadaPost()

const addressComplete = (id: string) => {
  if (!disableAddressComplete && country && country.trim() !== '') {
    enableAddressComplete(id, country, false)
  }
}

watch(canadaPostAddress, (newAddress) => {
  emit('addressComplete', newAddress)
})
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :input-id="inputId"
    :name="schemaPrefix + '.street'"
    :help="helpText === 'none'
      ? undefined
      : helpText === 'no-po'
        ? $t('connect.text.addressCannotBePOBox')
        : $t('connect.text.addressCanBePOBox')
    "
    :label="$t('connect.label.street')"
    required
    @keypress.once="addressComplete(inputId)"
    @click="addressComplete(inputId)"
  />
</template>
