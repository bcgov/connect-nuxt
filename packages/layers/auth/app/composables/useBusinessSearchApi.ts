export const useBusinessSearchApi = () => {
  const { $businessSearchApi } = useNuxtApp()

  const searchBusiness = async (
    searchValue: string,
    payload: BusinessSearchPayload
  ): Promise<BusinessSearchResponse | undefined> => {
    if (!searchValue) {
      return
    }

    // set 'value'
    payload.query.value = searchValue
    return await $businessSearchApi<BusinessSearchResponse>(
      'search/businesses',
      { method: 'POST', body: payload }
    )
  }

  return {
    searchBusiness
  }
}
