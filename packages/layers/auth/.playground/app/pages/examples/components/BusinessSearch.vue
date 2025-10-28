<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Business search rough example' }
  ]
})

const { searchBusiness } = useBusinessSearchApi()
const filters: BusinessSearchPayload = { query: {}, categories: {} }
const searchValue = ref('')
const results = shallowRef<BusinessSearchResult[]>([])
const totalResults = ref<number | undefined>(0)
const search = async () => {
  const resp = await searchBusiness(searchValue.value, filters)
  results.value = resp?.searchResults.results || []
  totalResults.value = resp?.searchResults.totalResults
}
</script>

<template>
  <div class="bg-shade-inverted p-5">
    <ConnectInput
      id="searchInput"
      v-model="searchValue"
      label="Search a business"
      @update:model-value="search"
    />
    <ConnectTransitionCollapse>
      <UCard v-if="searchValue && totalResults !== undefined">
        <ul>
          <li
            v-for="result, i in results"
            :key="`result-${i}`"
          >
            {{ result.name }}
            {{ result.identifier }}
            {{ result.legalType }}
            {{ result.status }}
            {{ result.bn }}
            {{ result.goodStanding !== undefined ? `(good standing: ${result.goodStanding})` : '' }}
            {{ `(modernized: ${result.modernized})` }}
          </li>
        </ul>
        <p class="mt-3">
          Total results: {{ totalResults }}
        </p>
      </UCard>
    </ConnectTransitionCollapse>
  </div>
</template>
