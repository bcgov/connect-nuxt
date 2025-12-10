<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next'

defineProps<{
  countryCodeIso2letter: string
}>()
</script>

<template>
  <CountryFlag
    class="mb-2"
    :country="countryCodeIso2letter"
  />
</template>
