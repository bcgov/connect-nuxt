// https://pinia-colada.esm.dev/guide/query-keys.html

/**
 * IMPORTANT: Query Key Hierarchy
 * * Our cache follows a strict hierarchy: ['connect', 'pay', accountId, ...rest].
 * * 1. Account ID: The 'base' (accountId) MUST remain as the first dynamic segment.
 * This allows us to invalidate an entire "folder" by targeting the parent key.
 * * 2. ORDER: When updating keys, ensure the order of existing segments is preserved.
 * Changing the order may break existing invalidation logic across the app.
*/

export const useConnectPayQueryKeys = () => {
  const { currentAccount } = storeToRefs(useConnectAccountStore())

  const base = () => ['connect', 'pay', currentAccount.value?.id] as const

  const keys = {
    fee: (entityType: string, code: string, params: { priority?: boolean, futureEffective?: boolean } = {}) =>
      [...base(), 'fee', entityType, code, params] as const,
    payAccount: (accountId: string | number) => [...base(), 'pay-account', accountId] as const
  }

  return { keys }
}
