<script setup lang="ts">
import countryList from 'country-codes-list'
import CountryFlag from '#forms/app/components/Connect/Form/Phone/CountryFlag.vue'
import type { PhoneCountry } from '#forms/app/interfaces/phone-country'

defineProps<{
  isInvalid: boolean | undefined
}>()

const countryCallingCode = defineModel<string | undefined>('countryCallingCode', { required: false })
watch(countryCallingCode, (val) => {
  // this is needed for when something outside this component changes the callingCode model value
  if (!val) {
    countryIso2.value = undefined
  } else if (selectedCountry.value?.callingCode !== val) {
    countryIso2.value = search(val)[0]?.iso2
  }
})

const countryIso2 = defineModel<string | undefined>('countryIso2', { required: false })
watch(countryIso2, (val) => {
  if (!val) {
    selectedCountry.value = undefined
  } else if (val && selectedCountry.value?.iso2 !== val) {
    selectCountry(val)
  }
})

const selectedCountry = ref<PhoneCountry | undefined>(undefined)
watch(selectedCountry, (newVal) => {
  if (newVal?.callingCode !== countryCallingCode.value) {
    countryCallingCode.value = newVal?.callingCode
  }
  if (newVal?.iso2 !== countryIso2.value) {
    countryIso2.value = newVal?.iso2
  }
})

const _countryListOptions = countryList.customList(
  'countryCode', '{countryCallingCode},{countryNameEn},{countryNameLocal}')

const manualInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedCountry.value = {
    callingCode: target.value
  }
}

const countryListOptions: Array<PhoneCountry> = Object.keys(_countryListOptions).map((key) => {
  const parts = (_countryListOptions[key] ?? '').split(',')
  const callingCode = parts[0] ?? ''
  const nameEn = parts[1]
  const nameLocal = parts[2]
  return {
    iso2: key,
    callingCode,
    label: `+${callingCode}`,
    nameLocal,
    nameEn
  }
}).sort((a, b) => a.callingCode.localeCompare(b.callingCode))

const search = (q: string) => countryListOptions.filter((lo) => {
  return lo.callingCode.includes(q)
    || lo.iso2?.includes(q)
    || lo.nameLocal?.includes(q)
    || lo.nameEn?.includes(q)
    || lo.label?.includes(q)
})

const selectCountry = (iso2: string) => {
  selectedCountry.value = countryListOptions.find(item => item.iso2 === iso2)
}

onMounted(() => {
  if (countryIso2.value !== undefined) {
    selectCountry(countryIso2.value)
  } else if (countryCallingCode.value) {
    // Set a country based on the calling code if available
    const iso2 = search(countryCallingCode.value)[0]?.iso2
    if (iso2) {
      selectCountry(iso2)
    } else {
      selectedCountry.value = {
        callingCode: countryCallingCode.value,
        label: `+${countryCallingCode.value}`
      }
    }
  }
})
</script>

<template>
  <UInputMenu
    v-model="selectedCountry"
    :items="countryListOptions"
    :color="selectedCountry?.callingCode ? 'primary' : undefined"
    :search="search"
    :label-key="undefined"
    :trailing-icon="'i-mdi-chevron-down'"
    class="cursor-pointer"
    :aria-required="true"
    :aria-invalid="isInvalid"
    :aria-label="$t('connect.label.countryCode')"
    @input="manualInput($event)"
  >
    <template v-if="!!selectedCountry?.iso2" #leading="{ modelValue }">
      <div class="flex">
        <CountryFlag
          :tooltip-text="selectedCountry?.nameEn"
          :country-code-iso2letter="selectedCountry?.iso2"
        />
        <span class="ml-2 mt-2 truncate">{{ (modelValue as PhoneCountry)?.label }}</span>
      </div>
    </template>

    <template #item="{ item }">
      <div v-if="item" class="flex items-end cursor-pointer">
        <CountryFlag
          :tooltip-text="(item as PhoneCountry).nameLocal"
          :country-code-iso2letter="(item as PhoneCountry).iso2 ?? ''"
        />
        <span class="ml-2 truncate">{{ (item as PhoneCountry).label }}</span>
        <span class="sr-only">{{ (item as PhoneCountry).nameLocal }}</span>
      </div>
    </template>
  </UInputMenu>
</template>
