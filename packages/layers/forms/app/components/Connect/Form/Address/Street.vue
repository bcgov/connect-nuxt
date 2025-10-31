<script setup lang="ts">
const {
  schemaPrefix,
  helpText = 'none',
  country,
  disableAddressComplete,
  parentId
} = defineProps<{
  parentId: string
  country?: string
  schemaPrefix: string
  disableAddressComplete?: boolean
  helpText?: 'allow-po' | 'no-po' | 'none'
}>()

const model = defineModel<string | undefined>({ required: true, default: '' })

const emit = defineEmits<{
  addressComplete: [value: ConnectAddress]
}>()

const { address: canadaPostAddress, enableAddressComplete, destroyAddressComplete } = useCanadaPost()

const addressComplete = (id: string) => {
  if (!disableAddressComplete && country === 'CA') {
    enableAddressComplete(id, country, false)
  }
}

watch(canadaPostAddress, (newAddress) => {
  emit('addressComplete', newAddress)
})

watch(
  () => country,
  (v) => {
    if (v !== 'CA') {
      destroyAddressComplete()
    } else if (!disableAddressComplete) {
      enableAddressComplete(`${parentId}-input-street`, v, false)
    }
  }
)
</script>

<template>
  <ConnectFormInput
    v-model="model"
    :data-testid="`${parentId}-field-street`"
    :input-id="`${parentId}-input-street`"
    :name="schemaPrefix + '.street'"
    :help="helpText === 'none'
      ? undefined
      : helpText === 'no-po'
        ? $t('connect.text.addressCannotBePOBox')
        : $t('connect.text.addressCanBePOBox')
    "
    :label="$t('connect.label.street')"
    required
    @keypress.once="addressComplete(`${parentId}-input-street`)"
    @click="addressComplete(`${parentId}-input-street`)"
  />
</template>
