// IMPORTANT: Query definitions are for GET requests only - for all other methods define a mutation in the ./mutate file
// https://pinia-colada.esm.dev/guide/queries.html
import { useQuery } from '@pinia/colada'
import type { UseQueryOptions, DefineQueryOptions } from '@pinia/colada'

type QueryOptions<T> = Omit<UseQueryOptions<T>, 'key' | 'query'> & {
  query?: UseQueryOptions<T>['query']
}

type DefineOptions<TData, TError = Error> = Omit<DefineQueryOptions<TData, TError>, 'key' | 'query'> & {
  query?: DefineQueryOptions<TData, TError>['query']
}

const DEFAULT_STALE_TIME = 60000

export const useConnectPayQuery = () => {
  const { $payApi } = useNuxtApp()
  const { keys } = useConnectPayQueryKeys()

  function feeOptions(
    entityType: string,
    code: string,
    params?: { priority?: boolean, futureEffective?: boolean },
    options?: DefineOptions<ConnectFeeItem>) {
    return defineQueryOptions({
      query: () => $payApi<ConnectFeeItem>(`/fees/${entityType}/${code}`, { params }),
      staleTime: DEFAULT_STALE_TIME,
      ...options,
      key: keys.fee(entityType, code, params)
    })
  }

  function fee(
    entityType: string,
    code: string,
    params?: { priority?: boolean, futureEffective?: boolean },
    options?: QueryOptions<ConnectFeeItem>) {
    return useQuery(() => feeOptions(entityType, code, params, options as DefineOptions<ConnectFeeItem>))
  }

  function payAccountOptions(
    accountId: string | number,
    options?: DefineOptions<ConnectPayAccount>) {
    return defineQueryOptions({
      query: () => $payApi<ConnectPayAccount>(`/accounts/${accountId}`),
      staleTime: DEFAULT_STALE_TIME,
      ...options,
      key: keys.payAccount(accountId)
    })
  }

  function payAccount(
    accountId: string | number,
    options?: QueryOptions<ConnectPayAccount>) {
    return useQuery(() => payAccountOptions(accountId, options as DefineOptions<ConnectPayAccount>))
  }

  return {
    feeOptions,
    fee,
    payAccountOptions,
    payAccount
  }
}
